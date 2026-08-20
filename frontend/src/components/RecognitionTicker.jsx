import { motion } from "framer-motion";
import { partnerInstitutions } from "../data/locations";
import InstitutionLogo from "./InstitutionLogo";

export default function RecognitionTicker() {
  const tickerItems = [...partnerInstitutions, ...partnerInstitutions, ...partnerInstitutions];

  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#f3f1ed] py-6 md:py-8">
      <div className="mb-4 px-5 text-center text-[10px] uppercase tracking-[0.2em] text-black/45 font-medium">
        Global Academic Network
      </div>

      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {tickerItems.map((inst, index) => {
          const name = inst.shortName || inst.name;
          return (
            <div
              key={`${inst.id}-${index}`}
              className="flex items-center text-lg font-semibold tracking-[-0.04em] text-black/85 md:text-2xl shrink-0"
            >
              <div className="flex items-center gap-3.5 pr-10">
                <InstitutionLogo institution={inst} size="xl" />
                <span>{name}</span>
              </div>
              <span className="h-1.5 w-1.5 rounded-full bg-black/20 mr-10" />
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
