import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* =========================
   MEMORY EXTRACTION
========================= */
function extractMemory(messages) {
  const text = messages.map(m => m.content).join(" ").toLowerCase();

  const name = text.match(/my name is ([a-z]+)/i)?.[1];
  const business = text.match(/(business|company) is ([a-z ]+)/i)?.[2];

  return { name, business };
}

/* =========================
   STAGE ENGINE
========================= */
function detectStage(intent, score, lastStage) {
  if (score === "hot") return "hot_lead";
  if (intent === "conversion") return "ready_to_close";
  if (intent === "pricing") return "interested";
  if (lastStage === "hot_lead") return "hot_lead";

  return "visitor";
}

/* =========================
   INTENT ENGINE (SMART RULES)
========================= */
function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("price") || t.includes("cost") || t.includes("budget"))
    return "pricing";

  if (t.includes("service") || t.includes("what do you do"))
    return "services";

  if (t.includes("book") || t.includes("call") || t.includes("contact"))
    return "conversion";

  if (t.includes("whatsapp")) return "whatsapp";

  if (t.includes("help")) return "support";

  return "general";
}

/* =========================
   LEAD SCORING ENGINE
========================= */
function scoreLead(text, memory) {
  let score = 0;

  if (text.length > 25) score += 1;
  if (text.includes("want") || text.includes("build")) score += 2;
  if (text.includes("book") || text.includes("call")) score += 5;

  if (memory.name) score += 1;
  if (memory.business) score += 2;

  if (score >= 6) return "hot";
  if (score >= 3) return "warm";
  return "cold";
}

/* =========================
   RESPONSE ENGINE (SALES FLOW)
========================= */
function generateReply(intent, score, memory, stage) {
  const name = memory.name ? ` ${memory.name}` : "";

  if (stage === "hot_lead") {
    return `Perfect${name}. I can set up a full system for you (CRM + automation + leads). Do you want a complete setup or just website first?`;
  }

  if (stage === "ready_to_close") {
    return `Got it${name}. What’s your current monthly goal for leads or sales?`;
  }

  if (intent === "pricing") {
    return `Our systems start from ₹14,999${name}. What type of business are you running?`;
  }

  if (intent === "services") {
    return `We build conversion systems — websites, CRM tracking, WhatsApp automation, and funnels. What business are you in?`;
  }

  return `I can help you with pricing, setup, or improving your lead generation. What are you trying to achieve?`;
}

/* =========================
   MAIN HANDLER
========================= */
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { messages = [], email } = body;

    const lastMessage =
      messages[messages.length - 1]?.content || "";

    const memory = extractMemory(messages);
    const intent = detectIntent(lastMessage);
    const score = scoreLead(lastMessage, memory);

    // get last stage from DB (optional)
    const { data: existing } = await supabase
      .from("chatbot_logs")
      .select("stage")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const stage = detectStage(intent, score, existing?.stage);

    const reply = generateReply(intent, score, memory, stage);

    // SAVE TO CRM
    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        message: lastMessage,
        intent,
        score,
        stage,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    // UPDATE LEAD TABLE
    if (email) {
      await supabase
        .from("leads")
        .update({
          last_intent: intent,
          lead_score: score,
          stage
        })
        .eq("email", email);
    }

    return res.json({
      reply,
      intent,
      score,
      stage
    });

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      error: "Chat failed",
      details: err.message
    });
  }
}