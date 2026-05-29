import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Admin() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    setLeads(data || []);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 sm:p-10">
      <h1 className="text-3xl font-bold mb-10">
        Leads Dashboard
      </h1>

      <div className="space-y-6">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="glass p-6 rounded-2xl"
          >
            <h2 className="text-xl font-semibold">
              {lead.name}
            </h2>

            <p className="text-zinc-400 mt-2">
              {lead.email}
            </p>

            <p className="text-zinc-400">
              {lead.phone}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
                            }
