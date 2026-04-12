import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { principles } from "../data/portfolioData";
import Reveal from "./Reveal";

function PrinciplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % principles.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + principles.length) % principles.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % principles.length);
  };

  const active = principles[activeIndex];

  return (
    <section
      id="approach"
      className="deck-slide how-i-think-shell section-shell mx-auto max-w-7xl px-6 sm:px-10 lg:px-20"
    >
      <div className="how-i-think-bg pointer-events-none absolute inset-0">
        <div className="how-i-think-grid absolute inset-0" />
        <div className="how-i-think-orb absolute -left-20 top-10 h-64 w-64 rounded-full" />
        <div className="how-i-think-orb how-i-think-orb-right absolute -right-16 bottom-8 h-56 w-56 rounded-full" />
      </div>

      <div className="relative z-10 space-y-14">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              How I Think
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Principles that keep technical decisions grounded and maintainable.
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--text-secondary)]">
              A practical framework for delivery quality, architectural clarity, and long-term operational reliability.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="how-i-think-carousel mx-auto max-w-3xl">
            <div className="pointer-events-none absolute -left-12 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="how-i-think-float-shape how-i-think-cube" />
            </div>
            <div className="pointer-events-none absolute -right-10 top-[42%] hidden -translate-y-1/2 lg:block">
              <div className="how-i-think-float-shape how-i-think-pyramid" />
            </div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-light)]/80">
                Principle {String(activeIndex + 1).padStart(2, "0")} / {String(principles.length).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="how-i-think-arrow"
                  aria-label="Previous principle"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="how-i-think-arrow"
                  aria-label="Next principle"
                >
                  &#8594;
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={active.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.34 }}
                className="how-i-think-card ui-hover-lift group relative rounded-[22px] p-5 sm:p-7"
              >
                <div className="pointer-events-none absolute right-5 top-5">
                  <span className="how-i-think-glyph">o</span>
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="how-i-think-index">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-light)]/85">
                    Principle
                  </p>
                </div>
                <p className="text-xl font-semibold text-white">{active.title}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{active.body}</p>
                <div className="mt-5 h-px w-full bg-gradient-to-r from-[var(--accent)]/45 via-[var(--accent-light)]/25 to-transparent" />
              </motion.article>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default PrinciplesSection;
