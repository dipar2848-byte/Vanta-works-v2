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

    if (!messages.length) {
      return res.json({
        reply: "Please send a message first."
      });
    }

    const userMessage =
      messages[messages.length - 1]?.content || "";

    let reply = "";

    /* =========================
       TRY GROQ (PRIMARY AI)
    ========================= */
    try {
      reply = await callGroq(messages);
    } catch (err) {
      console.error("Groq failed:", err.message);

      /* =========================
         FALLBACK RESPONSE (SAFE)
      ========================= */
      reply = fallbackAI(userMessage);
    }

    /* =========================
       CRM LOGGING (SAFE ALWAYS)
    ========================= */
    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        message: userMessage,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    return res.json({ reply });

  } catch (err) {
    return res.status(500).json({
      reply:
        "System error occurred. Please try again.",
      error: err.message
    });
  }
}

/* =========================
   GROQ CALL (SAFE + DEBUGGED)
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
              "You are a helpful business assistant. Respond naturally, clearly, and avoid repetition."
          },
          ...messages
        ],
        temperature: 0.8
      })
    }
  );

  const data = await response.json();

  console.log("GROQ RESPONSE:", JSON.stringify(data));

  const reply = data?.choices?.[0]?.message?.content;

  if (!reply) {
    throw new Error(
      data?.error?.message || "Empty response from Groq"
    );
  }

  return reply;
}

/* =========================
   FALLBACK AI (NEVER BLANK)
========================= */
function fallbackAI(text) {
  const t = text.toLowerCase();

  if (t.includes("sales")) {
    return "I understand you're looking to increase sales. That usually requires a proper lead generation system and follow-up process. I can help you structure that.";
  }

  if (t.includes("website")) {
    return "A good website alone isn't enough. You need a system that converts visitors into leads.";
  }

  if (t.includes("automation")) {
    return "Automation helps you handle leads, follow-ups, and customer flow without manual effort.";
  }

  return "I understand. Can you tell me a bit more about what you're trying to achieve?";
}