import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      navigate("/login");
      return;
    }

    setUser(data.user);
    fetchLeads();
  };

  const fetchLeads = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    setLeads(data || []);
  };

  const updateStage = async (id, stage) => {
    await supabase.from("leads").update({ stage }).eq("id", id);
    fetchLeads();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // ---------- FILTERED DATA ----------
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesSearch =
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.email?.toLowerCase().includes(search.toLowerCase()) ||
        l.phone?.toLowerCase().includes(search.toLowerCase());

      const matchesStage =
        filterStage === "all" ? true : l.stage === filterStage;

      return matchesSearch && matchesStage;
    });
  }, [leads, search, filterStage]);

  // ---------- ANALYTICS ----------
  const stats = useMemo(() => {
    const count = (stage) =>
      leads.filter((l) => l.stage === stage).length;

    return {
      total: leads.length,
      new: count("new"),
      contacted: count("contacted"),
      qualified: count("qualified"),
      converted: count("converted"),
      lost: count("lost")
    };
  }, [leads]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading CRM...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded-lg w-fit"
        >
          Logout
        </button>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="glass p-4 rounded-xl text-center">
            <p className="text-zinc-400 text-sm capitalize">{key}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          placeholder="Search leads..."
          className="p-2 text-black rounded w-full md:w-1/2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 text-black rounded"
          onChange={(e) => setFilterStage(e.target.value)}
        >
          <option value="all">All Stages</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {/* LEADS PIPELINE */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="glass p-5 rounded-2xl">
            
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-zinc-400">{lead.email}</p>
                <p className="text-zinc-400">{lead.phone}</p>
                <p className="mt-2 text-sm">{lead.message}</p>
              </div>

              {/* STAGE BADGE */}
              <span className="px-3 py-1 text-xs rounded-full bg-white/10">
                {lead.stage}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["new", "contacted", "qualified", "converted", "lost"].map(
                (stage) => (
                  <button
                    key={stage}
                    onClick={() => updateStage(lead.id, stage)}
                    className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
                  >
                    {stage}
                  </button>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}