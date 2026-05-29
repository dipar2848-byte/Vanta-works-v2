import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [user, setUser] = useState(null);
  const [leads, setLeads] = useState([]);
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

  const updateStatus = async (id, status) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    fetchLeads();
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Leads</h1>

        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="space-y-4">
        {leads.map((l) => (
          <div key={l.id} className="p-4 bg-white/5 rounded-xl">
            <p className="font-bold">{l.name}</p>
            <p>{l.email}</p>
            <p>{l.phone}</p>
            <p>{l.message}</p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => updateStatus(l.id, "contacted")}
                className="px-3 py-1 bg-blue-600 rounded"
              >
                Contacted
              </button>

              <button
                onClick={() => updateStatus(l.id, "converted")}
                className="px-3 py-1 bg-green-600 rounded"
              >
                Converted
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}