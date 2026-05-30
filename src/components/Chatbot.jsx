import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Need more customers for your business?",
    },
  ]);

  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage(text) {
    if (!text) return;

    const newMessages = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          userId: "guest",
        }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);

      // IMPORTANT: button options from backend
      setOptions(data.options || []);

    } catch (err) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Something went wrong. Try again.",
        },
      ]);
    }
  }

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-purple-600 w-14 h-14 rounded-full"
      >
        AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 w-[90vw] sm:w-80 h-[70vh] max-h-[500px] glass rounded-2xl p-4 z-50 flex flex-col">

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i}>
                <p
                  className={
                    m.role === "user"
                      ? "text-right text-white"
                      : "text-left text-zinc-300"
                  }
                >
                  <span className="opacity-60">
                    {m.role}:
                  </span>{" "}
                  {m.content}
                </p>
              </div>
            ))}
          </div>

          {/* BUTTON OPTIONS (IMPORTANT UPGRADE) */}
          {options.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(opt)}
                  className="px-3 py-1 text-xs bg-white/10 rounded-full hover:bg-white/20"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* INPUT */}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="mt-3 bg-black border border-white/10 rounded-xl p-3"
          />

          <button
            onClick={() => sendMessage(input)}
            className="mt-3 bg-purple-600 py-3 rounded-xl"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}