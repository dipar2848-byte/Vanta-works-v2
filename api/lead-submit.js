import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// simple validation
function validateLead(lead) {
  if (!lead) return false;
  if (!lead.email && !lead.phone) return false;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const lead = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body;

    if (!validateLead(lead)) {
      return res.status(400).json({
        error: "Invalid lead data",
      });
    }

    // 1. INSERT LEAD (SINGLE SOURCE OF TRUTH)
    const { data: created, error } = await supabase
      .from("leads")
      .insert([
        {
          name: lead.name || "Unknown",
          email: lead.email || null,
          phone: lead.phone || null,
          message: lead.message || "",
          status: "new",
          emails_sent: 0,
          whatsapp_sent: false,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        error: "Database insert failed",
        details: error.message,
      });
    }

    // 2. EVENT LOG (NON-BLOCKING)
    supabase.from("events").insert([
      {
        event_name: "lead_created",
        metadata: created,
        created_at: new Date().toISOString(),
      },
    ]);

    // 3. EMAIL SYSTEM (SAFE CALL)
    try {
      await fetch(`${process.env.BASE_URL}/api/sendemail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(created),
      });
    } catch (e) {
      console.log("Email failed:", e.message);
    }

    // 4. WHATSAPP SYSTEM (SAFE CALL)
    if (created.phone) {
      try {
        await fetch(`${process.env.BASE_URL}/api/whatsapp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: created.phone,
            message: `Hey ${created.name}, thanks for reaching out!`,
          }),
        });
      } catch (e) {
        console.log("WhatsApp failed:", e.message);
      }
    }

    // 5. FINAL RESPONSE
    return res.status(200).json({
      success: true,
      lead_id: created.id,
      status: "new",
    });

  } catch (err) {
    return res.status(500).json({
      error: "Lead pipeline crashed",
      details: err.message,
    });
  }
}