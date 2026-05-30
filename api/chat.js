import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = JSON.parse(req.body);

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages
    });

    return res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      error: "AI request failed",
      details: err.message
    });
  }
}