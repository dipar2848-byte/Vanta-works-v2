
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { phone, message, email } = JSON.parse(req.body);

    if (!phone || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const response = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
      body: message
    });

    // CRM UPDATE (IMPORTANT)
    if (email) {
      await supabase
        .from("leads")
        .update({
          whatsapp_sent: true,
          last_whatsapp_at: new Date().toISOString()
        })
        .eq("email", email);
    }

    // LOG EVENT
    await supabase.from("events").insert([
      {
        event_name: "whatsapp_sent",
        metadata: {
          phone,
          message,
          sid: response.sid
        },
        created_at: new Date().toISOString()
      }
    ]);

    return res.status(200).json({
      success: true,
      sid: response.sid
    });

  } catch (err) {
    return res.status(500).json({
      error: "WhatsApp failed",
      details: err.message
    });
  }
}