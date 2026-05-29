import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">
      
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-display"
      >
        Websites That Don’t Just Look Good — They Generate Customers
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-body"
      >
        We build conversion systems with lead capture, WhatsApp funnels,
        booking automation, and AI-driven workflows that turn traffic into revenue.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >
       <a
  href="#pricing"
  className="btn btn-primary"
>
  Get Growth System
</a>

<a
  href="#solution"
  className="btn btn-secondary"
>
  View System
</a>
  );
}