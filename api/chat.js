import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { messages } = JSON.parse(req.body);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages
  });

  res.json({ reply: response.choices[0].message.content });
}