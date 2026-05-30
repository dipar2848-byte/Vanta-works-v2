import { useState } from "react";

export default function ChatWidget() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hi 👋 What would you like to do?",
      options: ["Learn more", "Pricing", "Demo"],
    },
  ]);

  const [input, setInput] = useState("");

  async function send(text) {
    const updated = [...messages, { role: "user", content: text }];

    setMessages(updated);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: updated,
        userId: "guest",
      }),
    });

    const data = await res.json();

    setMessages([
      ...updated,
      {
        role: "bot",
        content: data.reply,
        options: data.options || [],
      },
    ]);
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white border shadow-xl rounded-xl">

      <div className="p-3 bg-black text-white text-sm">
        AI Assistant
      </div>

      <div className="h-96 overflow-y-auto p-2 space-y-2">
        {messages.map((m, i) => (
          <div key={i}>
            <div
              className={`p-2 text-sm rounded ${
                m.role === "bot"
                  ? "bg-gray-200"
                  : "bg-blue-500 text-white ml-auto"
              }`}
            >
              {m.content}
            </div>

            {m.role === "bot" && m.options?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {m.options.map((o, idx) => (
                  <button
                    key={idx}
                    onClick={() => send(o)}
                    className="text-xs bg-black text-white px-2 py-1 rounded"
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 text-sm outline-none"
        />
        <button
          onClick={() => send(input)}
          className="bg-black text-white px-3"
        >
          Send
        </button>
      </div>
    </div>
  );
}