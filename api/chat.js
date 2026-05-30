export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { messages = [] } = body;

    const text =
      normalize(messages[messages.length - 1]?.content || "");

    const memory = extractMemory(messages);

    const intent = detectIntentByScore(text);
    const score = scoreLead(text, memory);

    const reply = generateReply(intent, memory, score);

    return res.json({
      reply,
      intent,
      score
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Chat failed",
      details: err.message
    });
  }
}

/* =========================
   TEXT NORMALIZATION
========================= */
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* =========================
   SEMANTIC INTENT SCORING
   (NO DIRECT KEYWORD CHECKS)
========================= */
function detectIntentByScore(text) {
  const intents = {
    pricing: [
      "price",
      "cost",
      "how much",
      "pricing",
      "charges",
      "rate",
      "expensive",
      "budget"
    ],
    services: [
      "what do you do",
      "service",
      "offer",
      "build",
      "website",
      "system"
    ],
    conversion: [
      "contact",
      "call",
      "book",
      "meeting",
      "appointment",
      "demo"
    ],
    whatsapp: [
      "whatsapp",
      "message me",
      "chat on whatsapp"
    ],
    ai: [
      "ai",
      "automation",
      "chatbot"
    ]
  };

  let bestIntent = "general";
  let bestScore = 0;

  for (const [intent, patterns] of Object.entries(intents)) {
    let score = 0;

    for (const pattern of patterns) {
      if (text.includes(pattern)) {
        score += pattern.length; // longer phrases = stronger signal
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIntent = intent;
    }
  }

  return bestIntent;
}

/* =========================
   LEAD SCORING (SMARTER)
========================= */
function scoreLead(text, memory) {
  let score = 0;

  if (text.length > 20) score += 1;
  if (text.includes("build") || text.includes("want")) score += 2;
  if (text.includes("book") || text.includes("call")) score += 5;

  if (memory.name) score += 1;
  if (memory.business) score += 2;

  if (score >= 6) return "hot";
  if (score >= 3) return "warm";
  return "cold";
}

/* =========================
   MEMORY EXTRACTION
========================= */
function extractMemory(messages) {
  const text = messages.map(m => m.content).join(" ").toLowerCase();

  const name = text.match(/my name is ([a-z]+)/)?.[1];
  const business = text.match(/(business|company) is ([a-z ]+)/)?.[2];

  return { name, business };
}

/* =========================
   RESPONSE ENGINE
========================= */
function generateReply(intent, memory, score) {
  const name = memory.name ? ` ${memory.name}` : "";

  if (score === "hot") {
    return `Perfect${name}. I can help you set up a full system (CRM + automation + leads). Do you want a full setup or basic website?`;
  }

  if (score === "warm") {
    if (intent === "pricing") {
      return `Our systems start from ₹14,999${name}. What type of business do you run?`;
    }

    return `Got it${name}. Are you currently getting leads from your website or not yet?`;
  }

  if (intent === "services") {
    return `We build conversion systems — websites that generate leads, CRM tracking, WhatsApp automation, and booking funnels. What business are you in?`;
  }

  if (intent === "pricing") {
    return `We have packages starting from ₹14,999. Tell me your business type and I’ll recommend the right setup.`;
  }

  return `I can help you with pricing, services, or improving your website’s lead generation. What are you trying to achieve?`;
}