import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    const last = normalize(messages[messages.length - 1]?.content || "");

    /* =========================
       LOAD MEMORY
    ========================= */
    const memory = await loadMemory(email);

    /* =========================
       INTENT DETECTION
    ========================= */
    const intent = detectIntent(last);

    /* =========================
       LEAD SCORING ENGINE
    ========================= */
    const leadScore = calculateLeadScore(last, memory, intent);

    const stage = getStage(leadScore);

    /* =========================
       SALES RESPONSE ENGINE
    ========================= */
    const reply = generateSalesReply({
      intent,
      stage,
      leadScore,
      memory,
      last
    });

    /* =========================
       UPDATE MEMORY
    ========================= */
    const updatedMemory = {
      ...memory,
      last_intent: intent,
      lead_score: leadScore,
      stage
    };

    /* =========================
       SAVE MEMORY + LOGS
    ========================= */
    if (email) {
      await supabase.from("chatbot_memory").upsert([
        {
          email,
          memory: updatedMemory,
          lead_score: leadScore,
          stage,
          updated_at: new Date().toISOString()
        }
      ]);
    }

    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        message: last,
        intent,
        stage,
        lead_score: leadScore,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    return res.json({
      reply,
      intent,
      stage,
      leadScore
    });

  } catch (err) {
    return res.status(500).json({
      error: "Chat failed",
      details: err.message
    });
  }
}

/* =========================
   MEMORY LOADING
========================= */
async function loadMemory(email) {
  if (!email) return {};

  const { data } = await supabase
    .from("chatbot_memory")
    .select("*")
    .eq("email", email)
    .single();

  return data?.memory || {};
}

/* =========================
   INTENT DETECTION
========================= */
function detectIntent(text) {
  if (text.includes("price") || text.includes("cost")) return "pricing";
  if (text.includes("automation") || text.includes("crm")) return "automation";
  if (text.includes("website")) return "services";
  if (text.includes("call") || text.includes("book")) return "conversion";
  return "general";
}

/* =========================
   LEAD SCORING ENGINE (CORE SALES LOGIC)
========================= */
function calculateLeadScore(text, memory, intent) {
  let score = memory.lead_score || 0;

  // interest signals
  if (intent === "pricing") score += 20;
  if (intent === "conversion") score += 40;
  if (text.includes("need")) score += 10;
  if (text.includes("now")) score += 15;

  // engagement history
  if ((memory.message_count || 0) > 5) score += 10;

  return Math.min(score, 100);
}

/* =========================
   STAGE ENGINE
========================= */
function getStage(score) {
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  if (score >= 20) return "interested";
  return "cold";
}

/* =========================
   SALES RESPONSE ENGINE
========================= */
function generateSalesReply({ intent, stage, leadScore }) {
  const base = RESPONSE_BANK[intent] || RESPONSE_BANK.general;

  const opening = random(base);

  if (stage === "hot") {
    return (
      "Perfect — I think your setup is ready for execution. " +
      "I can get this fully structured for you (CRM + automation + leads). " +
      "Should I prepare a full system plan or connect you for setup?"
    );
  }

  if (stage === "warm") {
    return (
      opening +
      " I can already see a strong use case for automation here. " +
      "Do you want a full system or just lead capture first?"
    );
  }

  if (stage === "interested") {
    return (
      opening +
      " This can be turned into a proper lead system. " +
      "What type of business are you running?"
    );
  }

  return (
    opening +
    " Let me understand your goal first so I can guide you properly."
  );
}

/* =========================
   RESPONSE BANK
========================= */
const RESPONSE_BANK = {
  pricing: [
    "Pricing depends on system size and automation level.",
    "We structure pricing based on business requirements."
  ],
  automation: [
    "Automation connects CRM, WhatsApp, and lead tracking.",
    "This removes manual follow-ups completely."
  ],
  services: [
    "We build conversion-focused systems, not just websites.",
    "We create lead generation + automation systems."
  ],
  general: [
    "Let me understand your requirement first.",
    "I can guide you based on your business goal."
  ]
};

/* =========================
   UTIL
========================= */
function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function normalize(t) {
  return t.toLowerCase().replace(/[^a-z0-9\s]/g, " ").trim();
}