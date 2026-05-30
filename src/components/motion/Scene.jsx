import { motion } from "framer-motion";

export default function Scene({ children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-[100svh] px-4 sm:px-6 md:px-10 flex items-center relative"
    >
      {children}
    </motion.section>
  );
}