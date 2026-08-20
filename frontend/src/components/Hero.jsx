import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import CutButton from "./CutButton";
import { partnerInstitutions } from "../data/locations";
import { heroStats } from "../data/content";

const demoEnrollments = [
  { name: "Layla H.", location: "UAE", program: "DBA" },
  { name: "Ahmed S.", location: "Egypt", program: "PhD" },
  { name: "Priya M.", location: "India", program: "AI Mastery" },
  { name: "Marcus K.", location: "Germany", program: "DBA" },
];

export default function Hero() {
  const [enroll, setEnroll] = useState(0);
  const [recognitionIndex, setRecognitionIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setEnroll((n) => (n + 1) % demoEnrollments.length),
      3800
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setRecognitionIndex((n) => (n + 1) % partnerInstitutions.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  const current = demoEnrollments[enroll];

  return (
    <section className="p-3 md:p-4 pt-24 md:pt-28" id="hero">
      <div className="glass-frame min-h-[92vh] flex flex-col">
        {/* Ambient warm backdrop — subtle, not washed out */}
        <div
          className="absolute inset-0 pointer-events-none anim-fade"
          style={{ animationDelay: "0.15s" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(1000px 500px at 85% 20%, rgba(200,69,31,0.20), transparent 55%), radial-gradient(700px 400px at 15% 85%, rgba(201,169,97,0.14), transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,241,234,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(245,241,234,0.7) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-10">
          <div
            className="anim-stagger flex items-center gap-2.5"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-[10px] uppercase tracking-[0.32em] text-paper/50 font-medium">
              Recognized at
            </span>
            <div className="relative h-4 flex items-center overflow-hidden min-w-[260px]">
              {partnerInstitutions.map((uni, i) => {
                const displayName =
                  uni.shortName ||
                  uni.name.replace(/\s+University$/i, "").trim();

                return (
                  <span
                    key={uni.id}
                    className="absolute left-0 text-[11px] uppercase tracking-[0.22em] text-paper font-semibold transition-all duration-700 ease-out whitespace-nowrap"
                    style={{
                      opacity: recognitionIndex === i ? 1 : 0,
                      transform:
                        recognitionIndex === i
                          ? "translateY(0)"
                          : "translateY(8px)",
                    }}
                  >
                    {displayName}
                  </span>
                );
              })}
            </div>
          </div>
          <div
            className="hidden md:flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-paper/70 anim-stagger"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Global network live
          </div>
        </div>

        {/* Main grid: headline + stats side by side */}
        <div className="relative z-10 grid lg:grid-cols-[1.35fr_0.65fr] gap-10 px-6 md:px-12 py-12 md:py-16 flex-1 items-center">
          {/* Left: headline */}
          <div>
            <h1 className="font-display text-paper text-[46px] sm:text-6xl md:text-7xl lg:text-[92px] leading-[1.02] tracking-[-0.035em]">
              <span className="line-mask">
                <span style={{ animationDelay: "0.35s" }}>Your next credential</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.48s" }}>should carry</span>
              </span>
              <span className="line-mask">
                <span style={{ animationDelay: "0.61s" }}>
                  <em className="not-italic" style={{ color: "#e07a53" }}>
                    real
                  </em>{" "}
                  authority.
                </span>
              </span>
            </h1>

            <p
              className="mt-8 max-w-xl text-paper/75 text-base md:text-lg leading-relaxed anim-stagger"
              style={{ animationDelay: "0.85s" }}
            >
              Executive doctoral pathways and academic recognition for leaders
              who need their investment to signal trust — not just completion.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 anim-stagger"
              style={{ animationDelay: "1s" }}
            >
              <CutButton href="#find-path" variant="solid-accent" size="lg">
                Book Eligibility Review
                <ArrowRight size={16} />
              </CutButton>
              <CutButton href="#programs" variant="outline-dark" size="lg">
                Explore Programs
              </CutButton>
            </div>

            {/* Live enrollment chip */}
            <div
              className="mt-10 flex items-center gap-3 anim-stagger"
              style={{ animationDelay: "1.2s" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <p key={enroll} className="text-xs text-paper/65 anim-fade">
                <span className="text-paper">{current.name}</span> from{" "}
                <span className="text-paper">{current.location}</span> enrolled in{" "}
                <span className="text-paper">{current.program}</span>
                <span className="ml-2 text-[9px] uppercase tracking-widest text-paper/35">
                  demo
                </span>
              </p>
            </div>
          </div>

          {/* Right: stats panel */}
          <div
            className="glass-panel p-6 md:p-8 anim-stagger relative"
            style={{ animationDelay: "1.1s" }}
          >
            {/* Corner accents */}
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-paper/40" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-paper/40" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-paper/40" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-paper/40" />

            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-gold" />
                <p className="text-[10px] uppercase tracking-[0.24em] text-paper/60">
                  Global signal
                </p>
              </div>
              <span className="text-[10px] text-paper/45">01 / 05</span>
            </div>

            <p className="text-paper text-xl md:text-2xl font-medium leading-tight tracking-tight mb-8">
              The moment your investment signals authority.
            </p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-7 border-t border-paper/15 pt-7">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display text-4xl md:text-5xl leading-none tracking-tight"
                    style={{ color: "#e6c78a" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-paper/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-5 border-t border-paper/15 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-paper/50">
              <span className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                Live
              </span>
              <span>18+ countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
