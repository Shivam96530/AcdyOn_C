import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { partnerInstitutions, universitiesByCountry } from "../data/locations";
import InstitutionLogo from "./InstitutionLogo";

export default function UniversityNetwork() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              University network
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
              Access A Global Academic Network
            </h2>
            <p className="mt-5 text-base leading-7 text-black/60">
              Partner institutions across multiple countries provide doctoral
              pathways tailored to different professional and academic goals.
            </p>
          </div>

          <a
            href="#network"
            className="inline-flex items-center gap-2 border-b border-black pb-2 text-sm font-semibold"
          >
            Explore All University Partners
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="mt-14 grid border-t border-l border-black/15 md:grid-cols-2">
          {universitiesByCountry.map((region, index) => (
            <motion.article
              key={region.country}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border-b border-r border-black/15 p-7 md:p-9"
            >
              <div className="flex items-center gap-3">
                {region.flagUrl ? (
                  <img
                    src={region.flagUrl}
                    alt={`${region.country} flag`}
                    className="w-8 h-6 object-cover rounded-sm border border-black/10 shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <span className="text-3xl">{region.flag}</span>
                )}
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/40">
                    {region.category}
                  </p>
                  <h3 className="text-2xl font-medium tracking-[-0.04em]">
                    {region.country}
                  </h3>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                {region.universities.map((universityName) => {
                  const matchedInst = partnerInstitutions.find(
                    (p) =>
                      p.name === universityName ||
                      p.shortName === universityName ||
                      universityName.includes(p.shortName || p.name)
                  );

                  return (
                    <div
                      key={universityName}
                      className="flex items-center gap-2 border-b border-black/15 pb-1.5"
                    >
                      {matchedInst && (
                        <InstitutionLogo institution={matchedInst} size="sm" />
                      )}
                      <span className="text-sm font-medium text-black/85">
                        {universityName}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {region.programs.map((program) => (
                  <span
                    key={program}
                    className="border border-black/15 px-2.5 py-1 text-[11px] text-black/60"
                  >
                    {program}
                  </span>
                ))}
              </div>

              <p className="mt-6 max-w-xl text-sm leading-6 text-black/55">
                {region.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
