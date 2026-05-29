import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const submit = async () => {
    if (!form.name || !form.email) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      await supabase.from("leads").insert([form]);

      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      alert("Submitted successfully");

      setForm({
        name: "",
        business: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="p-5 sm:p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">

      <div className="space-y-3">

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
        />

        <input
          type="text"
          placeholder="Business"
          value={form.business}
          onChange={(e) => update("business", e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
        />

        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
        />

        <textarea
          rows={4}
          placeholder="Message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full p-3 rounded-xl bg-black/40 border border-white/10 text-white outline-none"
        />

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-purple-600 py-3 rounded-xl font-medium"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </div>
    </div>
  );
}