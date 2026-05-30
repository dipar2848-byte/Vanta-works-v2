import { useEffect, useRef, useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey 👋 Want more customers for your business?",
    },
  ]);

  const [options, setOptions] = useState([
    "Learn more",
    "Pricing",
    "Book demo",
  ]);

  const [input, setInput] = useState("");

  // LEAD FORM STATE
  const [showForm, setShowForm] = useState(false);
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, showForm]);

  async function sendMessage(text) {
    if (!text) return;

    const updated = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(updated);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        userId: "guest",
      }),
    });

    const data = await res.json();

    setMessages([
      ...updated,
      {
        role: "assistant",
        content: data.reply,
      },
    ]);

    setOptions(data.options || []);

    // 🎯 TRIGGER LEAD FORM LOGIC
    if (data.flow === "pricing" || data.flow === "demo") {
      setTimeout(() => {
        setShowForm(true);
      }, 800);
    }
  }

  async function submitLead() {
    if (!lead.name || !lead.email) return;

    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Thanks! 🎉 Our team will reach out to you shortly.",
      },
    ]);

    setShowForm(false);
    setLead({ name: "", email: "", phone: "" });
  }

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-green-500 w-14 h-14 rounded-full shadow-lg"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-24 right-4 w-[92vw] sm:w-80 h-[70vh] bg-[#0b0f14] border border-white/10 rounded-2xl flex flex-col overflow-hidden z-50">

          {/* HEADER */}
          <div className="p-3 bg-[#111827] text-white text-sm font-semibold">
            Sales Assistant
          </div>

          {/* CHAT AREA */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${
                  m.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 max-w-[75%] rounded-2xl ${
                    m.role === "user"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white/10 text-white rounded-bl-none"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* 🧾 LEAD FORM INSIDE CHAT */}
            {showForm && (
              <div className="bg-white/5 p-3 rounded-xl space-y-2 border border-white/10">
                <p className="text-white text-sm font-semibold">
                  Quick step — enter details
                </p>

                <input
                  placeholder="Name"
                  className="w-full p-2 rounded bg-black border border-white/10 text-white text-sm"
                  value={lead.name}
                  onChange={(e) =>
                    setLead({ ...lead, name: e.target.value })
                  }
                />

                <input
                  placeholder="Email"
                  className="w-full p-2 rounded bg-black border border-white/10 text-white text-sm"
                  value={lead.email}
                  onChange={(e) =>
                    setLead({ ...lead, email: e.target.value })
                  }
                />

                <input
                  placeholder="Phone (optional)"
                  className="w-full p-2 rounded bg-black border border-white/10 text-white text-sm"
                  value={lead.phone}
                  onChange={(e) =>
                    setLead({ ...lead, phone: e.target.value })
                  }
                />

                <button
                  onClick={submitLead}
                  className="w-full bg-green-500 py-2 rounded text-white text-sm"
                >
                  Submit
                </button>
              </div>
            )}
          </div>

          {/* OPTIONS */}
          <div className="p-2 flex flex-wrap gap-2 border-t border-white/10">
            {options.map((opt, i) => (
              <button
                key={i}
                onClick={() => sendMessage(opt)}
                className="text-xs px-3 py-1 rounded-full bg-white/10 text-white"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 flex gap-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type message..."
              className="flex-1 bg-black text-white border border-white/10 rounded-xl px-3 py-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
            />

            <button
              onClick={() => sendMessage(input)}
              className="bg-green-500 px-4 rounded-xl text-white text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}