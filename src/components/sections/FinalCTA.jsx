import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="mood-cta scene-cta">
      <div className="max-w-5xl mx-auto px-6">

        <div className="glass-card p-8 md:p-14 text-center">

          <div className="inline-flex px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm mb-6">
            Limited Client Capacity
          </div>

          <h2 className="text-display mb-6">
            Stop Losing Customers To A Weak Website
          </h2>

          <p className="text-body max-w-2xl mx-auto mb-10">
            Every day your website fails to convert visitors,
            potential customers choose competitors instead.
            Let's build a system that generates leads,
            books calls and helps your business grow.
          </p>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/YOURNUMBER?text=Hi%20VantaWorks%2C%20I'd%20like%20to%20discuss%20a%20website%20for%20my%20business."
            className="btn btn-primary"
          >
            Book Strategy Call
          </motion.a>

        </div>

      </div>
    </section>
  );
}