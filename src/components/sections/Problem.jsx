import { motion } from "framer-motion";
import Scene from "../motion/Scene";

export default function Problem() {
  return (
    <Scene>
      <div className="max-w-4xl mx-auto text-center w-full">

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-h1"
        >
          Most Websites Don’t Fail at Design
        </motion.h2>

        <div className="mt-10 space-y-6 text-body text-white/80">

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.2 }}
          >
            They get traffic…
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.35 }}
          >
            but no system captures it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.5 }}
          >
            No CRM. No follow-ups. No conversion path.
          </motion.p>

        </div>

      </div>
    </Scene>
  );
}