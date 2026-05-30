// chat.js — RBCE Production v3 (Hardened)
// Vercel Serverless Ready

import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────
// SUPABASE (optional but recommended)
// ─────────────────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// ─────────────────────────────────────────────
// SAFE MEMORY (fallback only)
// NOTE: resets on cold start (OK for MVP fallback)
// ─────────────────────────────────────────────
const memoryStore = new Map();

// ─────────────────────────────────────────────
// INTENTS
// ─────────────────────────────────────────────
const INTENTS = {
  greeting: /(hi|hello|hey|yo|good\s(morning|evening|afternoon))/i,

  what_is_this:
    /(what\sis\sthis|what\sdo\syou\sdo|explain|how\sdoes\sthis\swork|tell\sme\sabout)/i,

  crm: /(crm|customer|lead|pipeline|contact)/i,

  sales: /(price|pricing|cost|buy|purchase|plan|demo|trial|upgrade)/i,

  automation: /(automation|whatsapp|follow|sequence|trigger|bot)/i,

  website: /(website|landing|page|site|funnel)/i,
};

// ─────────────────────────────────────────────
// RESPONSE BANKS
// ─────────────────────────────────────────────
const R = {
  greeting: [
    "Hey! What are you trying to build or improve today?",
    "Hello 👋 Tell me what you're working on.",
    "Hi! I can help you understand or grow your system.",
  ],

  what_is_this: [
    "This is a simple system that helps you get more customers and automatically follow up with them so you don't lose leads.",
    "Think of it like a smart assistant that remembers every interested customer and helps you turn them into buyers.",
    "It collects people interested in your business and automatically follows up so you get more sales with less effort.",
  ],

  crm: [
    "A CRM is just a system that keeps all your customer information in one place so you never lose track of anyone.",
    "Think of it like a smart notebook that remembers every customer and what they did.",
  ],

  sales: [
    "Pricing depends on what features you need. Are you just starting or already getting leads?",
    "We have flexible plans based on your business size. What are you trying to achieve?",
  ],

  automation: [
    "Automation means the system sends follow-ups and messages for you so you never miss a customer.",
    "It works like a 24/7 assistant that follows up with leads automatically.",
  ],

  website: [
    "A website connected to this system can automatically turn visitors into leads.",
    "Landing pages help collect customer details and feed them into your system automatically.",
  ],

  fallback: [
    "Can you tell me a bit more so I can help you properly?",
    "I want to make sure I guide you correctly — what exactly are you trying to do?",
    "Let me understand better — are you trying to get more customers or set up your system?",
  ],
};

// ─────────────────────────────────────────────
// MEMORY GET / INIT
// ─────────────────────────────────────────────
function getMemory(userId) {
  if (!memoryStore.has(userId)) {
    memoryStore.set(userId, {
      state: "new",
      leadScore: 0,
      lastIntent: null,
    });
  }
  return memoryStore.get(userId);
}

// ─────────────────────────────────────────────
// INTENT DETECTION
// ─────────────────────────────────────────────
function detectIntent(text = "") {
  for (const [key, regex] of Object.entries(INTENTS)) {
    if (regex.test(text)) return key;
  }
  return "fallback";
}

// ─────────────────────────────────────────────
// LEAD SCORING
// ─────────────────────────────────────────────
function score(intent, current) {
  const map = {
    sales: 20,
    automation: 25,
    crm: 10,
    website: 10,
    greeting: 5,
    what_is_this: 5,
    fallback: -2,
  };

  const add = map[intent] || 0;
  return Math.min(100, Math.max(0, current + add));
}

// ─────────────────────────────────────────────
// STATE ENGINE
// ─────────────────────────────────────────────
function updateState(state, score) {
  if (score > 70) return "hot";
  if (score > 40) return "warm";
  if (score > 15) return "engaged";
  return state;
}

// ─────────────────────────────────────────────
// RESPONSE GENERATOR (SAFE)
// ─────────────────────────────────────────────
function reply(intent) {
  const pool = R[intent] || R.fallback;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─────────────────────────────────────────────
// SUPABASE LOGGING (SAFE)
// ─────────────────────────────────────────────
async function logToDB(payload) {
  if (!supabase) return;

  try {
    await supabase.from("chatbot_logs").insert([payload]);
  } catch (err) {
    console.error("DB log failed:", err.message);
  }
}

// ─────────────────────────────────────────────
// MAIN HANDLER
// ─────────────────────────────────────────────
export default async function handler(req, res) {
  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const messages = body?.messages || [];
    const userId = body?.userId || "anon";

    const lastMessage =
      messages.length > 0
        ? messages[messages.length - 1].content || ""
        : "";

    const memory = getMemory(userId);

    const intent = detectIntent(lastMessage);

    const leadScore = score(intent, memory.leadScore);

    const state = updateState(memory.state, leadScore);

    const response = reply(intent);

    // update memory
    memory.lastIntent = intent;
    memory.leadScore = leadScore;
    memory.state = state;

    // log CRM
    await logToDB({
      user_id: userId,
      message: lastMessage,
      reply: response,
      intent,
      state,
      lead_score: leadScore,
      created_at: new Date().toISOString(),
    });

    return res.status(200).json({
      reply: response,
      intent,
      state,
      leadScore,
    });
  } catch (err) {
    console.error("Chat error:", err);

    return res.status(200).json({
      reply:
        "I’m here to help — could you rephrase that so I can assist you better?",
      intent: "fallback",
      state: "new",
      leadScore: 0,
    });
  }
}