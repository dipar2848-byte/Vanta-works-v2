import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

    const reply = await callAI(messages);

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
    return res.json({
      reply: "System error. Please try again."
    });
  }
}

async function callAI(messages) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3-70b-instruct",
        messages,
        temperature: 0.8
      })
    }
  );

  const data = await response.json();

  const reply = data?.choices?.[0]?.message?.content;

  if (!reply) {
    console.log("OpenRouter error:", data);
    throw new Error("Empty response");
  }

  return reply;
}