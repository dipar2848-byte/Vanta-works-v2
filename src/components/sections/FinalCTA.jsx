import LeadForm from "../LeadForm";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="mood-cta relative">

      <div className="container-text text-center mb-10">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-h1"
        >
          Your System Starts Here
        </motion.h2>

        <p className="text-body mt-4 text-white/70">
          One setup away from turning traffic into predictable revenue.
        </p>

      </div>

      <div className="max-w-md mx-auto">
        <LeadForm />
      </div>

      {/* cinematic glow */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[160px]" />
      </div>

    </section>
  );
}