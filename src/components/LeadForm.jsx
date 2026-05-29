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
      <div className="text-green-400">
        Thanks! We’ll contact you soon.
      </div>
    );
  }

  return (
    <div className="glass p-6 rounded-2xl space-y-3">
      <input
        name="name"
        placeholder="Name"
        className="w-full p-2 text-black"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="business"
        placeholder="Business"
        className="w-full p-2 text-black"
        value={form.business}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className="w-full p-2 text-black"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        className="w-full p-2 text-black"
        value={form.phone}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Message"
        className="w-full p-2 text-black"
        value={form.message}
        onChange={handleChange}
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-blue-600 py-2 rounded"
      >
        {loading ? "Sending..." : "Get Free Audit"}
      </button>
    </div>
  );
}