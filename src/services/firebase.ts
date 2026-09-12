import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  getDocFromServer
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with databaseId if provided
export const db = getFirestore(app, (firebaseConfig as any).firestoreDatabaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Test connection on boot as mandated by the skill
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore offline notice: Please check your network or Firebase configuration.');
    }
  }
}
testConnection();

// Required Error Handling Protocol
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Data Model Interfaces
export type DemoRequestStatus = 'new' | 'contacted' | 'confirmed' | 'completed' | 'cancelled' | 'rejected';

export interface DemoRequest {
  id: string; // e.g. DEMO-7419
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  interestedIn: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  status: DemoRequestStatus;
  createdAt: any;
  updatedAt: any;
  confirmedAt?: any;
  confirmedBy?: string;
  meetingLink?: string;
  adminNotes?: string;
  updatedBy?: string;
  emailDeliveryStatus?: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
}

export const TARGET_BUSINESS_EMAIL = 'thenabaatankers@gmail.com';

/**
 * Generates a unique human-readable Demo Request ID in DEMO-XXXX format.
 */
export function generateDemoId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DEMO-${randomNum}`;
}

/**
 * Creates a professional HTML email template matching The Nabaa visual identity.
 */
function createAdminEmailHtml(data: {
  id: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  interestedIn: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  createdAt: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New The Nabaa Demo Request — ${data.id}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060e1d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #060e1d; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 600px; background-color: #0a1733; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #0d234d 0%, #06152b 100%); border-bottom: 1px solid rgba(6, 182, 212, 0.2);">
              <table width="100%">
                <tr>
                  <td>
                    <span style="display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #22d3ee; margin-bottom: 6px;">NEW DEMO REQUEST</span>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">The Nabaa Tankers</h1>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Commercial Operations & Central Dispatch</p>
                  </td>
                  <td align="right" valign="top">
                    <div style="background-color: rgba(6, 182, 212, 0.15); border: 1px solid rgba(6, 182, 212, 0.4); padding: 6px 12px; border-radius: 8px; font-family: monospace; font-size: 13px; font-weight: 700; color: #38bdf8;">
                      ${data.id}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                A new platform demonstration request has been submitted on The Nabaa Tankers portal. Details are recorded below:
              </p>

              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #071126; border-radius: 12px; border: 1px solid #1e293b; font-size: 13px; margin-bottom: 24px;">
                <tr>
                  <td width="35%" style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Request ID:</td>
                  <td style="color: #38bdf8; font-weight: 700; font-family: monospace; border-bottom: 1px solid #0f1f3d;">${data.id}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Full Name:</td>
                  <td style="color: #ffffff; font-weight: 600; border-bottom: 1px solid #0f1f3d;">${data.name}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Company:</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #0f1f3d;">${data.companyName || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Email:</td>
                  <td style="color: #22d3ee; border-bottom: 1px solid #0f1f3d;"><a href="mailto:${data.email}" style="color: #22d3ee; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Phone / WhatsApp:</td>
                  <td style="color: #ffffff; font-family: monospace; border-bottom: 1px solid #0f1f3d;"><a href="tel:${data.phone}" style="color: #ffffff; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Country:</td>
                  <td style="color: #ffffff; border-bottom: 1px solid #0f1f3d;">${data.country}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Interested In:</td>
                  <td style="color: #38bdf8; font-weight: 600; border-bottom: 1px solid #0f1f3d;">${data.interestedIn}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Preferred Date:</td>
                  <td style="color: #ffffff; font-weight: 600; border-bottom: 1px solid #0f1f3d;">${data.preferredDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Preferred Time:</td>
                  <td style="color: #ffffff; font-weight: 600; border-bottom: 1px solid #0f1f3d;">${data.preferredTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Timezone:</td>
                  <td style="color: #94a3b8; border-bottom: 1px solid #0f1f3d;">${data.timezone}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Message:</td>
                  <td style="color: #e2e8f0; border-bottom: 1px solid #0f1f3d;">${data.message ? data.message.replace(/\n/g, '<br/>') : 'None provided'}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; border-bottom: 1px solid #0f1f3d;">Status:</td>
                  <td style="color: #fbbf24; font-weight: 700; text-transform: uppercase; font-size: 11px; border-bottom: 1px solid #0f1f3d;">New</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Created:</td>
                  <td style="color: #94a3b8; font-size: 12px;">${data.createdAt}</td>
                </tr>
              </table>

              <div style="background-color: rgba(6, 182, 212, 0.08); border-left: 3px solid #06b6d4; padding: 12px 16px; border-radius: 4px; margin-bottom: 24px;">
                <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                  <strong style="color: #22d3ee;">Operational Action:</strong> Review this request in the Admin Dashboard, contact the prospective partner, and set the meeting link upon confirmation.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #061124; border-top: 1px solid #0f1f3d; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                The Nabaa Tankers | Riyadh, Kingdom of Saudi Arabia | Contact: +966 53 043 4010
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Creates customer acknowledgment email HTML.
 */
function createCustomerEmailHtml(data: {
  id: string;
  name: string;
  interestedIn: string;
  preferredDate: string;
  preferredTime: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>The Nabaa Demo Request Received — ${data.id}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060e1d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #060e1d; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 560px; background-color: #0a1733; border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #0d234d 0%, #06152b 100%); border-bottom: 1px solid rgba(6, 182, 212, 0.2);">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #22d3ee;">REQUEST RECEIVED</span>
              <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">The Nabaa Tankers</h1>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">Water Delivery, Reimagined.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                Dear <strong>${data.name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                Thank you for your interest in The Nabaa Tankers. We have received your demo request.
              </p>

              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #071126; border-radius: 10px; border: 1px solid #1e293b; font-size: 13px; margin-bottom: 20px;">
                <tr>
                  <td width="40%" style="color: #64748b; font-weight: 600;">Request ID:</td>
                  <td style="color: #38bdf8; font-weight: 700; font-family: monospace;">${data.id}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Requested Session:</td>
                  <td style="color: #ffffff;">${data.interestedIn}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Requested Date:</td>
                  <td style="color: #ffffff;">${data.preferredDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Requested Time:</td>
                  <td style="color: #ffffff;">${data.preferredTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Status:</td>
                  <td style="color: #fbbf24; font-weight: 700;">Awaiting Confirmation</td>
                </tr>
              </table>

              <p style="margin: 0 0 20px 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                Our team will review your requested time and contact you directly to confirm the meeting. Please note that the requested time is <em>not automatically confirmed</em> until our operations team finalizes the schedule with you.
              </p>

              <p style="margin: 0; font-size: 13px; color: #cbd5e1;">
                Regards,<br/>
                <strong style="color: #ffffff;">The Nabaa Tankers Team</strong><br/>
                <span style="color: #22d3ee; font-size: 12px;">Water Delivery, Reimagined.</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: #061124; border-top: 1px solid #0f1f3d; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                Direct inquiries: thenabaatankers@gmail.com | +966 53 043 4010
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Creates customer meeting confirmation email HTML when admin officially confirms a demo.
 */
function createConfirmedEmailHtml(data: {
  id: string;
  name: string;
  interestedIn: string;
  preferredDate: string;
  preferredTime: string;
  meetingLink: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>The Nabaa Demo Confirmed — ${data.id}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060e1d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #060e1d; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width: 560px; background-color: #0a1733; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(135deg, #064e3b 0%, #06152b 100%); border-bottom: 1px solid rgba(16, 185, 129, 0.3);">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #34d399;">DEMO CONFIRMED</span>
              <h1 style="margin: 4px 0 0 0; font-size: 20px; font-weight: 800; color: #ffffff;">The Nabaa Tankers</h1>
              <p style="margin: 2px 0 0 0; font-size: 12px; color: #a7f3d0;">Your platform session is scheduled</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
                Dear <strong>${data.name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #cbd5e1; line-height: 1.6;">
                Great news! Your demo session for <strong>The Nabaa Tankers</strong> platform has been confirmed by our leadership team.
              </p>

              <table width="100%" cellpadding="8" cellspacing="0" style="background-color: #071126; border-radius: 10px; border: 1px solid #1e293b; font-size: 13px; margin-bottom: 24px;">
                <tr>
                  <td width="40%" style="color: #64748b; font-weight: 600;">Request ID:</td>
                  <td style="color: #34d399; font-weight: 700; font-family: monospace;">${data.id}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Session:</td>
                  <td style="color: #ffffff;">${data.interestedIn}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Date:</td>
                  <td style="color: #ffffff; font-weight: 700;">${data.preferredDate}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Time:</td>
                  <td style="color: #ffffff; font-weight: 700;">${data.preferredTime}</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600;">Status:</td>
                  <td style="color: #10b981; font-weight: 700;">CONFIRMED</td>
                </tr>
              </table>

              ${data.meetingLink ? `
              <div style="text-align: center; margin-bottom: 24px;">
                <a href="${data.meetingLink}" target="_blank" rel="noopener noreferrer" style="display: inline-block; background-color: #06b6d4; color: #020617; font-weight: 700; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 14px rgba(6, 182, 212, 0.4);">
                  Join Video Meeting
                </a>
                <p style="margin: 10px 0 0 0; font-size: 11px; color: #94a3b8; font-family: monospace; word-break: break-all;">
                  Link: ${data.meetingLink}
                </p>
              </div>
              ` : ''}

              <p style="margin: 0; font-size: 13px; color: #cbd5e1;">
                Regards,<br/>
                <strong style="color: #ffffff;">The Nabaa Tankers Operations</strong><br/>
                <span style="color: #22d3ee; font-size: 12px;">Water Delivery, Reimagined.</span>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: #061124; border-top: 1px solid #0f1f3d; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                The Nabaa Tankers | Central Operations | thenabaatankers@gmail.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Creates and persists a new Demo Request to Firestore, triggering email notifications.
 */
export async function createDemoRequest(data: {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  country: string;
  interestedIn: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
}): Promise<{ id: string }> {
  const demoId = generateDemoId();
  const nowIso = new Date().toISOString();

  const docPayload = {
    id: demoId,
    name: data.name.trim(),
    companyName: data.companyName ? data.companyName.trim() : '',
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    country: data.country.trim() || 'Saudi Arabia',
    interestedIn: data.interestedIn,
    preferredDate: data.preferredDate,
    preferredTime: data.preferredTime,
    timezone: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Riyadh',
    message: data.message ? data.message.trim() : '',
    status: 'new' as DemoRequestStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const path = `demoRequests/${demoId}`;

  try {
    // 1. Save document to demoRequests
    await setDoc(doc(db, 'demoRequests', demoId), docPayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }

  // 2. Queue Email to Admin (Firebase Trigger Email extension in 'mail' collection)
  try {
    const adminMailId = `mail-admin-${demoId}`;
    await setDoc(doc(db, 'mail', adminMailId), {
      to: TARGET_BUSINESS_EMAIL,
      demoRequestId: demoId,
      createdAt: serverTimestamp(),
      message: {
        subject: `New The Nabaa Demo Request — ${demoId}`,
        text: `NEW DEMO REQUEST\n\nRequest ID: ${demoId}\nName: ${data.name}\nCompany: ${data.companyName || 'N/A'}\nEmail: ${data.email}\nPhone: ${data.phone}\nCountry: ${data.country}\nInterested In: ${data.interestedIn}\nPreferred Date: ${data.preferredDate}\nPreferred Time: ${data.preferredTime}\nTimezone: ${docPayload.timezone}\nMessage: ${data.message || 'N/A'}\nStatus: New\nCreated: ${nowIso}`,
        html: createAdminEmailHtml({
          id: demoId,
          name: data.name,
          companyName: data.companyName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          interestedIn: data.interestedIn,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          timezone: docPayload.timezone,
          message: data.message,
          createdAt: nowIso,
        }),
      },
    });
  } catch (mailErr) {
    console.warn('Firebase trigger email dispatch notice for admin (booking preserved):', mailErr);
  }

  // 3. Queue Customer Acknowledgment Email
  try {
    const customerMailId = `mail-customer-${demoId}`;
    await setDoc(doc(db, 'mail', customerMailId), {
      to: data.email.trim().toLowerCase(),
      demoRequestId: demoId,
      createdAt: serverTimestamp(),
      message: {
        subject: `The Nabaa Demo Request Received — ${demoId}`,
        text: `Dear ${data.name},\n\nThank you for your interest in The Nabaa Tankers. We have received your demo request.\n\nRequest ID: ${demoId}\nRequested Session: ${data.interestedIn}\nRequested Date: ${data.preferredDate}\nRequested Time: ${data.preferredTime}\n\nOur team will review the requested time and contact you to confirm the meeting.\nThe requested time is NOT automatically confirmed unless the admin confirms it.\n\nRegards,\nThe Nabaa Tankers\nWater Delivery, Reimagined.`,
        html: createCustomerEmailHtml({
          id: demoId,
          name: data.name,
          interestedIn: data.interestedIn,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
        }),
      },
    });
  } catch (custMailErr) {
    console.warn('Firebase trigger email dispatch notice for customer (booking preserved):', custMailErr);
  }

  // 4. Dispatch immediately via Resend backend API route (if RESEND_API_KEY is configured on server or Vercel)
  try {
    fetch('/api/send-demo-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'created',
        demo: {
          id: demoId,
          name: data.name,
          companyName: data.companyName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          interestedIn: data.interestedIn,
          preferredDate: data.preferredDate,
          preferredTime: data.preferredTime,
          timezone: docPayload.timezone,
          message: data.message,
        },
      }),
    })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (!res.ok) {
          console.warn('[Resend Server Notice]: HTTP', res.status, json);
        } else if (json?.warning) {
          console.warn('[Resend Setup Notice]:', json.warning);
        } else {
          console.log('[Resend Success]: Notification email sent successfully', json);
        }
      })
      .catch((apiErr) => {
        console.warn('Resend server proxy dispatch notice:', apiErr);
      });
  } catch (err) {
    // Non-blocking
  }

  return { id: demoId };
}

/**
 * Subscribes to the live demoRequests collection with real-time updates.
 */
export function subscribeDemoRequests(
  onSuccess: (requests: DemoRequest[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const collectionPath = 'demoRequests';
  const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: DemoRequest[] = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          name: data.name || '',
          companyName: data.companyName || '',
          email: data.email || '',
          phone: data.phone || '',
          country: data.country || '',
          interestedIn: data.interestedIn || '',
          preferredDate: data.preferredDate || '',
          preferredTime: data.preferredTime || '',
          timezone: data.timezone || 'Asia/Riyadh',
          message: data.message || '',
          status: data.status || 'new',
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          confirmedAt: data.confirmedAt,
          confirmedBy: data.confirmedBy,
          meetingLink: data.meetingLink,
          adminNotes: data.adminNotes,
          updatedBy: data.updatedBy,
        } as DemoRequest;
      });
      onSuccess(items);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, collectionPath);
    }
  );
}

/**
 * Updates a demo request's status, notes, or meeting link.
 */
export async function updateDemoRequestStatus(
  id: string,
  updates: {
    status?: DemoRequestStatus;
    meetingLink?: string;
    adminNotes?: string;
    updatedBy?: string;
  },
  existingDoc?: DemoRequest
): Promise<void> {
  const path = `demoRequests/${id}`;
  const docRef = doc(db, 'demoRequests', id);

  const payload: Record<string, any> = {
    updatedAt: serverTimestamp(),
  };

  if (updates.status) {
    payload.status = updates.status;
    if (updates.status === 'confirmed') {
      payload.confirmedAt = serverTimestamp();
      payload.confirmedBy = updates.updatedBy || auth.currentUser?.email || 'admin';
    }
  }

  if (updates.meetingLink !== undefined) {
    payload.meetingLink = updates.meetingLink.trim();
  }

  if (updates.adminNotes !== undefined) {
    payload.adminNotes = updates.adminNotes.trim();
  }

  if (updates.updatedBy) {
    payload.updatedBy = updates.updatedBy;
  }

  try {
    await updateDoc(docRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }

  // If status is changed to confirmed and we have customer details, send the official confirmed email
  if (updates.status === 'confirmed' && existingDoc && existingDoc.email) {
    try {
      const confirmMailId = `mail-confirmed-${id}-${Date.now()}`;
      await setDoc(doc(db, 'mail', confirmMailId), {
        to: existingDoc.email,
        demoRequestId: id,
        createdAt: serverTimestamp(),
        message: {
          subject: `The Nabaa Demo Confirmed — ${id}`,
          text: `Dear ${existingDoc.name},\n\nYour platform demo for The Nabaa Tankers has been confirmed!\n\nRequest ID: ${id}\nDate: ${existingDoc.preferredDate}\nTime: ${existingDoc.preferredTime}\nSession: ${existingDoc.interestedIn}\nMeeting Link: ${updates.meetingLink || existingDoc.meetingLink || 'Details sent directly'}\n\nRegards,\nThe Nabaa Tankers Operations`,
          html: createConfirmedEmailHtml({
            id,
            name: existingDoc.name,
            interestedIn: existingDoc.interestedIn,
            preferredDate: existingDoc.preferredDate,
            preferredTime: existingDoc.preferredTime,
            meetingLink: updates.meetingLink || existingDoc.meetingLink || '',
          }),
        },
      });
    } catch (e) {
      console.warn('Failed to queue confirmed email to mail collection:', e);
    }

    // Trigger Resend confirmation email via server route (Express or Vercel serverless)
    try {
      fetch('/api/send-demo-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirmed',
          demo: {
            id,
            name: existingDoc.name,
            email: existingDoc.email,
            preferredDate: existingDoc.preferredDate,
            preferredTime: existingDoc.preferredTime,
            meetingLink: updates.meetingLink || existingDoc.meetingLink || '',
          },
        }),
      })
        .then(async (res) => {
          const json = await res.json().catch(() => null);
          if (!res.ok) {
            console.warn('[Resend Confirm Notice]: HTTP', res.status, json);
          } else if (json?.warning) {
            console.warn('[Resend Setup Notice]:', json.warning);
          } else {
            console.log('[Resend Success]: Confirmation email sent successfully', json);
          }
        })
        .catch((apiErr) => console.warn('Resend confirm proxy notice:', apiErr));
    } catch (err) {
      // Non-blocking
    }
  }
}

/**
 * Utility to convert demo requests to CSV format and trigger download.
 */
export function exportDemoRequestsToCSV(requests: DemoRequest[], filename = 'nabaa-demo-requests.csv') {
  if (!requests.length) return;

  const headers = [
    'Request ID',
    'Full Name',
    'Company',
    'Email',
    'Phone',
    'Country',
    'Interested In',
    'Preferred Date',
    'Preferred Time',
    'Timezone',
    'Status',
    'Meeting Link',
    'Admin Notes',
    'Created At',
  ];

  const escapeCSV = (val: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = requests.map((r) => [
    escapeCSV(r.id),
    escapeCSV(r.name),
    escapeCSV(r.companyName || ''),
    escapeCSV(r.email),
    escapeCSV(r.phone),
    escapeCSV(r.country),
    escapeCSV(r.interestedIn),
    escapeCSV(r.preferredDate),
    escapeCSV(r.preferredTime),
    escapeCSV(r.timezone),
    escapeCSV(r.status),
    escapeCSV(r.meetingLink || ''),
    escapeCSV(r.adminNotes || ''),
    escapeCSV(r.createdAt?.toDate ? r.createdAt.toDate().toISOString() : r.createdAt || ''),
  ]);

  const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
