import { motion } from "framer-motion";
import Scene from "../motion/Scene";

const steps = [
  "Traffic enters",
  "Lead is captured",
  "Stored in CRM",
  "Automated follow-up",
  "Booked into calls"
];

export default function Solution() {
  return (
    <Scene>
      <div className="w-full max-w-5xl mx-auto text-center">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-h1"
        >
          We Don’t Build Websites.
        </motion.h2>

        <p className="mt-4 text-body text-white/70">
          We build conversion systems that run your business.
        </p>

        <div className="mt-14 space-y-6">

          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.15 }}
              className="glass-card px-6 py-4 text-white/90 text-lg"
            >
              {step}
            </motion.div>
          ))}

        </div>

      </div>
    </Scene>
  );
}