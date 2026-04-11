import { highlights } from "../data/portfolioData";
import Reveal from "./Reveal";

function HighlightStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-20">
      <Reveal>
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/8 bg-white/8 lg:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="bg-[var(--surface)] px-8 py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {item.label}
              </p>
              <p className="mt-4 max-w-sm text-lg font-medium leading-relaxed text-[var(--text)]">
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
