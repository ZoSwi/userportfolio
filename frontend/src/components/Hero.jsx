import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaBrain, FaMicrochip, FaRobot } from "react-icons/fa";
import { FaJava } from "react-icons/fa6";
import {
  SiDocker,
  SiKubernetes,
  SiMulesoft,
  SiReact,
  SiSpringboot,
} from "react-icons/si";
import profilePhoto from "../assets/profile-photo.png";
import { heroStats, profile } from "../data/portfolioData";
import FounderHighlight from "./FounderHighlight";
import { LiveMemoji } from "./LiveMemoji";

const liveLogs = [
  "API gateway healthy",
  "MuleSoft sync running",
  "Order stream stable",
  "Latency p95: 42ms",
  "K8s rollout successful",
];

const orbitIcons = [
  { name: "Java", Icon: FaJava, color: "#f97316", x: "-14%", y: "20%" },
  { name: "Spring", Icon: SiSpringboot, color: "#22c55e", x: "84%", y: "16%" },
  { name: "React", Icon: SiReact, color: "#38bdf8", x: "78%", y: "78%" },
  { name: "Docker", Icon: SiDocker, color: "#3b82f6", x: "14%", y: "84%" },
  { name: "K8s", Icon: SiKubernetes, color: "#8b5cf6", x: "52%", y: "-6%" },
  { name: "MuleSoft", Icon: SiMulesoft, color: "#06b6d4", x: "4%", y: "58%" },
];

