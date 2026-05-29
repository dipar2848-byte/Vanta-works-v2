import { motion } from "framer-motion";
import Scene from "../motion/Scene";

const features = [
  "Lead Capture Automation",
  "WhatsApp Funnels",
  "AI Chatbot Assistant",
  "Booking Systems"
];

export default function Solution() {
  return (
    <Scene>
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-5xl font-bold text-center">
          We Build Conversion Systems, Not Just Websites
        </h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16"
        >
          {features.map((item) => (
            <motion.div
              key={item}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: { opacity: 1, y: 0 }
              }}
              className="glass p-6 rounded-3xl"
            >
              <h3 className="text-xl font-semibold">{item}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Scene>
  );
}