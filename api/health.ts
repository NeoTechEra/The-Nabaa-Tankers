export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const hasResendKey = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.trim().length > 0);
  
  const payload = {
    status: "ok",
    platform: "vercel-serverless",
    hasResendKey,
    hasResendFromEmail: Boolean(process.env.RESEND_FROM_EMAIL),
    timestamp: new Date().toISOString(),
    instructions: hasResendKey
      ? "RESEND_API_KEY is active and ready to send emails."
      : "RESEND_API_KEY is missing in Vercel Environment Variables. Please add RESEND_API_KEY in your Vercel Project Settings > Environment Variables.",
  };

  if (typeof res.status === "function") {
    return res.status(200).json(payload);
  } else if (typeof res.json === "function") {
    return res.json(payload);
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (typeof res.end === "function") {
    res.end(JSON.stringify(payload));
  }
}
