import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { transformationJourneys } from "../data/content";

export default function TransformationJourney() {
  return (
    <section className="bg-[#0a0a0a] py-24 text-white" id="about">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/45">
            The transformation journey
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
            From Professional Achievement To Global Academic Recognition
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/60 md:text-lg">
            AcdyOn helps experienced professionals progress beyond career success
            into academic distinction, thought leadership, and international recognition.
          </p>
        </div>

        <div className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {transformationJourneys.map((journey, index) => (
            <motion.article
              key={journey.startingPoint}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.07 }}
              className="grid gap-7 py-8 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
            >
              <JourneyColumn
                eyebrow="Starting Point"
                title={journey.startingPoint}
                detail={journey.startingDetail}
              />
              <ArrowRight className="hidden self-center text-white/25 md:block" />
              <JourneyColumn
                eyebrow="Pathway"
                title={journey.pathway}
                detail={journey.pathwayDetail}
              />
              <ArrowRight className="hidden self-center text-white/25 md:block" />
              <JourneyColumn
                eyebrow="Outcome"
                title={journey.outcome}
                detail={journey.outcomeDetail}
              />
            </motion.article>
          ))}
        </div>

        <p className="mt-12 max-w-4xl text-2xl leading-tight tracking-[-0.04em] text-white/80 md:text-4xl">
          People do not buy a degree. They invest in credibility, authority,
          recognition, and professional transformation.
        </p>
      </div>
    </section>
  );
}

function JourneyColumn({ eyebrow, title, detail }) {
  return (
    <div>
      <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {eyebrow}
      </p>
      <h3 className="text-xl font-medium tracking-[-0.035em]">{title}</h3>
      <p className="mt-2 text-sm text-white/55">{detail}</p>
    </div>
  );
}
