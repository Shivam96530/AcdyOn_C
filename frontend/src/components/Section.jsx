export default function Section({ id, eyebrow, title, sub, tone = "paper", children }) {
  const bg = tone === "ink" ? "bg-ink text-paper" : tone === "paper2" ? "bg-paper2 text-ink" : "bg-paper text-ink";
  return (
    <section id={id} className={`px-3 md:px-4 py-16 md:py-24 ${bg}`}>
      <div className="max-w-[1280px] mx-auto">
        {(eyebrow || title || sub) && (
          <div className="mb-10 md:mb-14">
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.28em] opacity-60 mb-3">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight max-w-3xl">
                {title}
              </h2>
            )}
            {sub && <p className="mt-5 text-sm md:text-base opacity-70 max-w-2xl">{sub}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
