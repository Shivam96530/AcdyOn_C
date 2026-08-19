import { motion } from "framer-motion";
import { Cpu, GraduationCap, Award, Briefcase, Building } from "lucide-react";
import { programCategories } from "../data/programs";

const icons = {
  cpu: Cpu,
  "graduation-cap": GraduationCap,
  award: Award,
  briefcase: Briefcase,
  building: Building
};

export default function Programs() {
  return (
    <section className="py-24 bg-zinc-50" id="programs">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Programme Categories</h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
            Explore our comprehensive range of executive education and academic pathways.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programCategories.map((category, index) => {
            const Icon = icons[category.icon];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-14 h-14 bg-acdyon-black rounded-xl flex items-center justify-center mb-6">
                  <Icon className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                <p className="text-zinc-500 font-medium mb-4">{category.subtitle}</p>
                <p className="text-zinc-600 mb-6">{category.description}</p>
                <ul className="space-y-2">
                  {category.programs.slice(0, 3).map((program, i) => (
                    <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-acdyon-black rounded-full" />
                      {program}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
