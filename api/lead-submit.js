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
    const lead = JSON.parse(req.body);

    // 1. SAVE LEAD
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          ...lead,
          status: "new",
          emails_sent: 0,
          whatsapp_sent: false,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({ error });
    }

    // 2. TRACK EVENT
    await supabase.from("events").insert([
      {
        event_name: "lead_created",
        metadata: data,
        created_at: new Date().toISOString()
      }
    ]);

    // 3. CALL EMAIL SYSTEM
    await fetch(`${process.env.BASE_URL}/api/sendemail`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    // 4. CALL WHATSAPP SYSTEM (optional)
    if (data.phone) {
      await fetch(`${process.env.BASE_URL}/api/whatsapp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: data.phone,
          message: `Hey ${data.name}, we received your request.`,
          email: data.email
        })
      });
    }

    // 5. UPDATE CRM STATE
    await supabase
      .from("leads")
      .update({
        status: "contacted",
        emails_sent: 1
      })
      .eq("id", data.id);

    return res.status(200).json({
      success: true,
      lead_id: data.id
    });

  } catch (err) {
    return res.status(500).json({
      error: "Lead processing failed",
      details: err.message
    });
  }
}