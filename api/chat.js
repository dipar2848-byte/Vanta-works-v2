import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/* ─────────────────────────────
   FLOW SYSTEM (BASE STRUCTURE)
───────────────────────────── */

const FLOWS = {
  start: {
    msg: "Hi 👋 What would you like to do?",
    options: ["Learn more", "Pricing", "Book demo"],
  },
  learn: {
    msg:
      "This system helps you turn visitors into customers by tracking leads and automatically following up.",
    options: ["Pricing", "Book demo"],
  },
  pricing: {
    msg: "We offer flexible pricing based on your business size.",
    options: ["Small", "Medium", "Enterprise"],
  },
  demo: {
    msg: "I can show you how leads are captured and converted automatically.",
    options: ["Start demo", "Talk to sales"],
  },
};

/* ─────────────────────────────
   INTENT ENGINE (IMPROVED)
───────────────────────────── */

function detectIntent(text = "") {
  const t = text.toLowerCase().trim();

  if (/(hi|hello|hey|yo|sup)/.test(t)) return "start";
  if (/(what.*this|how.*work|explain|learn)/.test(t)) return "learn";
  if (/(price|pricing|cost|plan)/.test(t)) return "pricing";
  if (/(demo|show.*me|trial)/.test(t)) return "demo";

  return "unknown";
}

/* ─────────────────────────────
   SIMPLE LEAD SCORING
───────────────────────────── */

function calculateScore(intent, current = 0, message = "") {
  let scoreMap = {
    start: 5,
    learn: 10,
    pricing: 25,
    demo: 40,
    unknown: 0,
  };

  let score = current + (scoreMap[intent] || 0);

  if (message.length > 40) score += 5;
  if (/(buy|purchase|signup|get started)/.test(message.toLowerCase())) {
    score += 15;
  }

  return Math.min(100, score);
}

/* ─────────────────────────────
   FLOW RESOLVER (MORE FLEXIBLE)
───────────────────────────── */

function resolveFlow(currentFlow, intent) {
  const transitions = {
    start: ["learn", "pricing", "demo"],
    learn: ["pricing", "demo"],
    pricing: ["demo"],
    demo: ["demo"],
  };

  const nextOptions = transitions[currentFlow] || ["start"];

  if (nextOptions.includes(intent)) {
    return intent;
  }

  return currentFlow;
}

/* ─────────────────────────────
   MEMORY (PERSISTENT - SUPABASE)
───────────────────────────── */

async function getSession(userId) {
  let { data } = await supabase
    .from("chat_sessions")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (!data) {
    const newSession = {
      user_id: userId,
      flow: "start",
      score: 0,
    };

    await supabase.from("chat_sessions").insert([newSession]);
    return newSession;
  }

  return data;
}

async function saveSession(userId, flow, score) {
  await supabase
    .from("chat_sessions")
    .update({
      flow,
      score,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);
}

/* ─────────────────────────────
   CHAT RESPONSE BUILDER
───────────────────────────── */

function buildResponse(flow) {
  const f = FLOWS[flow] || FLOWS.start;

  return {
    reply: f.msg,
    options: f.options,
  };
}

/* ─────────────────────────────
   FALLBACK (SMART)
───────────────────────────── */

function fallbackResponse() {
  return {
    reply:
      "I didn’t fully understand that. Do you want pricing, a demo, or an explanation of how it works?",
    options: ["Pricing", "Demo", "How it works"],
  };
}

/* ─────────────────────────────
   MAIN HANDLER
───────────────────────────── */

export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { message = "", userId = "guest" } = body;

    // 1. Load session
    const session = await getSession(userId);

    // 2. Detect intent
    const intent = detectIntent(message);

    // 3. Update flow
    let flow = resolveFlow(session.flow, intent);

    // 4. Score user
    let score = calculateScore(intent, session.score, message);

    // 5. Build response
    let response =
      intent === "unknown"
        ? fallbackResponse()
        : buildResponse(flow);

    // 6. Save session state
    await saveSession(userId, flow, score);

    // 7. Log CRM event
    await supabase.from("chatbot_logs").insert([
      {
        user_id: userId,
        message,
        intent,
        flow,
        score,
        created_at: new Date().toISOString(),
      },
    ]);

    // 8. Return response
    return res.status(200).json({
      reply: response.reply,
      options: response.options,
      flow,
      score,
    });
  } catch (err) {
    return res.status(500).json({
      reply: "Something went wrong. Please try again.",
      options: ["Pricing", "Demo", "Help"],
      error: err.message,
    });
  }
}