import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    const { page = 1, limit = 50, user_id } = req.query;

    let query = supabase
      .from("chatbot_logs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // FILTER BY USER (optional)
    if (user_id) {
      query = query.eq("user_id", user_id);
    }

    // PAGINATION
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query.range(from, to);

    if (error) {
      return res.status(500).json({
        error: "Database fetch failed",
        details: error.message,
      });
    }

    return res.status(200).json({
      data: data || [],
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count || 0,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server crash",
      details: err.message,
    });
  }
}