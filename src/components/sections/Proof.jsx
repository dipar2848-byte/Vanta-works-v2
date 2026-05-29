import { motion } from "framer-motion";

export default function Proof() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Results That Speak For Themselves
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            "2x–5x more enquiries",
            "Automated follow-ups",
            "24/7 lead capture system"
          ].map((item) => (
            <div key={item} className="glass p-6 rounded-2xl">
              <p className="text-lg font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}