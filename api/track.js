import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { event, data } = JSON.parse(req.body);

  await supabase.from("events").insert([{ event_name: event, metadata: data }]);

  res.json({ ok: true });
}