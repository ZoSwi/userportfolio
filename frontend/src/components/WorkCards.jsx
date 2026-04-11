import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { projects } from "../data/portfolioData";

function WorkCards() {
  return (
    <section id="work" className="deck-slide mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
      <div className="space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Selected Work
          </p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
            Case studies that show architectural depth and implementation follow-through.
          </h2>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
            >
              <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={1100} scale={1.01} transitionSpeed={1800}>
                <article className="case-card soft-ring group h-full rounded-[30px] p-6 sm:p-8">
                  <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-[#1d4ed8]/8 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-8 top-0 h-20 rounded-b-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)] opacity-40" />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-light)]">
                        {project.eyebrow}
                      </p>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                        Featured
                      </span>
                    </div>
                    <h3 className="mt-4 max-w-[14ch] text-xl font-semibold text-white sm:mt-5 sm:text-2xl">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)] sm:mt-4 sm:text-base">
                      {project.description}
                    </p>
                    <p className="premium-panel mt-5 rounded-2xl p-4 text-sm leading-relaxed text-[var(--text)]">
                      {project.outcome}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.title}-${tag}`}
                          className="rounded-full border border-white/10 bg-[var(--surface-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-white/8 pt-6 space-y-3">
                      {project.bullets.map((bullet) => (
                        <div key={bullet} className="flex gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--accent-light)]" />
                          <p>{bullet}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Tilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkCards;
