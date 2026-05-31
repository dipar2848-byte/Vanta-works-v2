import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    outcome: "Get Online",
    price: "₹9,999",
    description:
      "Perfect for businesses that need a professional online presence and a way to start generating enquiries.",
    message: "Hi! I'm interested in the Starter Package (₹9,999).",
    features: [
      "Mobile-first responsive website",
      "Premium modern website design",
      "WhatsApp click-to-chat integration",
      "Contact & enquiry forms",
      "Lead capture setup",
      "Basic SEO setup",
      "Fast deployment",
      "Conversion-focused page structure",
    ],
  },
  {
    name: "Growth",
    outcome: "Build a Sales System",
    price: "₹19,999",
    popular: true,
    description:
      "Ideal for businesses that want to track leads, manage enquiries, and convert more prospects into customers.",
    message: "Hi! I'm interested in the Growth Package (₹19,999).",
    features: [
      "Everything in Starter",
      "CRM dashboard",
      "Lead database system",
      "Lead status tracking",
      "Search & filter leads",
      "Automated lead notifications",
      "Calendly booking integration",
      "Strategy call funnel setup",
    ],
  },
  {
    name: "Automation",
    outcome: "Automate Growth",
    price: "₹34,999+",
    description:
      "Built for businesses ready to scale with automation, advanced workflows, and AI-ready infrastructure.",
    message: "Hi! I'm interested in the Automation Package (₹34,999+).",
    features: [
      "Everything in Growth",
      "Lead scoring system",
      "Follow-up automation architecture",
      "AI-ready chatbot infrastructure",
      "Workflow automation framework",
      "Analytics framework",
      "Scale-ready CRM architecture",
      "Multi-stage funnel system",
    ],
  },
];

const comparison = [
  ["Professional Website", "✓", "✓", "✓"],
  ["WhatsApp Integration", "✓", "✓", "✓"],
  ["Lead Capture Forms", "✓", "✓", "✓"],
  ["CRM Dashboard", "—", "✓", "✓"],
  ["Lead Tracking", "—", "✓", "✓"],
  ["Calendly Booking Funnel", "—", "✓", "✓"],
  ["Lead Scoring", "—", "—", "✓"],
  ["Workflow Automation", "—", "—", "✓"],
  ["AI-Ready Infrastructure", "—", "—", "✓"],
];

export default function Pricing() {
  const phone = "91XXXXXXXXXX"; // Replace with your number

  return (
    <section className="relative py-24 px-5 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-20 relative z-10">

        <div className="inline-flex px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm mb-6">
          Pricing & Packages
        </div>

        <h2 className="text-4xl md:text-6xl font-bold leading-tight">
          Choose The System
          <br />
          That Fits Your Business
        </h2>

        <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
          Whether you need a professional website, a lead management system,
          or a scalable automation engine — there's a package built for your stage.
        </p>

      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 relative z-10">

        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className={`relative rounded-3xl p-8 backdrop-blur-xl border ${
              plan.popular
                ? "border-cyan-400/40 bg-cyan-500/10 lg:scale-105"
                : "border-white/10 bg-white/5"
            }`}
          >

            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-cyan-500 text-black text-xs font-bold">
                MOST POPULAR
              </div>
            )}

            <div className="text-cyan-400 text-sm font-medium mb-3">
              {plan.outcome}
            </div>

            <h3 className="text-3xl font-bold">
              {plan.name}
            </h3>

            <div className="mt-4 text-4xl font-black">
              {plan.price}
            </div>

            <p className="text-white/60 mt-4 leading-relaxed">
              {plan.description}
            </p>

            <a
              href={`https://wa.me/${phone}?text=${encodeURIComponent(
                plan.message
              )}`}
              target="_blank"
              rel="noreferrer"
              className={`mt-8 w-full flex justify-center items-center py-4 rounded-xl font-semibold transition ${
                plan.popular
                  ? "bg-cyan-500 text-black hover:scale-[1.02]"
                  : "bg-white/10 text-white hover:bg-white/15"
              }`}
            >
              Book Strategy Call
            </a>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-white font-medium mb-4">
                What's Included
              </div>

              <ul className="space-y-3 text-white/75">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <span className="text-cyan-400 mt-1">
                      ✓
                    </span>

                    <span>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto mt-24 relative z-10">

        <h3 className="text-3xl font-bold text-center mb-10">
          Compare Packages
        </h3>

        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-5">Feature</th>
                <th className="p-5">Starter</th>
                <th className="p-5">Growth</th>
                <th className="p-5">Automation</th>
              </tr>
            </thead>

            <tbody>
              {comparison.map((row) => (
                <tr
                  key={row[0]}
                  className="border-b border-white/5"
                >
                  <td className="p-5 text-white/80">
                    {row[0]}
                  </td>

                  <td className="text-center p-5">
                    {row[1]}
                  </td>

                  <td className="text-center p-5">
                    {row[2]}
                  </td>

                  <td className="text-center p-5">
                    {row[3]}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-3xl mx-auto text-center mt-20 relative z-10">

        <h3 className="text-3xl font-bold">
          Not Sure Which Package Fits?
        </h3>

        <p className="text-white/60 mt-4">
          Book a free strategy call and we'll recommend the best system
          for your business goals and budget.
        </p>

        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(
            "Hi! I'd like a free strategy call."
          )}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-8 px-8 py-4 rounded-xl bg-cyan-500 text-black font-semibold hover:scale-105 transition"
        >
          Book Free Strategy Call
        </a>

      </div>

    </section>
  );
}