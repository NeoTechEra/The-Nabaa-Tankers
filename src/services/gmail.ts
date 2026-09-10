import { getAccessToken } from './auth';

export const TARGET_GMAIL = 'thenabaatankers@gmail.com';

export interface BookingEmailPayload {
  bookingType: 'demo' | 'tanker_order' | 'fleet_inquiry';
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  companyName?: string;
  topic?: string;
  scheduledTime?: string;
  meetingFormat?: string;
  notes?: string;
  tankerSize?: string;
  waterType?: string;
  capacity?: string;
  totalPrice?: number;
  deliveryDistrict?: string;
  hoseLength?: string;
}

/**
 * Encodes an RFC 2822 email string into base64url format for the Gmail API.
 */
function encodeBase64Url(str: string): string {
  const utf8Bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < utf8Bytes.length; i++) {
    binary += String.fromCharCode(utf8Bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Builds an RFC 2822 compliant email body.
 */
function buildRfc2822Email(options: {
  to: string;
  subject: string;
  htmlBody: string;
  replyTo?: string;
}): string {
  const lines = [
    `To: ${options.to}`,
    `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(options.subject)))}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 7bit',
  ];

  if (options.replyTo) {
    lines.push(`Reply-To: ${options.replyTo}`);
  }

  lines.push('', options.htmlBody);
  return lines.join('\r\n');
}

/**
 * Sends an email using the Gmail REST API with an OAuth bearer token.
 */
export async function sendEmailViaGmail(
  token: string,
  options: {
    to: string;
    subject: string;
    htmlBody: string;
    replyTo?: string;
  }
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const rawEmail = buildRfc2822Email(options);
    const encodedRaw = encodeBase64Url(rawEmail);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedRaw,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const message = errData?.error?.message || `Gmail API error HTTP ${response.status}`;
      return { success: false, error: message };
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Dispatches a booking notification email to thenabaatankers@gmail.com.
 * If the current session has an active Gmail OAuth token, it sends it directly via the Gmail API.
 * Otherwise, it logs and returns detailed status so the UI can notify the user.
 */
export async function notifyNabaaBooking(payload: BookingEmailPayload): Promise<{
  sentViaGmailApi: boolean;
  targetEmail: string;
  messageId?: string;
  error?: string;
}> {
  const token = await getAccessToken();

  let subject = '';
  let title = '';
  let contentHtml = '';

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Riyadh',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  if (payload.bookingType === 'demo') {
    subject = `[The Nabaa Tankers] 📅 New Demo Booking: ${payload.senderName || 'Client'}`;
    title = 'New Platform Demo & Meeting Scheduled';
    contentHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #060c18; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #0891b2;">
        <div style="background: linear-gradient(135deg, #0284c7, #06b6d4); padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 800; letter-spacing: -0.5px;">The Nabaa Tankers</h1>
          <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px;">Connected Digital Water Logistics Platform</p>
        </div>

        <div style="padding: 24px;">
          <div style="background-color: #0c1830; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 12px 0; color: #38bdf8; font-size: 16px;">${title}</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Client Name:</td>
                <td style="padding: 6px 0; color: #f8fafc; font-weight: 600;">${payload.senderName || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Email Address:</td>
                <td style="padding: 6px 0; color: #38bdf8;"><a href="mailto:${payload.senderEmail || ''}" style="color: #38bdf8; text-decoration: none;">${payload.senderEmail || 'N/A'}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Phone / WhatsApp:</td>
                <td style="padding: 6px 0; color: #4ade80; font-weight: 600;">${payload.senderPhone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Company / Fleet:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.companyName || 'Individual / Business'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Topic / Interest:</td>
                <td style="padding: 6px 0; color: #f8fafc; font-weight: 600;">${payload.topic || 'Full Platform Walkthrough'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Scheduled Slot:</td>
                <td style="padding: 6px 0; color: #facc15; font-weight: 600;">${payload.scheduledTime || 'Upcoming'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Meeting Format:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.meetingFormat || 'Google Meet Video Call'}</td>
              </tr>
              ${payload.notes ? `
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Notes / RFP:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.notes}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Received At:</td>
                <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${timestamp} (Riyadh Time)</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Direct operations: WhatsApp +92 333 0717198 | Call +966 53 043 4010</p>
            <p style="margin: 4px 0 0 0;">This notification was dispatched to <strong>${TARGET_GMAIL}</strong></p>
          </div>
        </div>
      </div>
    `;
  } else if (payload.bookingType === 'tanker_order') {
    subject = `[The Nabaa Tankers] 💧 New Water Order: ${payload.tankerSize || 'Tanker'} (${payload.waterType || 'Potable'})`;
    title = 'New Customer Tanker Order Received';
    contentHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #060c18; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #0891b2;">
        <div style="background: linear-gradient(135deg, #0284c7, #06b6d4); padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 800;">The Nabaa Tankers</h1>
          <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px;">Customer Water Tanker Dispatch Notification</p>
        </div>

        <div style="padding: 24px;">
          <div style="background-color: #0c1830; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 12px 0; color: #38bdf8; font-size: 16px;">${title}</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Tanker Model:</td>
                <td style="padding: 6px 0; color: #38bdf8; font-weight: 700;">${payload.tankerSize || 'Standard Tanker'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Water Quality:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.waterType || 'Certified Potable (NWC Compliant)'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Volume Capacity:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.capacity || '19,000 Liters (19m³)'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Order Price:</td>
                <td style="padding: 6px 0; color: #4ade80; font-weight: 700;">SAR ${payload.totalPrice ?? 140} (VAT incl.)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Delivery District:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.deliveryDistrict || 'Riyadh Metropolitan'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Hose Reach:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.hoseLength || '40m Standard'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Customer Phone:</td>
                <td style="padding: 6px 0; color: #4ade80; font-weight: 600;">${payload.senderPhone || '+966 53 043 4010'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Delivery Window:</td>
                <td style="padding: 6px 0; color: #facc15;">${payload.scheduledTime || 'Immediate Dispatch (within 45 mins)'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Timestamp:</td>
                <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Dispatched to central operations at <strong>${TARGET_GMAIL}</strong></p>
          </div>
        </div>
      </div>
    `;
  } else {
    subject = `[The Nabaa Tankers] 🚛 Fleet Operator Inquiry: ${payload.companyName || payload.senderName || 'Partner'}`;
    title = 'New Fleet Business & Onboarding Inquiry';
    contentHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #060c18; color: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #0891b2;">
        <div style="background: linear-gradient(135deg, #0284c7, #06b6d4); padding: 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 800;">The Nabaa Tankers</h1>
          <p style="margin: 4px 0 0 0; color: #e0f2fe; font-size: 13px;">Commercial Fleet Operations Inquiry</p>
        </div>

        <div style="padding: 24px;">
          <div style="background-color: #0c1830; border: 1px solid #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 12px 0; color: #38bdf8; font-size: 16px;">${title}</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; width: 140px;">Company Name:</td>
                <td style="padding: 6px 0; color: #f8fafc; font-weight: 600;">${payload.companyName || 'Commercial Fleet'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Contact Number:</td>
                <td style="padding: 6px 0; color: #4ade80; font-weight: 600;">${payload.senderPhone || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Topic:</td>
                <td style="padding: 6px 0; color: #f8fafc;">${payload.topic || 'Fleet Onboarding & Central Dispatch'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Timestamp:</td>
                <td style="padding: 6px 0; color: #64748b; font-size: 12px;">${timestamp}</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #64748b;">
            <p style="margin: 0;">Dispatched to <strong>${TARGET_GMAIL}</strong></p>
          </div>
        </div>
      </div>
    `;
  }

  // If token is available, send via the Gmail REST API
  if (token) {
    const result = await sendEmailViaGmail(token, {
      to: TARGET_GMAIL,
      subject,
      htmlBody: contentHtml,
      replyTo: payload.senderEmail || undefined,
    });

    return {
      sentViaGmailApi: result.success,
      targetEmail: TARGET_GMAIL,
      messageId: result.id,
      error: result.error,
    };
  }

  // If no token in current session, record and return status
  return {
    sentViaGmailApi: false,
    targetEmail: TARGET_GMAIL,
  };
}
