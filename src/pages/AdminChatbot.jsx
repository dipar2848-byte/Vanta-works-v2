import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminChatbot() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("chatbot_logs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        setLogs([]);
      } else {
        setLogs(data || []);
      }
    } catch (err) {
      console.log(err);
      setLogs([]);
    }

    setLoading(false);
  }

  // GROUP BY USER (CRM STYLE)
  const grouped = logs.reduce((acc, log) => {
    const id = log.user_id || log.email || "unknown";

    if (!acc[id]) {
      acc[id] = [];
    }

    acc[id].push(log);
    return acc;
  }, {});

  const users = Object.keys(grouped);

  return (
    <div className="p-6 text-white">

      <h1 className="text-2xl font-bold mb-6">
        Chatbot CRM Dashboard
      </h1>

      {loading && (
        <div className="text-white/60">Loading leads...</div>
      )}

      {!loading && users.length === 0 && (
        <div className="text-white/60">No leads found</div>
      )}

      <div className="grid gap-6">

        {users.map((userId) => {
          const userLogs = grouped[userId];
          const latest = userLogs[0];

          return (
            <div
              key={userId}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >

              {/* LEAD HEADER */}
              <div className="flex justify-between">
                <div className="text-sm text-white/70">
                  {latest.email || userId}
                </div>

                <div className="text-xs text-white/40">
                  Score: {latest.score || 0}
                </div>
              </div>

              <div className="text-sm mt-2">
                <b>Latest Message:</b> {latest.message}
              </div>

              <div className="text-xs mt-1 text-white/50">
                Intent: {latest.intent || "unknown"} | Stage:{" "}
                {latest.stage || "new"}
              </div>

              {/* CONVERSATION PREVIEW */}
              <div className="mt-3 max-h-40 overflow-y-auto text-xs text-white/60 space-y-1">
                {userLogs.slice(0, 5).map((log, i) => (
                  <div key={i}>
                    • {log.message}
                  </div>
                ))}
              </div>

              <div className="text-[10px] mt-2 text-white/30">
                {new Date(latest.created_at).toLocaleString()}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}