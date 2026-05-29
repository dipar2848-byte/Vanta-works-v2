import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const data = JSON.parse(req.body);

  await resend.emails.send({
    from: "VantaWorks <onboarding@resend.dev>",
    to: process.env.OWNER_EMAIL,
    subject: "New Lead",
    html: `<p>${data.name} submitted a request</p>`
  });

  res.json({ success: true });
}