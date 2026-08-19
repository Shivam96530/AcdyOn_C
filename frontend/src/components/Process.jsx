import { motion } from "framer-motion";
import { processSteps } from "../data/universities";

export default function Process() {
  return (
    <section className="py-24 bg-acdyon-black text-white" id="about">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            A guided process beginning with consultation rather than immediate enrolment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="text-6xl font-bold text-zinc-800 mb-4">{step.number}</div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-zinc-400">{step.description}</p>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-zinc-800 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
