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

    const trimmedMessages = messages.slice(-10); // keep context light

    const userMessage =
      trimmedMessages[trimmedMessages.length - 1]?.content || "";

    /* =========================
       CALL GROQ (PRIMARY BRAIN)
    ========================= */
    const reply = await callGroq(trimmedMessages);

    /* =========================
       CRM LOGGING
    ========================= */
    await supabase.from("chatbot_logs").insert([
      {
        email: email || null,
        message: userMessage,
        reply,
        created_at: new Date().toISOString()
      }
    ]);

    return res.json({
      reply
    });

  } catch (err) {
    return res.status(500).json({
      error: "Chat failed",
      details: err.message
    });
  }
}

/* =========================
   GROQ CALL (REAL AI ENGINE)
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
            content: `
You are a highly intelligent business assistant.

Rules:
- Respond naturally like a human consultant
- Avoid repeating the same phrases
- Do not use scripted sales patterns
- Understand user intent deeply
- Adapt tone dynamically (casual, analytical, strategic)
- Do NOT always ask questions
- Sometimes give answers, sometimes suggest actions, sometimes analyze

Your goal is to be useful, not repetitive or robotic.
            `.trim()
          },
          ...messages
        ],
        temperature: 0.9
      })
    }
  );

  const data = await response.json();

  if (!data?.choices?.[0]?.message?.content) {
    throw new Error("Invalid Groq response");
  }

  return data.choices[0].message.content;
}