import { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Need more customers for your business?"
    }
  ]);

  const [input, setInput] = useState("");

  const send = async () => {
    if (!input) return;

    const updated = [...messages, {
      role: "user",
      content: input
    }];

    setMessages(updated);

    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: updated })
      });

      const data = await res.json();

      setMessages([
        ...updated,
        {
          role: "assistant",
          content: data.reply
        }
      ]);
    } catch {
      setMessages([
        ...updated,
        {
          role: "assistant",
          content: "Something went wrong."
        }
      ]);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-purple-600 w-14 h-14 rounded-full"
      >
        AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 w-[90vw] sm:w-80 h-[70vh] max-h-[500px] glass rounded-2xl p-4 z-50 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 text-sm">
            {messages.map((m, i) => (
              <div key={i}>
                <p className="text-zinc-300">
                  <strong>{m.role}</strong>: {m.content}
                </p>
              </div>
            ))}
          </div>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something..."
            className="mt-4 bg-black border border-white/10 rounded-xl p-3"
          />

          <button
            onClick={send}
            className="mt-3 bg-purple-600 py-3 rounded-xl"
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}