import twilio from "twilio";

export default async function handler(req, res) {
  try {
    const client = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_TOKEN
    );

    const { phone, message } = JSON.parse(req.body);

    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: message
    });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}