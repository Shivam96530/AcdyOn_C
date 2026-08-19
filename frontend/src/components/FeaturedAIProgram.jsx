import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { featuredProgram } from "../data/content";

export default function FeaturedAIProgram() {
  return (
    <section className="bg-[#111111] py-24 text-white" id="ai">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        <div className="grid overflow-hidden border border-white/15 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative min-h-[470px] overflow-hidden bg-gradient-to-br from-[#272727] via-[#111] to-black p-7 md:p-10">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute left-[20%] top-[14%] h-56 w-56 rounded-full border border-white/30" />
              <div className="absolute left-[31%] top-[25%] h-72 w-72 rounded-full border border-white/20" />
              <div className="absolute bottom-[-15%] right-[-5%] h-[420px] w-[420px] rounded-full border border-white/20" />
            </div>

            <div className="relative z-10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Featured AI Program
              </p>
              <p className="mt-20 text-sm text-white/50">{featuredProgram.duration}</p>
              <h2 className="mt-3 max-w-xl text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
                {featuredProgram.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                {featuredProgram.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {featuredProgram.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-white/20 px-3 py-2 text-xs text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-[#e8e5de] p-7 text-black md:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-black/45">
                Practical AI mastery for professionals who need real outcomes
              </p>
              <h3 className="mt-5 text-3xl font-medium tracking-[-0.045em]">
                Guided, applied, and outcome-focused.
              </h3>

              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {featuredProgram.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 border-t border-black/15 py-3 text-sm"
                  >
                    <Check size={15} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="mt-10 flex items-center justify-between border-b border-black pb-3 text-sm font-semibold"
            >
              View Full Program
              <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
