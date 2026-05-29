import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="min-h-[100svh] relative flex items-center justify-center overflow-hidden px-4">
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#4c1d95,_#000)] opacity-40"
      />

      <div className="relative z-10 max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
        >
          Websites That Don’t Just Look Good — They Generate Customers
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto"
        >
          We build conversion systems with lead capture, WhatsApp automation,
          AI funnels, and booking infrastructure.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition-all">
            Get Growth System
          </button>

          <button className="px-6 py-3 rounded-xl glass">
            View Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}