import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaCloud, FaDatabase, FaJava } from "react-icons/fa6";
import {
  SiApachekafka,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiJenkins,
  SiKubernetes,
  SiMulesoft,
  SiNodedotjs,
  SiOpenapiinitiative,
  SiPostgresql,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiTypescript,
} from "react-icons/si";
import { techStack } from "../data/portfolioData";

const surfaceSignals = [
  { label: "Architecture", value: "Stable" },
  { label: "API Health", value: "Active" },
  { label: "Integrations", value: "Connected" },
  { label: "Delivery", value: "On Track" },
];

const techIconsByName = {
  Java: FaJava,
  "Spring Boot": SiSpringboot,
  MuleSoft: SiMulesoft,
  "REST APIs": SiOpenapiinitiative,
  OpenAPI: SiOpenapiinitiative,
  React: SiReact,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Microservices: SiNodedotjs,
  Jenkins: SiJenkins,
  "GitHub Actions": SiGithubactions,
  AWS: FaCloud,
  Azure: FaCloud,
  Kafka: SiApachekafka,
  Redis: SiRedis,
  Git: SiGit,
  PostgreSQL: SiPostgresql,
  Databases: FaDatabase,
  Oracle: FaDatabase,
  MongoDB: FaDatabase,
  MySQL: FaDatabase,
  GraphQL: SiOpenapiinitiative,
  RabbitMQ: SiApachekafka,
  Terraform: FaCloud,
  Prometheus: FaCloud,
  Grafana: FaCloud,
  "ELK Stack": FaDatabase,
  Splunk: FaDatabase,
  JUnit: FaJava,
  Mockito: FaJava,
  Linux: FaCloud,
  SOAP: SiOpenapiinitiative,
  SQL: FaDatabase,
};

export const AnimatedTechStack = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="deck-slide relative overflow-hidden py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[var(--accent)]/8 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08]">
          <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
            <path d="M0 220C210 150 340 330 520 270C700 210 860 120 1020 200C1180 280 1310 240 1440 190" fill="none" stroke="url(#surfaceLine)" strokeWidth="1.4" />
            <path d="M0 600C210 660 420 530 620 580C840 640 970 760 1160 720C1300 690 1390 620 1440 590" fill="none" stroke="url(#surfaceLine)" strokeWidth="1.2" />
            <defs>
              <linearGradient id="surfaceLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
            Technical Stack
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-5xl">
            Enterprise technologies aligned to reliable delivery.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">
            Core platforms, integration tooling, cloud, DevOps, and observability capabilities used across production systems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="premium-panel soft-ring mb-8 grid gap-3 rounded-[1.5rem] p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {surfaceSignals.map((signal, idx) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">{signal.label}</p>
              <p className="mt-1 text-sm font-semibold text-[var(--accent-light)]">{signal.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div style={{ y }} className="relative mt-2 overflow-hidden py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[var(--accent-light)]/50 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.2),_transparent_65%)] blur-xl" />

          <motion.div
            className="flex w-max items-center gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack, ...techStack].map((tech, idx) => {
              const TechIcon = techIconsByName[tech.name];
              return (
                <motion.div
                  key={`${tech.name}-${idx}`}
                  animate={{
                    scale: [1, 1, 1.17, 1, 1],
                    y: [0, 0, -5, 0, 0],
                    borderColor: [
                      "rgba(255,255,255,0.1)",
                      "rgba(255,255,255,0.1)",
                      "rgba(52,211,153,0.4)",
                      "rgba(255,255,255,0.1)",
                      "rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (idx % techStack.length) * 0.22,
                  }}
                  whileHover={{ y: -4, scale: 1.06 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[var(--surface)]/88 px-4 py-3 shadow-[0_14px_34px_rgba(0,0,0,0.22)]"
                >
                  <span className="text-[2rem] leading-none">
                    {TechIcon ? <TechIcon style={{ color: tech.color }} /> : tech.symbol}
                  </span>
                  <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.12em] text-[#d7e4f1]">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
