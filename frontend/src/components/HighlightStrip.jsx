import { highlights } from "../data/portfolioData";
import Reveal from "./Reveal";

function HighlightStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:px-10 sm:py-14 lg:px-20">
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/8 bg-white/8 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="bg-[var(--surface)] px-5 py-6 sm:px-8 sm:py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {item.label}
              </p>
              <p className="mt-3 max-w-sm text-base font-medium leading-relaxed text-[var(--text)] sm:mt-4 sm:text-lg">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default HighlightStrip;
