import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  "How do I turn my professional experience into recognised academic credentials?",
  "Which doctoral pathway fits my career?",
  "Can I build AI capability without becoming a full-time engineer?",
  "Which programme matches my experience?",
  "What should my next professional step be?",
];

// Palette that matches the AcdyOn homepage (navy + ivory + gold + terracotta)
const CARD_GRADIENTS = [
  "linear-gradient(135deg, #0d1a30 0%, #12213a 50%, #1a2d4f 100%)",
  "linear-gradient(135deg, #12213a 0%, #1a2d4f 50%, #0d1a30 100%)",
  "linear-gradient(135deg, #0f1c34 0%, #1a2d4f 50%, #12213a 100%)",
  "linear-gradient(135deg, #14243e 0%, #1a2d4f 50%, #0d1a30 100%)",
  "linear-gradient(135deg, #12213a 0%, #24405f 50%, #12213a 100%)",
];

const ACCENT_COLORS = [
  "#c9a961", // gold
  "#e6c78a", // light gold
  "#c8451f", // terracotta
  "#c9a961",
  "#e07a53", // light terracotta
];

export default function IntroExperience({ onComplete }) {
  const [phase, setPhase] = useState("scrolling");
  const [activeIndex, setActiveIndex] = useState(0);
  const [companyVisible, setCompanyVisible] = useState(false);
  const [companyScale, setCompanyScale] = useState(1);
  const [companyOpacity, setCompanyOpacity] = useState(0);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [questionsFading, setQuestionsFading] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 400, h: 240 });
  const [windowSize, setWindowSize] = useState({ w: 1920, h: 1080 });

  const phaseRef = useRef("scrolling");
  const animFrame = useRef(0);
  const autoScrollTimer = useRef(null);
  const mousePos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const completedRef = useRef(false);
  const companyCardRef = useRef(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Reduced motion: skip whole thing
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      handleComplete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape to skip
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleComplete();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Resize
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ w, h });
      let cardW = Math.min(520, Math.max(280, w * 0.35));
      let cardH = cardW * 0.58;
      if (h < 700) {
        cardW *= 0.85;
        cardH *= 0.85;
      }
      setDimensions({ w: Math.round(cardW), h: Math.round(cardH) });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e) => {
      mousePos.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onLeave = () => {
      mousePos.current.tx = 0;
      mousePos.current.ty = 0;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      mousePos.current.x += (mousePos.current.tx - mousePos.current.x) * 0.06;
      mousePos.current.y += (mousePos.current.ty - mousePos.current.y) * 0.06;
      animFrame.current = requestAnimationFrame(tick);
    };
    animFrame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  // Auto-scroll through questions
  useEffect(() => {
    if (phase !== "scrolling") return;
    let cardIndex = 0;
    const scrollToNext = () => {
      cardIndex++;
      if (cardIndex < QUESTIONS.length) {
        setActiveIndex(cardIndex);
        autoScrollTimer.current = setTimeout(scrollToNext, 2200);
      } else {
        setPhase("pauseEnd");
      }
    };
    autoScrollTimer.current = setTimeout(scrollToNext, 2600);
    return () => clearTimeout(autoScrollTimer.current);
  }, [phase]);

  // Pause then bring company card in
  useEffect(() => {
    if (phase !== "pauseEnd") return;
    const t = setTimeout(() => {
      setQuestionsFading(true);
      setTimeout(() => {
        setCompanyVisible(true);
        setCompanyOpacity(1);
        setPhase("companyIn");
      }, 700);
    }, 900);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "companyIn") return;
    const t = setTimeout(() => setPhase("companyExpand"), 2000);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "companyExpand") return;
    const start = performance.now();
    const duration = 1600;
    const maxScale = windowSize.w < 768 ? 2.4 : 3.0;

    if (companyCardRef.current) {
      companyCardRef.current.style.willChange = "transform";
    }

    let rafId;
    const animate = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / duration);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const currentScale = 1 + eased * (maxScale - 1);

      if (companyCardRef.current) {
        companyCardRef.current.style.transform = `scale(${currentScale}) rotateZ(-1deg) translateZ(0)`;
      }

      if (t < 1) {
        rafId = requestAnimationFrame(animate);
      } else {
        if (companyCardRef.current) {
          companyCardRef.current.style.willChange = "auto";
        }
        setPhase("flash");
      }
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [phase, windowSize, dimensions]);

  // Flash → fade out container → onComplete
  useEffect(() => {
    if (phase !== "flash") return;
    setFlashOpacity(1);

    const t1 = setTimeout(() => {
      // start fading the whole overlay so it dissolves into the homepage
      setContainerOpacity(0);
    }, 600);

    const t2 = setTimeout(() => {
      handleComplete();
    }, 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearTimeout(autoScrollTimer.current);
    cancelAnimationFrame(animFrame.current);
    onComplete();
  };

  if (phase === "landed") return null;

  const getCardTransform = (index) => {
    const diff = index - activeIndex;
    const mx = mousePos.current.x;
    const my = mousePos.current.y;

    if (diff === 0) {
      return {
        transform: `perspective(1200px) translateZ(60px) rotateY(${mx * 8}deg) rotateX(${-my * 6}deg) rotateZ(-2deg) scale(1)`,
        opacity: questionsFading ? 0 : 1,
        zIndex: 50,
        filter: "none",
      };
    }
    if (diff === 1 || (diff < 0 && diff > -QUESTIONS.length + 1)) {
      const actualDiff = diff === 1 ? 1 : QUESTIONS.length + diff;
      return {
        transform: `perspective(1200px) translateY(${70 + actualDiff * 20}px) translateZ(${-80 * actualDiff}px) rotateX(${-15 - actualDiff * 5}deg) rotateZ(-2deg) scale(${1 - actualDiff * 0.08})`,
        opacity: questionsFading ? 0 : 0.4,
        zIndex: 40 - actualDiff * 10,
        filter: `blur(${actualDiff * 1.5}px)`,
      };
    }
    if (diff === -1 || diff === QUESTIONS.length - 1) {
      return {
        transform: `perspective(1200px) translateY(-180px) translateZ(-120px) rotateX(25deg) rotateZ(-2deg) scale(0.85)`,
        opacity: 0,
        zIndex: 10,
        filter: "blur(4px)",
      };
    }
    const absDiff = Math.abs(diff);
    return {
      transform: `perspective(1200px) translateY(${60 + absDiff * 30}px) translateZ(${-60 * absDiff}px) rotateX(-12deg) rotateZ(-2deg) scale(${Math.max(0.7, 1 - absDiff * 0.1)})`,
      opacity: questionsFading ? 0 : Math.max(0, 0.6 - absDiff * 0.2),
      zIndex: 30 - absDiff * 10,
      filter: `blur(${absDiff * 2}px)`,
    };
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden select-none z-[1000]"
      style={{
        background:
          phase === "companyExpand" || phase === "flash" ? "#000000" : "#0a1428",
        color: "#f5f1ea",
        opacity: containerOpacity,
        transition: "background-color 0.8s ease-out, opacity 0.6s ease-out",
      }}
    >
      {/* Skip Button */}
      <button
        onClick={handleComplete}
        aria-label="Skip intro"
        className="absolute top-6 right-6 z-[2000] px-4 py-2 border text-xs tracking-[0.28em] uppercase transition-all"
        style={{
          borderColor: "rgba(245,241,234,0.3)",
          color: "rgba(245,241,234,0.7)",
          background: "rgba(18,33,58,0.5)",
          backdropFilter: "blur(6px)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(245,241,234,0.7)";
          e.currentTarget.style.color = "#f5f1ea";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(245,241,234,0.3)";
          e.currentTarget.style.color = "rgba(245,241,234,0.7)";
        }}
      >
        Skip Intro · ESC
      </button>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,241,234,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,241,234,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Warm ambient glow — gold + terracotta */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px",
          height: "700px",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(201,169,97,0.10) 0%, rgba(200,69,31,0.05) 40%, transparent 70%)",
        }}
      />

      {/* Particles — warm tint */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${1.5 + Math.random() * 2.5}px`,
            height: `${1.5 + Math.random() * 2.5}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            background: `rgba(${200 + Math.random() * 55}, ${170 + Math.random() * 30}, ${120 + Math.random() * 40}, ${0.18 + Math.random() * 0.25})`,
            animation: `particleFloat ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}

      {/* Question card stack */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: `${dimensions.w}px`,
          height: `${dimensions.h + 200}px`,
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {QUESTIONS.map((q, i) => {
          const styles = getCardTransform(i);
          return (
            <div
              key={i}
              className="absolute overflow-hidden"
              style={{
                width: `${dimensions.w}px`,
                height: `${dimensions.h}px`,
                background: CARD_GRADIENTS[i],
                border: `1px solid ${ACCENT_COLORS[i]}33`,
                clipPath: `polygon(
                  14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px),
                  calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px
                )`,
                boxShadow: `
                  0 0 40px ${ACCENT_COLORS[i]}20,
                  0 20px 60px rgba(0,0,0,0.5),
                  inset 0 1px 0 rgba(245,241,234,0.06)
                `,
                transition: "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
                transformStyle: "preserve-3d",
                ...styles,
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${ACCENT_COLORS[i]}, transparent)`,
                  opacity: 0.6,
                }}
              />

              <div className="absolute top-5 right-6 z-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={`${ACCENT_COLORS[i]}80`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <div className="absolute inset-0 flex items-center justify-center px-10 z-10">
                <p
                  className="text-center leading-[1.6]"
                  style={{
                    color: "#f5f1ea",
                    fontSize: `clamp(0.9rem, ${dimensions.w * 0.036}px, 1.2rem)`,
                    letterSpacing: "0.01em",
                    fontWeight: 500,
                  }}
                >
                  "{q}"
                </p>
              </div>

              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {QUESTIONS.map((_, dotI) => (
                  <div
                    key={dotI}
                    className="rounded-full transition-all duration-500"
                    style={{
                      width: dotI === activeIndex ? "20px" : "5px",
                      height: "5px",
                      background:
                        dotI === activeIndex
                          ? ACCENT_COLORS[i]
                          : "rgba(245,241,234,0.15)",
                      boxShadow:
                        dotI === activeIndex
                          ? `0 0 8px ${ACCENT_COLORS[i]}70`
                          : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Company card */}
      {companyVisible && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 100 }}
        >
          <div
            ref={companyCardRef}
            className="overflow-hidden flex flex-col items-center justify-center relative px-8 md:px-12"
            style={{
              width: `${dimensions.w}px`,
              height: `${dimensions.h}px`,
              background:
                phase === "companyExpand" || phase === "flash"
                  ? "#000000"
                  : "linear-gradient(135deg, #0a1428 0%, #0b1524 40%, #1a2c47 70%, #0a1428 100%)",
              border: "1px solid rgba(184, 147, 90, 0.4)",
              opacity: companyOpacity,
              transform: `scale(${companyScale}) rotateZ(-1deg)`,
              clipPath: `polygon(
                14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px),
                calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px
              )`,
              boxShadow: `
                0 0 ${30 + companyScale * 20}px rgba(184, 147, 90, ${Math.min(0.4, 0.15 + companyScale * 0.02)}),
                0 0 ${60 + companyScale * 40}px rgba(196, 69, 28, ${Math.min(0.25, 0.08 + companyScale * 0.015)}),
                0 30px 80px rgba(0,0,0,0.6),
                inset 0 1px 0 rgba(250,247,240,0.1)
              `,
              transition: phase === "companyIn" ? "opacity 1s ease-out" : "none",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #b8935a, #c4451c, transparent)",
              }}
            />

            {/* Radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(184, 147, 90, 0.12) 0%, transparent 60%)",
              }}
            />

            {/* Grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(250,247,240,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,240,0.15) 1px, transparent 1px)",
                backgroundSize: "25px 25px",
              }}
            />

            {/* "Here is the path" text — erased during zoom */}
            {!(phase === "companyExpand" || phase === "flash") && (
              <div
                className="text-[11px] uppercase tracking-[0.35em] font-medium mb-4 z-10"
                style={{
                  color: "rgba(250,247,240,0.45)",
                  animation: "fadeUp 0.8s ease-out both",
                }}
              >
                Here is the path
              </div>
            )}

            {/* Logo — Only element displayed during zoom */}
            <div
              className="flex flex-col items-center z-10 px-4"
              style={{ animation: "fadeUp 0.8s ease-out 0.2s both" }}
            >
              <div className="relative mb-2 flex items-center justify-center">
                <img
                  src="/acdyon-logo.webp"
                  alt="AcdyOn"
                  className="h-16 w-auto md:h-20 object-contain transition-transform duration-500"
                  style={{
                    filter: "drop-shadow(0 0 24px rgba(184, 147, 90, 0.6))",
                    transform:
                      phase === "companyExpand" || phase === "flash"
                        ? "scale(1.35)"
                        : "scale(1)",
                  }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = "flex";
                    }
                  }}
                />
                <div
                  className="hidden h-16 w-16 md:h-20 md:w-20 items-center justify-center bg-ink text-paper rounded-lg text-2xl font-bold"
                >
                  A
                </div>
              </div>

              {/* Company Name — erased during zoom */}
              {!(phase === "companyExpand" || phase === "flash") && (
                <div
                  className="mt-2 font-bold tracking-[0.35em] text-center"
                  style={{
                    color: "#faf7f0",
                    fontSize: "clamp(1.4rem, 4vw, 2rem)",
                    textShadow: "0 0 15px rgba(184, 147, 90, 0.35)",
                    lineHeight: 1.2,
                  }}
                >
                  AcdyOn
                </div>
              )}
            </div>

            {/* Tagline — erased during zoom */}
            {!(phase === "companyExpand" || phase === "flash") && (
              <div
                className="text-[10px] tracking-[0.28em] mt-4 z-10 px-6 text-center"
                style={{
                  color: "rgba(250,247,240,0.45)",
                  animation: "fadeUp 0.8s ease-out 0.4s both",
                  lineHeight: 1.5,
                }}
              >
                EXECUTIVE EDUCATION · ACADEMIC RECOGNITION
              </div>
            )}
          </div>
        </div>
      )}

      {/* Flash — fades to ivory to match homepage */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "#f5f1ea",
          opacity: flashOpacity,
          transition: "opacity 0.35s ease-out",
          zIndex: 9999,
        }}
      />

      <style>{`
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          33% { transform: translateY(-25px) translateX(12px); opacity: 0.5; }
          66% { transform: translateY(-8px) translateX(-8px); opacity: 0.3; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}