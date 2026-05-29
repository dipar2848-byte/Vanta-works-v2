import { motion } from "framer-motion";
import LeadForm from "../LeadForm";

export default function CTA() {
  return (
    <section className="relative py-24 px-6 sm:px-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight"
        >
          Stop Losing Customers From Your Website
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-zinc-400 max-w-2xl mx-auto text-base sm:text-lg"
        >
          If your website isn’t generating enquiries, it’s not a business tool —
          it’s just decoration. We turn it into a 24/7 client acquisition system.
        </motion.p>

        {/* Content grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left space-y-4"
          >
            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-lg">🚀 Instant Lead Capture</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Every visitor becomes a tracked lead in your system.
              </p>
            </div>

            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-lg">⚡ Automated Follow-ups</h3>
              <p className="text-zinc-400 text-sm mt-1">
                No missed customers. Your system follows up automatically.
              </p>
            </div>

            <div className="glass p-5 rounded-2xl">
              <h3 className="font-semibold text-lg">🤖 AI Assisted Conversion</h3>
              <p className="text-zinc-400 text-sm mt-1">
                Chatbot + funnel logic turns visitors into booked calls.
              </p>
            </div>
          </motion.div>

          {/* Right: Lead Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="glass p-6 sm:p-8 rounded-2xl"
          >
            <h3 className="text-xl font-semibold mb-4 text-left">
              Get Your Free Growth Audit
            </h3>

            <LeadForm />
          </motion.div>
        </div>

        {/* Bottom micro CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-xs text-zinc-500"
        >
          No spam. No fluff. Just a clear breakdown of how you can get more customers.
        </motion.p>
      </div>
    </section>
  );
}