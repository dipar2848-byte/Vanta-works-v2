import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* MAIN HEADING */}
        <h1 className="text-display">
          Websites That Don’t Just Look Good — They Generate Customers
        </h1>

        {/* SUBTEXT */}
        <p className="mt-6 text-body">
          We build conversion systems with CRM, WhatsApp funnels, booking automation,
          and AI-ready workflows that turn traffic into revenue.
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">

          <a href="#pricing" className="btn btn-primary">
            Get Growth System
          </a>

          <a href="#solution" className="btn btn-secondary">
            View System
          </a>

        </div>

      </motion.div>

    </div>
  );
}