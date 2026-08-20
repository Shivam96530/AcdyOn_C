import { motion } from "framer-motion";
import { partnerInstitutions } from "../data/locations";

export default function RecognitionTicker() {
  const names = partnerInstitutions.map(
    (institution) => institution.shortName || institution.name
  );

  const tickerItems = [...names, ...names, ...names];

  return (
    <section className="overflow-hidden border-y border-black/10 bg-[#f3f1ed] py-5">
      <div className="mb-3 px-5 text-center text-[10px] uppercase tracking-[0.2em] text-black/45">
        Global Academic Network
      </div>

      <motion.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        className="flex w-max items-center whitespace-nowrap"
      >
        {tickerItems.map((name, index) => (
          <div
            key={`${name}-${index}`}
            className="flex items-center text-lg font-semibold tracking-[-0.04em] text-black/80 md:text-2xl shrink-0"
          >
            <span className="pr-9">{name}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-black/20 mr-9" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
