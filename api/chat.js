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
       LAYER 1 — GROQ (PRIMARY AI)
    ========================= */
    try {
      reply = await callGroq(messages, intent);
    } catch (err) {
      console.warn("Groq failed → fallback activated");

      /* =========================
         LAYER 2 — SMART FALLBACK AI
      ========================= */
      reply = smartFallback(userMessage, intent);

      if (!reply) {
        /* =========================
           LAYER 3 — RULE ENGINE
        ========================= */
        reply = ruleFallback(intent);
      }
    }

    /* =========================
       CRM LOGGING (ALWAYS WORKS)
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

    return res.json({
      reply,
      intent,
      mode: reply.includes("system") ? "fallback" : "ai"
    });

  } catch (err) {
    return res.status(500).json({
      error: "Critical failure",
      details: err.message
    });
  }
}

/* =========================
   LAYER 1 — GROQ AI
========================= */
async function callGroq(messages, intent) {
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
              "You are a high-end sales assistant. Convert users into leads. Be concise, clear, business-focused."
          },
          ...messages
        ],
        temperature: 0.7
      })
    }
  );

  const data = await response.json();

  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Invalid Groq response");
  }

  return data.choices[0].message.content;
}

/* =========================
   LAYER 2 — SMART FALLBACK (NO AI)
========================= */
function smartFallback(text, intent) {
  const t = text.toLowerCase();

  if (intent === "sales") {
    return "Got it — you're looking to increase sales. That usually requires a proper lead system (not just traffic). Do you want leads from ads, Instagram, or organic reach?";
  }

  if (intent === "automation") {
    return "Automation can connect your CRM, WhatsApp, and lead tracking so everything runs automatically. What part do you want to automate first?";
  }

  if (intent === "pricing") {
    return "Pricing depends on system complexity and automation level. Are you looking for a basic setup or full system?";
  }

  if (t.includes("help")) {
    return "I can help you structure a proper system for your business. What are you trying to achieve?";
  }

  return null;
}

/* =========================
   LAYER 3 — RULE ENGINE (LAST RESORT)
========================= */
function ruleFallback(intent) {
  if (intent === "sales") {
    return "We can help you set up a system to generate consistent leads and clients.";
  }

  if (intent === "automation") {
    return "Automation removes manual work by connecting your systems together.";
  }

  return "Let me understand your requirement better so I can guide you properly.";
}

/* =========================
   INTENT DETECTION
========================= */
function detectIntent(text) {
  const t = text.toLowerCase();

  if (
    t.includes("sales") ||
    t.includes("leads") ||
    t.includes("clients") ||
    t.includes("customers")
  ) return "sales";

  if (
    t.includes("automation") ||
    t.includes("crm") ||
    t.includes("whatsapp")
  ) return "automation";

  if (
    t.includes("price") ||
    t.includes("cost") ||
    t.includes("budget")
  ) return "pricing";

  return "general";
}