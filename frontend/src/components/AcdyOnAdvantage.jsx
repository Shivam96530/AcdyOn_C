import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { advantages } from "../data/content";

export default function AcdyOnAdvantage() {
  return (
    <section className="bg-[#f4f2ee] py-24 text-[#101010]">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              The AcdyOn advantage
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
              Built for Ambitious Professionals Who Cannot Afford to Get This Wrong
            </h2>
          </div>

          <div className="border-l-0 lg:border-l border-black/15 pl-0 lg:pl-10">
            <p className="text-xs uppercase tracking-[0.18em] text-black/45">
              Our Commitment
            </p>
            <h3 className="mt-4 text-2xl font-medium tracking-[-0.04em] md:text-3xl">
              No programme is recommended before your profile is understood.
            </h3>
            <p className="mt-5 text-base leading-7 text-black/65">
              The consultation process is the product. AcdyOn does not operate
              like an admission agency pushing enrolments. Every recommendation
              is preceded by a detailed eligibility and pathway review designed
              to ensure the right fit.
            </p>

            <ul className="mt-7 space-y-3 text-sm text-black/75">
              {[
                "Eligibility reviewed before any recommendation",
                "Institution matched to your specific goals",
                "Recognition assessed for your professional context",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={17} className="mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          {/* Grid with proper borders on all cards including last row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-line">
            {advantages.map((advantage, index) => {
              const isLastRow = index >= advantages.length - 3;
              const isLastColumn = (index + 1) % 3 === 0;

              return (
                <motion.article
                  key={advantage.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`p-7 md:p-9 min-h-[220px] ${
                    !isLastRow ? "border-b" : ""
                  } ${!isLastColumn ? "md:border-r" : ""}`}
                  style={{ borderColor: "var(--line)" }}
                >
                  <span className="text-xs text-ink/40">
                    0{index + 1}
                  </span>
                  <h3 className="mt-8 text-xl font-medium tracking-[-0.035em]">
                    {advantage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink/60">
                    {advantage.description}
                  </p>
                </motion.article>
              );
            })}
          </div>

          {/* Disclaimer below grid */}
          <p className="mt-8 max-w-4xl text-xs leading-5 text-ink/45">
            AcdyOn facilitates access to programmes and academic pathways through
            partner institutions. Final admissions, academic evaluation and degree
            conferment decisions are made by the respective institutions.
          </p>
        </div>
      </div>
    </section>
  );
}
