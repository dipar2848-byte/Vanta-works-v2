import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter Package",
    price: "₹14,999+",
    desc: "High-converting website with lead system",
    features: [
      "Landing page + conversion system",
      "Lead capture via Supabase",
      "Basic CRM dashboard",
      "WhatsApp click-to-chat",
      "Mobile optimized design"
    ],
    message:
      "Hi VantaWorks, I’m interested in the Starter Package (₹14,999+). Please share details."
  },
  {
    name: "Growth System",
    price: "₹34,999+",
    desc: "Full CRM + booking + automation system",
    features: [
      "Full CRM dashboard (Supabase)",
      "Lead status tracking (New / Contacted / Converted)",
      "Searchable lead system",
      "Email automation setup",
      "Calendly booking integration",
      "Strategy call funnel"
    ],
    message:
      "Hi VantaWorks, I want the Growth System (₹34,999+). I want CRM + booking automation setup."
  },
  {
    name: "Automation System",
    price: "₹64,999+",
    desc: "AI-ready full business automation engine",
    features: [
      "AI chatbot system architecture",
      "WhatsApp + email automation flow",
      "Lead scoring system",
      "Advanced analytics setup",
      "Multi-stage funnel system",
      "Scalable CRM infrastructure"
    ],
    message:
      "Hi VantaWorks, I want the Automation System (₹64,999+). I need full AI + automation setup."
  }
];

export default function Pricing() {
  const whatsappNumber = "91XXXXXXXXXX"; // replace your number

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <h2 className="text-4xl font-bold">
          Choose Your Growth System
        </h2>
        <p className="text-zinc-400 mt-4">
          Built to turn your website into a client acquisition machine
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <h3 className="text-2xl font-semibold">{plan.name}</h3>
              <p className="text-zinc-400 mt-1">{plan.desc}</p>
              <p className="text-3xl font-bold mt-4">{plan.price}</p>

              {/* Features */}
              <ul className="mt-6 space-y-2 text-sm text-zinc-300">
                {plan.features.map((f, idx) => (
                  <li key={idx}>• {f}</li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                plan.message
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 w-full text-center py-3 rounded-xl bg-green-500 hover:bg-green-600 transition font-medium"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}