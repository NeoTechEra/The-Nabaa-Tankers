import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Resend client so missing key doesn't crash the server on startup
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasResendKey: Boolean(process.env.RESEND_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Resend Email Dispatch Endpoint
app.post("/api/send-demo-email", async (req, res) => {
  try {
    const { action, demo } = req.body;

    if (!demo || !demo.email) {
      return res.status(400).json({ success: false, error: "Missing required demo data" });
    }

    const resend = getResend();
    if (!resend) {
      console.warn("[Resend] RESEND_API_KEY is not set in server environment. Skipping email dispatch.");
      return res.status(200).json({
        success: false,
        warning: "RESEND_API_KEY is not configured yet in environment secrets.",
      });
    }

    // Default sender: Resend free sandbox sender or custom domain sender if configured
    const sender = process.env.RESEND_FROM_EMAIL?.trim() || "The Nabaa Tankers <onboarding@resend.dev>";
    const businessEmail = "thenabaatankers@gmail.com";
    const isSandbox = sender.includes("resend.dev");

    // Clean & validate target email
    const clientEmail = String(demo.email || "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      return res.status(400).json({ success: false, error: "Invalid recipient email address" });
    }

    // Determine target recipient for customer messages:
    // When using Resend's free test sender (onboarding@resend.dev), Resend enforces that emails can ONLY
    // be delivered to the account owner's email address (thenabaatankers@gmail.com).
    // Routing external customer copies to the admin email in sandbox prevents API validation_error (403).
    const isClientAdmin = clientEmail.toLowerCase() === businessEmail.toLowerCase();
    const customerRecipient = (!isSandbox || isClientAdmin) ? clientEmail : businessEmail;
    const isSandboxRerouted = isSandbox && !isClientAdmin;

    // 1. New Demo Request Notification
    if (action === "created") {
      // Email 1: Notification to Admin
      let adminEmailId: string | undefined;
      const adminResult = await resend.emails.send({
        from: sender,
        to: [businessEmail],
        subject: `[New Demo Request] ${demo.id} - ${demo.name} (${demo.companyName || "Individual"})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c162d; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #00f0ff33;">
            <div style="border-bottom: 1px solid #1e293b; padding-bottom: 16px; margin-bottom: 20px;">
              <span style="background: #00f0ff22; color: #00f0ff; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 1px solid #00f0ff55;">NEW DEMO REQUEST</span>
              <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 22px;">The Nabaa Tankers Platform</h2>
              <p style="color: #94a3b8; margin: 0; font-size: 14px;">A new live system walkthrough has been requested.</p>
            </div>

            <div style="background: #132247; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="color: #94a3b8; padding: 6px 0;">Request ID:</td><td style="color: #00f0ff; font-weight: bold; font-family: monospace;">${demo.id}</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Client Name:</td><td style="color: #ffffff; font-weight: 600;">${demo.name}</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Company:</td><td style="color: #ffffff;">${demo.companyName || "Individual / Not specified"}</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Email:</td><td><a href="mailto:${clientEmail}" style="color: #38bdf8;">${clientEmail}</a></td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Phone:</td><td style="color: #ffffff; font-family: monospace;">${demo.phone}</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Topic:</td><td style="color: #ffffff;">${demo.interestedIn}</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Requested Time:</td><td style="color: #34d399; font-weight: bold;">${demo.preferredDate} (${demo.preferredTime})</td></tr>
                <tr><td style="color: #94a3b8; padding: 6px 0;">Timezone:</td><td style="color: #94a3b8;">${demo.timezone}</td></tr>
              </table>
              ${demo.message ? `<div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #1e293b; font-size: 13px; color: #cbd5e1;"><strong>Client Note:</strong> ${demo.message}</div>` : ""}
            </div>

            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px; text-align: center;">
              Log in to the Admin Operations Center &gt; Demo Requests to confirm or assign meeting links.
            </p>
          </div>
        `,
      });
      if (adminResult.error) {
        console.warn("[Resend Admin Email Notice]:", adminResult.error.message);
      } else {
        adminEmailId = adminResult.data?.id;
      }

      // Email 2: Confirmation copy to customer (or admin reroute in sandbox mode)
      let customerEmailId: string | undefined;
      const customerSubject = isSandboxRerouted
        ? `[Customer Copy - Sandbox] Demo Request Received for ${demo.name} (${clientEmail})`
        : `Demo Request Received - The Nabaa Tankers (Ref: ${demo.id})`;

      const sandboxNoticeHtml = isSandboxRerouted
        ? `<div style="background: #eab30822; border: 1px solid #eab30866; color: #fef08a; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; line-height: 1.5;">
            <strong>Sandbox Mode Delivery:</strong> This customer receipt was delivered to <code>${businessEmail}</code> because the current Resend sender is using <code>onboarding@resend.dev</code>. To deliver directly to external recipients, verify your custom domain in Resend.
           </div>`
        : "";

      const customerResult = await resend.emails.send({
        from: sender,
        to: [customerRecipient],
        subject: customerSubject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c162d; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #00f0ff33;">
            ${sandboxNoticeHtml}
            <h2 style="color: #00f0ff; margin-top: 0;">Demo Request Received</h2>
            <p style="color: #e2e8f0; font-size: 15px; line-height: 1.6;">
              Dear <strong>${demo.name}</strong>,
            </p>
            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              Thank you for requesting a live demonstration of <strong>The Nabaa Tankers</strong> platform. Your request has been assigned reference ID <strong style="color: #00f0ff; font-family: monospace;">${demo.id}</strong>.
            </p>
            
            <div style="background: #132247; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase;">Requested Details:</p>
              <p style="margin: 4px 0; color: #ffffff;"><strong>Session:</strong> ${demo.interestedIn}</p>
              <p style="margin: 4px 0; color: #ffffff;"><strong>Preferred Schedule:</strong> ${demo.preferredDate} at ${demo.preferredTime}</p>
              <p style="margin: 4px 0; color: #38bdf8;"><strong>Status:</strong> Awaiting Operations Team Review</p>
            </div>

            <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
              Our fleet operations team will review your requested time slot and send you the verified video conference link shortly.
            </p>

            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 12px; color: #64748b;">
              The Nabaa Tankers Logistics &bull; Support: <a href="mailto:thenabaatankers@gmail.com" style="color: #38bdf8;">thenabaatankers@gmail.com</a>
            </div>
          </div>
        `,
      });
      if (customerResult.error) {
        console.warn("[Resend Customer Email Notice]:", customerResult.error.message);
      } else {
        customerEmailId = customerResult.data?.id;
      }

      return res.json({
        success: true,
        adminEmailId,
        customerEmailId,
        sandboxRerouted: isSandboxRerouted,
      });
    }

    // 2. Demo Confirmed Notification
    if (action === "confirmed") {
      let confirmResultId: string | undefined;
      const confirmSubject = isSandboxRerouted
        ? `[Customer Copy - Sandbox] Demo Confirmed for ${demo.name} (${clientEmail})`
        : `Your Demo is Confirmed: The Nabaa Tankers (Ref: ${demo.id})`;

      const sandboxNoticeHtml = isSandboxRerouted
        ? `<div style="background: #eab30822; border: 1px solid #eab30866; color: #fef08a; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 13px; line-height: 1.5;">
            <strong>Sandbox Mode Delivery:</strong> This meeting confirmation was delivered to <code>${businessEmail}</code> because the sender is on <code>onboarding@resend.dev</code>. To send directly to clients, verify your domain in Resend.
           </div>`
        : "";

      const confirmResult = await resend.emails.send({
        from: sender,
        to: [customerRecipient],
        subject: confirmSubject,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c162d; color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #10b98155;">
            ${sandboxNoticeHtml}
            <span style="background: #10b98122; color: #10b981; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; border: 1px solid #10b98155;">DEMO CONFIRMED</span>
            <h2 style="color: #ffffff; margin: 12px 0 8px 0;">Your Meeting is Scheduled</h2>
            <p style="color: #cbd5e1; font-size: 14px;">Dear ${demo.name}, your live session for <strong>The Nabaa Tankers</strong> has been confirmed.</p>

            <div style="background: #132247; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 4px 0; color: #ffffff;"><strong>Date & Time:</strong> ${demo.preferredDate} (${demo.preferredTime})</p>
              ${demo.meetingLink ? `
                <div style="margin-top: 12px; padding: 12px; background: #064e3b; border-radius: 6px; text-align: center;">
                  <a href="${demo.meetingLink}" style="color: #ffffff; font-weight: bold; text-decoration: none; font-size: 14px; display: inline-block;">
                    👉 Click to Join Video Meeting
                  </a>
                </div>
              ` : ""}
            </div>

            <p style="color: #94a3b8; font-size: 12px;">Need to reschedule? Reply to this email or contact thenabaatankers@gmail.com.</p>
          </div>
        `,
      });

      if (confirmResult.error) {
        console.warn("[Resend Confirm Email Notice]:", confirmResult.error.message);
      } else {
        confirmResultId = confirmResult.data?.id;
      }

      return res.json({
        success: true,
        confirmResultId,
        sandboxRerouted: isSandboxRerouted,
      });
    }

    return res.status(400).json({ success: false, error: "Unknown action" });
  } catch (error: any) {
    console.error("[Resend API Error]:", error);
    return res.status(500).json({ success: false, error: error.message || "Failed to send email" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
