import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const memory = new Map();

// SYSTEM KNOWLEDGE
const SYSTEM = {
  intro:
    "I help businesses get more customers by tracking leads and automatically following up so no customer is lost.",
};

// FLOW OPTIONS
const FLOWS = {
  start: {
    msg: "Hi 👋 What would you like to do?",
    options: ["Learn more", "Pricing", "Book demo"],
  },
  learn: {
    msg: SYSTEM.intro,
    options: ["Pricing", "Book demo"],
  },
  pricing: {
    msg: "We have flexible pricing based on your business size.",
    options: ["Small", "Medium", "Enterprise"],
  },
  demo: {
    msg: "I can show you how leads become customers automatically.",
    options: ["Start demo", "Talk to sales"],
  },
};

function getMemory(userId) {
  if (!memory.has(userId)) {
    memory.set(userId, { flow: "start", score: 0 });
  }
  return memory.get(userId);
}

function detectIntent(text = "") {
  const t = text.toLowerCase();

  if (/hi|hello|hey/.test(t)) return "start";
  if (/learn|what|this/.test(t)) return "learn";
  if (/price|pricing/.test(t)) return "pricing";
  if (/demo/.test(t)) return "demo";

  return "fallback";
}

function score(intent, current) {
  const map = {
    start: 5,
    learn: 10,
    pricing: 20,
    demo: 30,
    fallback: 0,
  };
  return Math.min(100, current + (map[intent] || 0));
}

function flowUpdate(flow, intent) {
  if (intent === "learn") return "learn";
  if (intent === "pricing") return "pricing";
  if (intent === "demo") return "demo";
  return flow;
}

function build(flow) {
  const f = FLOWS[flow] || FLOWS.start;
  return {
    reply: f.msg,
    options: f.options,
  };
}

async function log(data) {
  try {
    await supabase.from("chatbot_logs").insert([data]);
  } catch (e) {
    console.log(e.message);
  }
}

export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const messages = body?.messages || [];
    const userId = body?.userId || "guest";

    const last = messages[messages.length - 1]?.content || "";

    const mem = getMemory(userId);

    const intent = detectIntent(last);

    mem.flow = flowUpdate(mem.flow, intent);
    mem.score = score(intent, mem.score);

    const response = build(mem.flow);

    await log({
      user_id: userId,
      message: last,
      intent,
      flow: mem.flow,
      score: mem.score,
      created_at: new Date().toISOString(),
    });

    return res.status(200).json({
      reply: response.reply,
      options: response.options,
      flow: mem.flow,
      score: mem.score,
    });
  } catch (e) {
    return res.status(200).json({
      reply: "How can I help you today?",
      options: ["Learn more", "Pricing", "Demo"],
      flow: "start",
      score: 0,
    });
  }
}