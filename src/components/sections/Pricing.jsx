import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter Package",
    price: "₹14,999+",
    message: "Hi! I'm interested in the Starter Package (₹14,999+).",
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
    message: "Hi! I want the Growth System (₹34,999+).",
    features: [
      "Full CRM dashboard (Supabase)",
      "Lead status tracking (New / Contacted / Converted)",
      "Searchable lead system",
      "Automation-ready backend",
      "Calendly booking integration"
    ]
  },
  {
    name: "Automation System",
    price: "₹64,999+",
    message: "Hi! I want the Automation System (₹64,999+).",
    features: [
      "AI chatbot-ready architecture",
      "Lead scoring system",
      "Advanced analytics framework",
      "Multi-stage funnel system",
      "Scalable CRM infrastructure"
    ]
  }
];

export default function Pricing() {
  const phone = "91XXXXXXXXXX";

  return (
    <section className="section">
      <div className="container text-center mb-14">
        <h2 className="text-h1">Choose Your Growth System</h2>
        <p className="text-body mt-3">
          Turn your website into a lead generation engine
        </p>
      </div>

      <div className="container grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            className="card flex flex-col justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div>
              <h3 className="text-h2">{plan.name}</h3>
              <p className="text-body mt-2">{plan.price}</p>

              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {plan.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
            </div>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(
                plan.message
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-success mt-8"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}