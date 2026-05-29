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
  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    setLoading(true);

    const { error } = await supabase.from("leads").insert([form]);

    setLoading(false);

    if (!error) {
      setDone(true);
      setForm({
        name: "",
        business: "",
        email: "",
        phone: "",
        message: ""
      });
    } else {
      alert(error.message);
    }
  };

  if (done) {
    return (
      <div className="text-green-400 text-sm">
        ✓ Request received. We’ll contact you shortly.
      </div>
    );
  }

  const inputStyle =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-500 outline-none focus:border-white/30 focus:bg-white/10 transition";

  return (
    <div className="space-y-3 text-left">
      <input
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        className={inputStyle}
      />

      <input
        name="business"
        placeholder="Business Name"
        value={form.business}
        onChange={handleChange}
        className={inputStyle}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className={inputStyle}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className={inputStyle}
      />

      <textarea
        name="message"
        placeholder="Tell us about your business..."
        value={form.message}
        onChange={handleChange}
        rows="4"
        className={`${inputStyle} resize-none`}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-white/10 to-white/5 border border-white/10 hover:border-white/30 text-white font-medium transition"
      >
        {loading ? "Sending..." : "Get Free Growth Audit"}
      </button>
    </div>
  );
}