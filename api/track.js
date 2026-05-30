import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { event, data } = JSON.parse(req.body);

    if (!event) {
      return res.status(400).json({ error: "Missing event" });
    }

    // 1. Log event (analytics)
    await supabase.from("events").insert([
      {
        event_name: event,
        metadata: data || {},
        created_at: new Date().toISOString()
      }
    ]);

    // 2. CRM UPDATE LOGIC (IMPORTANT ADDITION)
    if (event === "lead_created") {
      await supabase
        .from("leads")
        .update({
          status: "new"
        })
        .eq("email", data.email);
    }

    if (event === "email_sent") {
      await supabase
        .from("leads")
        .update({
          emails_sent: data.emails_sent,
          last_email_sent_at: new Date().toISOString()
        })
        .eq("email", data.email);
    }

    if (event === "lead_converted") {
      await supabase
        .from("leads")
        .update({
          status: "converted"
        })
        .eq("email", data.email);
    }

    return res.json({ ok: true });

  } catch (err) {
    return res.status(500).json({
      error: "Tracking failed",
      details: err.message
    });
  }
}