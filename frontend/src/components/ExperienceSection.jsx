import { motion } from "framer-motion";
import { capabilities, experience } from "../data/portfolioData";
import Reveal from "./Reveal";

function ExperienceSection() {
  return (
    <section id="experience" className="deck-slide section-shell mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Experience
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Architecture thinking backed by delivery experience across backend and integration work.
            </h2>

            <div className="grid gap-4 pt-2 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="premium-panel soft-ring ui-card ui-hover-lift rounded-2xl p-5"
                >
                  <p className="text-sm font-semibold text-white">{capability.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {capability.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="space-y-6">
          {experience.map((item, index) => (
            <Reveal key={`${item.role}-${item.company}`} delay={index * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="premium-panel soft-ring ui-card ui-hover-lift relative rounded-[28px] p-6 sm:p-8"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[var(--accent)] via-[var(--accent-light)] to-transparent" />
                <div className="space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-white sm:text-xl">{item.role}</p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.company}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-base leading-relaxed text-[var(--text-secondary)]">
                    {item.summary}
                  </p>

                  <div className="space-y-3">
                    {item.points.map((point) => (
                      <div key={point} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-light)]" />
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
