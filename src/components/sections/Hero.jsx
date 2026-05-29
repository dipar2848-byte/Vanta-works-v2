import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="relative text-center max-w-4xl mx-auto">

      {/* BACKGROUND GLOW LAYERS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >

        {/* TAG / SMALL HOOK */}
        <div className="mb-6 inline-block px-4 py-2 rounded-full border border-white/10 text-white/70 text-sm">
          Conversion Systems for High-Growth Businesses
        </div>

        {/* MAIN HEADLINE (STRONG CONTRAST) */}
        <h1 className="text-display leading-tight">
          Turn Your Website Into a
          <span className="text-white bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}Revenue Machine
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-body max-w-2xl mx-auto">
          We design full-stack conversion systems — CRM, WhatsApp funnels,
          booking automation, and AI-ready pipelines that convert traffic into paying clients.
        </p>

        {/* CTA ROW */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <a href="#pricing" className="btn btn-primary">
            Get Growth System
          </a>

          <a href="#solution" className="btn btn-secondary">
            See How It Works
          </a>

        </div>

        {/* MICRO SOCIAL PROOF */}
        <p className="mt-6 text-xs text-white/40">
          Built for agencies, freelancers & service businesses
        </p>

      </motion.div>

    </div>
  );
}