const aiIcons = [
  { name: "AI Core", Icon: FaMicrochip, color: "#57a6ff", x: "6%", y: "16%" },
  { name: "Neural", Icon: FaBrain, color: "#2dd4bf", x: "90%", y: "34%" },
  { name: "Assistant", Icon: FaRobot, color: "#a78bfa", x: "20%", y: "82%" },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.9, 0]);

  const goTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      ref={ref}
      className="relative mx-auto flex min-h-screen max-w-7xl items-center overflow-x-clip px-4 pb-14 pt-24 sm:px-10 sm:pb-20 lg:px-20"
    >
      <motion.div style={{ y }} className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-12 right-[12%] h-96 w-96 rounded-full bg-[#1d4ed8]/10 blur-3xl" />
        <div className="grid-overlay absolute inset-0 opacity-50" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 grid w-full items-start gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(260px,0.7fr)] md:items-center lg:gap-14"
      >
        <div className="relative z-20 min-w-0 space-y-6 pr-1 sm:space-y-7 lg:pr-8">
          <div className="relative mx-auto block w-full max-w-[300px] pb-2 md:hidden">
            <div className="relative overflow-hidden rounded-[1.85rem] border border-white/14 bg-[#081323]/78 p-2.5 shadow-[0_22px_44px_rgba(0,0,0,0.34)]">
              <img
                src={profilePhoto}
                alt="Portrait of Samhith Cheruku"
                className="block h-[18rem] w-full rounded-[1.5rem] object-cover object-top"
              />
            </div>
          </div>

          <div className="space-y-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12 }}
              className="text-sm font-medium uppercase tracking-[0.26em] text-[var(--muted)]"
            >
              {profile.name}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18 }}
              className="max-w-4xl text-[clamp(1.85rem,4.9vw,3.2rem)] font-semibold leading-[1.03] tracking-[-0.032em] text-white xl:text-6xl 2xl:text-7xl"
            >
              <span className="block w-fit max-w-full overflow-visible">
                <span className="inline-flex max-w-full whitespace-normal bg-gradient-to-r from-white via-[var(--text)] to-[var(--accent-light)] bg-clip-text text-transparent md:hidden">
                  Application Architect &amp; Engineer
                </span>
                <span className="hidden overflow-visible whitespace-nowrap bg-gradient-to-r from-white via-[var(--text)] to-[var(--accent-light)] bg-clip-text pr-[0.3em] text-transparent md:inline-block">
                  Application{"\u00A0"}Architect
                </span>
              </span>
              <span className="mt-2 block">
                <span className="inline-block max-w-full whitespace-normal bg-gradient-to-r from-white via-[var(--accent-light)] to-[var(--accent)] bg-clip-text text-transparent">
                  Founder of ZoSwi
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26 }}
              className="max-w-2xl text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl"
            >
              {profile.headline}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.34 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4"
          >
            {heroStats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3, scale: 1.015 }}
                transition={{ duration: 0.24 }}
                className="hero-stat group relative rounded-2xl p-3.5 sm:p-4"
              >
                <div className="pointer-events-none absolute right-3 top-3 h-2 w-10 rounded-full bg-gradient-to-r from-[var(--accent-light)]/0 via-[var(--accent-light)]/45 to-[var(--accent)]/0 opacity-0 blur-[1px] transition-opacity duration-300 group-hover:opacity-100" />
                <p className="text-2xl font-semibold tracking-[-0.03em] text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
            className="premium-panel soft-ring max-w-2xl rounded-2xl px-5 py-4"
          >
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              {profile.summary}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.46 }}
            className="relative hidden overflow-hidden rounded-2xl border border-white/10 bg-[#071220]/70 p-3 sm:block"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Live Runtime
              </p>
              <motion.span
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-light)]"
              >
                active
              </motion.span>
            </div>
            <motion.div
              className="flex w-max items-center gap-2"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              {[...liveLogs, ...liveLogs].map((item, i) => (
                <div
                  key={`${item}-${i}`}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-[#c8d7e7]"
                >
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              type="button"
              onClick={() => goTo(profile.primaryCta.target)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="premium-button rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--glow)]/30 transition-colors duration-300 hover:bg-[var(--accent-dark)]"
            >
              {profile.primaryCta.label}
            </motion.button>

            <motion.a
              href={profile.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="premium-button btn-light rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300"
            >
              {profile.secondaryCta.label}
            </motion.a>

            <motion.button
              type="button"
              onClick={() => goTo(profile.tertiaryCta.target)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="premium-button btn-dark rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300"
            >
              {profile.tertiaryCta.label}
            </motion.button>
          </motion.div>

          <div className="space-y-6 md:hidden">
            <FounderHighlight />
          </div>

        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.22 }}
          className="relative z-10 mx-auto hidden w-full max-w-[320px] pt-3 sm:max-w-[400px] md:block md:justify-self-end lg:max-w-[460px] lg:pt-10 xl:max-w-[530px]"
        >
          <div className="photo-orbit h-[24rem] w-[24rem] opacity-60 sm:h-[30rem] sm:w-[30rem]" />
          <div className="photo-orbit h-[18rem] w-[18rem] opacity-40 sm:h-[22rem] sm:w-[22rem]" />
          <div className="floating-chip left-2 top-16 hidden sm:block">API-first</div>
          <div className="floating-chip bottom-20 right-0 hidden sm:block">Observability</div>
          <div className="floating-chip right-8 top-3 hidden sm:block">System design</div>

          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-0 z-10 hidden sm:block"
          >
            {orbitIcons.map(({ name, Icon, color, x, y }) => (
              <motion.div
                key={name}
                style={{ left: x, top: y }}
                animate={{ y: [0, -4, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute flex items-center justify-center"
              >
                <Icon
                  style={{ color, filter: "drop-shadow(0 0 14px rgba(87,166,255,0.32))" }}
                  className="text-[1.55rem] sm:text-[1.7rem]"
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-30">
            <LiveMemoji />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
            className="relative z-30 mt-9 sm:mt-12"
          >
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              {aiIcons.map(({ name, Icon, color, x, y }, index) => (
                <motion.div
                  key={name}
                  style={{ left: x, top: y }}
                  animate={{ y: [0, -6, 0], scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.35,
                  }}
                  className="absolute"
                >
                  <Icon
                    style={{ color, filter: "drop-shadow(0 0 14px rgba(87,166,255,0.25))" }}
                    className="text-[1.2rem] sm:text-[1.35rem]"
                  />
                </motion.div>
              ))}
            </div>
            <FounderHighlight />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
