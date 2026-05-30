import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter System",
    price: "₹14,999+",
    subtitle: "Get leads, not just traffic",
    message: "Hi! I'm interested in the Starter System (₹14,999+).",
    features: [
      "Conversion-focused website",
      "Lead capture system (Supabase)",
      "WhatsApp integration",
      "Mobile-first responsive design"
    ]
  },
  {
    name: "Growth System",
    price: "₹34,999+",
    subtitle: "Turn visitors into tracked leads",
    message: "Hi! I want the Growth System (₹34,999+).",
    features: [
      "Full CRM dashboard",
      "Lead status tracking",
      "Searchable lead system",
      "Automation-ready backend",
      "Calendly booking integration"
    ]
  },
  {
    name: "Automation System",
    price: "₹64,999+",
    subtitle: "Fully automated revenue engine",
    message: "Hi! I want the Automation System (₹64,999+).",
    features: [
      "AI chatbot-ready architecture",
      "Lead scoring system",
      "Advanced analytics",
      "Multi-stage funnel system",
      "Scalable CRM infrastructure"
    ]
  }
];

export default function Pricing() {
  const phone = "91XXXXXXXXXX";

  return (
    <section className="mood-pricing relative">

      <div className="container-text text-center mb-16">
        <h2 className="text-h1">
          Choose Your Growth Level
        </h2>

        <p className="text-body mt-4 text-white/70">
          Every level unlocks a stronger system for converting visitors into clients.
        </p>
      </div>

      {/* VERTICAL LADDER */}
      <div className="flex flex-col gap-10 max-w-3xl mx-auto">

        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15 }}
            className={`glass-card p-8 text-left relative overflow-hidden ${
              i === 2 ? "border border-cyan-500/30" : ""
            }`}
          >

            {/* LEVEL BADGE */}
            <div className="text-xs text-white/40 mb-2">
              Level {i + 1}
            </div>

            <h3 className="text-h2">{plan.name}</h3>

            <p className="text-white/60 mt-1">
              {plan.subtitle}
            </p>

            <p className="text-lg font-semibold mt-3 text-white">
              {plan.price}
            </p>

            <ul className="mt-6 space-y-2 text-sm text-white/70">
              {plan.features.map((f, idx) => (
                <li key={idx}>• {f}</li>
              ))}
            </ul>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(
                plan.message
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-8 inline-flex"
            >
              Unlock This Level
            </a>

          </motion.div>
        ))}

      </div>
    </section>
  );
}