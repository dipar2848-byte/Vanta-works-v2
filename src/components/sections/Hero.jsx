import { motion, useTransform, useScroll } from "framer-motion";
import { useContext } from "react";
import { ScrollContext } from "../motion/ScrollProvider";

export default function Hero() {
  const progress = useContext(ScrollContext);

  // scroll-based transformations
  const y = useTransform(() => progress * -120);
  const scale = useTransform(() => 1 - progress * 0.1);
  const opacity = useTransform(() => 1 - progress * 0.6);

  return (
    <div className="relative text-center max-w-5xl mx-auto min-h-[100svh] flex items-center justify-center">

      {/* CINEMATIC BACKGROUND GLOW */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/25 blur-[160px]"
          style={{ transform: `translateX(-50%) scale(${1 + progress})` }}
        />

        <div
          className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/15 blur-[160px]"
          style={{ opacity: 0.8 - progress * 0.5 }}
        />

        <div
          className="absolute top-[20%] left-[20%] w-[350px] h-[350px] bg-pink-500/10 blur-[140px]"
          style={{ opacity: 0.6 - progress * 0.4 }}
        />
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        style={{ y, scale, opacity }}
        className="relative will-change-transform"
      >

        {/* TAG */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm"
        >
          Conversion Systems • CRM • Automation • Growth
        </motion.div>

        {/* HEADLINE */}
        <h1 className="text-display leading-tight">
          Turn Your Website Into a{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300 bg-clip-text text-transparent">
            Revenue Engine
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-body max-w-2xl mx-auto">
          We build high-performance conversion systems with CRM tracking,
          WhatsApp automation, booking funnels, and AI-ready infrastructure —
          designed to turn traffic into paying clients.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <a href="#pricing" className="btn btn-primary">
            Get Growth System
          </a>

          <a href="#solution" className="btn btn-secondary">
            Explore System
          </a>

        </div>

        {/* TRUST */}
        <p className="mt-6 text-xs text-white/40">
          Built for agencies, freelancers, and service businesses that want predictable leads
        </p>

      </motion.div>
    </div>
  );
}