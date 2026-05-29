import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative text-center max-w-5xl mx-auto">

      {/* BACKGROUND GLOW LAYERS (cinematic depth) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/25 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/15 blur-[140px]" />
        <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-pink-500/10 blur-[120px]" />
      </div>

      {/* MAIN CONTENT WRAP */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative"
      >

        {/* SMALL HOOK / TAG */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-block px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm"
        >
          Conversion Systems • CRM • Automation • Growth
        </motion.div>

        {/* MAIN HEADLINE (HIGH CONTRAST HOOK) */}
        <h1 className="text-display leading-tight">
          Turn Your Website Into a{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            Revenue Engine
          </span>
        </h1>

        {/* SUBTEXT (CONTROLLED DENSITY) */}
        <p className="mt-6 text-body max-w-2xl mx-auto">
          We build high-performance conversion systems with CRM tracking,
          WhatsApp automation, booking funnels, and AI-ready infrastructure —
          designed to turn traffic into paying clients.
        </p>

        {/* CTA ZONE (PRIMARY FOCUS) */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <a href="#pricing" className="btn btn-primary">
            Get Growth System
          </a>

          <a href="#solution" className="btn btn-secondary">
            Explore System
          </a>

        </div>

        {/* MICRO TRUST LINE */}
        <p className="mt-6 text-xs text-white/40">
          Built for agencies, freelancers, and service businesses that want predictable leads
        </p>

      </motion.div>
    </div>
  );
}