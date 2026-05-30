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

    const userMessage =
      messages[messages.length - 1]?.content || "";

    const intent = detectIntent(userMessage);

    let reply;

    /* =========================
       1. TRY GROQ (OPTIONAL)
    ========================= */
    try {
      reply = await callGroq(messages);
    } catch (err) {
      console.log("Groq failed → switching to local intelligence");
      reply = localIntelligence(userMessage, intent);
    }

    /* =========================
       SAFETY GUARANTEE
    ========================= */
    if (!reply || reply.trim().length < 3) {
      reply = localIntelligence(userMessage, intent);
    }

    /* =========================
       CRM LOGGING
    ========================= */
    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        message: userMessage,
        intent,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    return res.json({ reply, intent });

  } catch (err) {
    return res.json({
      reply:
        "I understand your request. Can you give me a bit more detail so I can help you better?"
    });
  }
}

/* =========================
   GROQ (OPTIONAL LAYER)
========================= */
async function callGroq(messages) {
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a business assistant. Be natural, avoid repetition."
          },
          ...messages
        ],
        temperature: 0.8
      })
    }
  );

  const data = await response.json();

  const text = data?.choices?.[0]?.message?.content;

  if (!text) throw new Error("Invalid Groq response");

  return text;
}

/* =========================
   LOCAL INTELLIGENCE ENGINE
   (THIS IS NOW YOUR CORE SYSTEM)
========================= */
function localIntelligence(text, intent) {
  const t = text.toLowerCase();

  const templates = {
    sales: [
      "To improve sales, you need a structured lead system that captures and follows up automatically.",
      "Sales usually increase when you improve your conversion flow, not just traffic."
    ],

    automation: [
      "Automation can connect your leads, CRM, and messaging into one system.",
      "You can remove manual follow-ups by setting up workflows."
    ],

    pricing: [
      "Pricing depends on the level of automation and features required."
    ],

    general: [
      "I understand. Can you tell me a bit more so I can guide you properly?"
    ]
  };

  const pool = templates[intent] || templates.general;

  return pool[Math.floor(Math.random() * pool.length)];
}

/* =========================
   INTENT DETECTION
========================= */
function detectIntent(text) {
  const t = text.toLowerCase();

  if (t.includes("sales") || t.includes("leads")) return "sales";
  if (t.includes("automation") || t.includes("crm")) return "automation";
  if (t.includes("price") || t.includes("cost")) return "pricing";

  return "general";
}