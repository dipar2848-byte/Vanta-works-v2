import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = JSON.parse(req.body);

    // 1. ADMIN EMAIL (you)
    await resend.emails.send({
      from: "VantaWorks <onboarding@resend.dev>",
      to: process.env.OWNER_EMAIL,
      subject: "New Lead Received",
      html: `
        <h2>New Lead</h2>
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>
        <p><b>Business:</b> ${data.business}</p>
        <p><b>Message:</b> ${data.message}</p>
      `
    });

    // 2. USER EMAIL (welcome)
    await resend.emails.send({
      from: "VantaWorks <onboarding@resend.dev>",
      to: data.email,
      subject: "We received your request",
      html: `
        <h2>Hey ${data.name}</h2>
        <p>Thanks for reaching out.</p>
        <p>We’ll get back to you shortly.</p>
      `
    });

    return res.json({ success: true });

  } catch (err) {
    return res.status(500).json({
      error: "Email sending failed",
      details: err.message
    });
  }
}