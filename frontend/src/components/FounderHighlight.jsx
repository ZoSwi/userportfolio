import { motion } from "framer-motion";

function FounderHighlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="premium-panel soft-ring group relative w-full max-w-none rounded-3xl p-4 sm:max-w-2xl sm:p-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--accent)]/8 via-white/[0.03] to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[var(--accent-light)]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />

      <div className="relative z-10 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--accent-light)]">
            Venture Highlight
          </span>
          <span className="text-sm font-medium text-white/90 sm:text-base">
            Founder &amp; Developer - ZoSwi AI
          </span>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
          AI-powered career command centre for resume intelligence, live interviews, and job matching
        </p>

        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] sm:text-[11px] sm:tracking-[0.22em]">
          Privacy-first - AI-driven - Real-time insights
        </p>
      </div>
    </motion.div>
  );
}

export default FounderHighlight;
