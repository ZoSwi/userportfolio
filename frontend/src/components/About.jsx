import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaDatabase, FaJava } from "react-icons/fa6";
import {
  SiDocker,
  SiKubernetes,
  SiMulesoft,
  SiOpenapiinitiative,
  SiPostgresql,
  SiReact,
  SiSpringboot,
} from "react-icons/si";
import profilePhoto from "../assets/profile-photo.png";
import { profile, proofPoints } from "../data/portfolioData";
import Reveal from "./Reveal";

function About() {
  const [proofIndex, setProofIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProofIndex((prev) => (prev + 1) % proofPoints.length);
    }, 6000); // 3 cards x 6s = 18s full escalator cycle

    return () => window.clearInterval(timer);
  }, []);

  const techSignals = [
    "Spring Boot",
    "MuleSoft",
    "Microservices",
    "API Gateway",
    "AWS",
    "Kubernetes",
    "Oracle",
    "PostgreSQL",
  ];

  const runtimeLogs = [
    "[AUTH] Token validation pipeline healthy (p95 42ms)",
    "[API] /integration/partner-sync completed with 0 retries",
    "[EVENT] Order lifecycle consumer lag within threshold",
    "[SECURITY] Policy checks passed for external connectors",
    "[OBS] Trace correlation active across 12 services",
  ];
  const tech3dIcons = [
    { name: "Java", Icon: FaJava, color: "#f97316" },
    { name: "Spring", Icon: SiSpringboot, color: "#22c55e" },
    { name: "MuleSoft", Icon: SiMulesoft, color: "#06b6d4" },
    { name: "REST API", Icon: SiOpenapiinitiative, color: "#0ea5e9" },
    { name: "React", Icon: SiReact, color: "#38bdf8" },
    { name: "Docker", Icon: SiDocker, color: "#3b82f6" },
    { name: "K8s", Icon: SiKubernetes, color: "#8b5cf6" },
    { name: "PostgreSQL", Icon: SiPostgresql, color: "#60a5fa" },
    { name: "Oracle", Icon: FaDatabase, color: "#fb7185" },
  ];
  const proofBackgroundIcons = [
    { Icon: SiSpringboot, color: "#22c55e", className: "left-6 top-16" },
    { Icon: SiOpenapiinitiative, color: "#0ea5e9", className: "left-1/3 top-10" },
    { Icon: SiDocker, color: "#3b82f6", className: "right-20 top-14" },
    { Icon: SiKubernetes, color: "#8b5cf6", className: "left-12 bottom-10" },
    { Icon: SiReact, color: "#38bdf8", className: "right-10 bottom-12" },
    { Icon: FaJava, color: "#f97316", className: "right-1/3 bottom-8" },
  ];

  return (
    <section id="about" className="deck-slide section-shell mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="about-grid-lines absolute inset-0 opacity-60" />
        <div className="about-diagonal-lines absolute inset-0 opacity-45" />
        <div className="about-3d-glow absolute -left-24 top-10 h-72 w-72 rounded-full" />
        <div className="about-3d-glow about-3d-glow-right absolute -right-20 bottom-6 h-64 w-64 rounded-full" />
      </div>

      <div className="grid gap-16 lg:grid-cols-[0.92fr_1.08fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              About
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Building modern enterprise platforms with architecture depth and execution discipline.
            </h2>

            <div className="premium-panel soft-ring ui-card ui-hover-lift relative mt-8 rounded-[1.75rem] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                Engineering Lens
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                I approach delivery through stable contracts, observable integrations, and architecture choices that hold under production pressure.
              </p>
            </div>

            <div className="ui-card ui-hover-lift relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0a1626]/80 p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Technical Runtime
                </p>
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                  className="text-xs uppercase tracking-[0.2em] text-[var(--accent-light)]"
                >
                  active
                </motion.p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {techSignals.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative hidden [perspective:1600px] sm:block"
            >
              <div className="absolute inset-3 rounded-[1.25rem] bg-[radial-gradient(circle,_rgba(96,165,250,0.18),_transparent_70%)] blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#071220]/90 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:[transform:rotateX(6deg)_rotateY(-4deg)]">
                <div className="mb-3 flex items-center justify-between border-b border-white/8 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    Live System Console
                  </p>
                </div>
                <div className="space-y-2 font-mono text-xs leading-6 text-[#b9c9d9]">
                  {runtimeLogs.map((log, index) => (
                    <motion.p
                      key={log}
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="truncate"
                    >
                      <span className="mr-2 text-[#6f8aa7]">{String(index + 1).padStart(2, "0")}</span>
                      {log}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="premium-panel soft-ring ui-card ui-hover-lift about-feature-panel relative space-y-8 rounded-[2rem] p-9 md:p-12 lg:mt-8">
            <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.22),_transparent_65%)] blur-2xl" />
            <div className="about-identity flex items-center gap-4 border-b border-white/10 pb-5">
              <div className="about-avatar-wrap soft-ring">
                <img
                  src={profilePhoto}
                  alt={profile.name}
                  className="about-avatar h-14 w-14 rounded-full object-cover scale-[1.1] object-top"
                />
              </div>
              <div>
                <p className="about-name text-lg font-semibold text-white">{profile.name}</p>
                <p className="about-role text-xs uppercase tracking-[0.16em] text-[var(--accent-light)]">
                  {profile.role}
                </p>
              </div>
            </div>

            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              I am an Application Architect and developer with experience in Java Full Stack development, specializing in microservices, API architecture, and enterprise integrations. I work deeply with Spring Boot, MuleSoft, REST and SOAP services, and large-scale system modernization.
            </p>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              Across banking and healthcare domains, I have delivered secure, scalable, and high-performance applications using AWS, Azure, Docker, Kubernetes, Jenkins, Oracle, and PostgreSQL. I focus on designing reliable systems, optimizing performance, and solving real business problems through technology. I am also the Founder and Developer of ZoSwi AI, an AI-powered career platform for resume intelligence, job matching, and live AI interview experiences.
            </p>

            <div className="pt-2">
              <div className="proof-card-3d relative overflow-hidden rounded-2xl p-5 md:min-h-[15.5rem]">
                <div className="proof-card-lines pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute inset-0">
                  {proofBackgroundIcons.map((item, idx) => (
                    <motion.span
                      key={`proof-bg-${idx}`}
                      className={`proof-bg-icon absolute ${item.className}`}
                      animate={{ y: [0, -6, 0], opacity: [0.2, 0.42, 0.2] }}
                      transition={{ duration: 4 + idx * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <item.Icon style={{ color: item.color }} />
                    </motion.span>
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="mb-4 border-b border-white/10 pb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                      Operational Proof
                    </p>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={proofPoints[proofIndex].title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className="min-h-[10.5rem]"
                    >
                      <p className="text-base font-semibold text-white">
                        {proofPoints[proofIndex].title}
                      </p>
                      <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-[var(--text-secondary)]">
                        {proofPoints[proofIndex].body}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 px-1">
                {proofPoints.map((point, index) => (
                  <button
                    key={point.title}
                    type="button"
                    onClick={() => setProofIndex(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === proofIndex
                        ? "w-7 bg-[var(--accent-light)]"
                        : "w-3 bg-white/25 hover:bg-white/40"
                    }`}
                    aria-label={`Show ${point.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal delay={0.15}>
        <div className="relative mt-14 hidden overflow-hidden py-4 sm:block">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />

          <motion.div
            className="flex w-max items-center gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ x: { duration: 24, repeat: Infinity, ease: "linear" } }}
          >
            {[...tech3dIcons, ...tech3dIcons].map((tech, idx) => (
              <motion.div
                key={`belt-${tech.name}-${idx}`}
                animate={{
                  scale: [1, 1.06, 1],
                  y: [0, -3, 0],
                  borderColor: ["rgba(255,255,255,0.1)", "rgba(52,211,153,0.34)", "rgba(255,255,255,0.1)"],
                }}
                transition={{
                  duration: 2.1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (idx % tech3dIcons.length) * 0.28,
                }}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#071220]/78 px-4 py-3 backdrop-blur-md shadow-[0_14px_30px_rgba(0,0,0,0.24)]"
                title={tech.name}
              >
                <tech.Icon style={{ color: tech.color }} className="text-3xl" />
                <span className="text-sm font-semibold text-[#d9e5f2] whitespace-nowrap">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}

export default About;
