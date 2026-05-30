import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminChatbot() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const { data } = await supabase
      .from("chatbot_logs")
      .select("*")
      .order("created_at", { ascending: false });

    setLogs(data || []);
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Chatbot Leads Dashboard
      </h1>

      <div className="grid gap-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="text-sm text-white/60">
              {log.email || "No email"}
            </div>

            <div className="mt-2">
              <b>Message:</b> {log.message}
            </div>

            <div className="text-sm mt-2 text-white/70">
              Intent: {log.intent} | Score: {log.score} | Stage: {log.stage}
            </div>

            <div className="text-xs mt-2 text-white/40">
              {new Date(log.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}