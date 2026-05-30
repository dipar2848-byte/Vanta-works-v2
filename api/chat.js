import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("price") || t.includes("cost") || t.includes("pricing"))
    return "pricing";

  if (t.includes("service") || t.includes("what do you do"))
    return "services";

  if (t.includes("contact") || t.includes("call") || t.includes("book"))
    return "conversion";

  if (t.includes("whatsapp")) return "whatsapp";

  if (t.includes("ai")) return "ai";

  return "general";
}

function generateReply(intent) {
  switch (intent) {
    case "pricing":
      return "Our systems start from ₹14,999. Want a recommendation based on your business?";

    case "services":
      return "We build conversion systems: websites, CRM tracking, WhatsApp automation, and lead funnels.";

    case "conversion":
      return "You can submit the form — we’ll analyze your business and contact you shortly.";

    case "whatsapp":
      return "Yes, we integrate WhatsApp automation for instant lead responses.";

    case "ai":
      return "We use automation-first systems. AI modules can be added in advanced setups.";

    default:
      return "I can help you with pricing, services, or booking a consultation.";
  }
}

function scoreIntent(intent) {
  if (intent === "conversion") return "high";
  if (intent === "pricing") return "medium";
  if (intent === "services") return "medium";
  return "low";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages, userId, email } = JSON.parse(req.body);

    const lastMessage =
      messages?.[messages.length - 1]?.content || "";

    const intent = detectIntent(lastMessage);
    const reply = generateReply(intent);
    const score = scoreIntent(intent);

    // 📊 LOG CHATBOT ACTIVITY TO CRM
    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        user_id: userId || null,
        message: lastMessage,
        intent,
        score,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    // 📊 UPDATE LEAD HEAT SCORE IF EXISTS
    if (email) {
      await supabase
        .from("leads")
        .update({
          last_chat_intent: intent,
          lead_score: score
        })
        .eq("email", email);
    }

    return res.json({
      reply,
      intent,
      score
    });
  } catch (err) {
    return res.status(500).json({
      error: "Chat failed",
      details: err.message
    });
  }
}