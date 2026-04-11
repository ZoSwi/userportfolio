import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import profilePhoto from "../assets/profile-photo.png";

const INTRO_VERSION_KEY = "portfolio_intro_v3_seen";

export const IntroScreen = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem(INTRO_VERSION_KEY);
    if (visited) {
      setHasVisited(true);
      setShowIntro(false);
      onComplete();
      return;
    }

    const hideTimer = setTimeout(() => {
      sessionStorage.setItem(INTRO_VERSION_KEY, "true");
      setShowIntro(false);
      setTimeout(onComplete, 700);
    }, 2600);

    return () => window.clearTimeout(hideTimer);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem(INTRO_VERSION_KEY, "true");
    setShowIntro(false);
    onComplete();
  };

  if (hasVisited) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050d16]"
          onClick={handleSkip}
        >
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.34, 0.22] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.22),_transparent_68%)] blur-[120px]"
          />

          <div className="absolute inset-0 opacity-40">
            <div className="grid-overlay h-full w-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 grid items-center gap-8 px-6 lg:grid-cols-[1fr_0.9fr] lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start">
              <motion.div
                initial={{ scale: 0.88, rotateX: 10 }}
                animate={{ scale: 1, rotateX: 0, y: [0, -6, 0] }}
                transition={{
                  scale: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  rotateX: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative [perspective:1400px]"
              >
                <div className="absolute inset-8 rounded-[2rem] bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_70%)] blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.04] p-3 shadow-[0_44px_110px_rgba(0,0,0,0.36)] backdrop-blur-xl">
                  <div className="absolute inset-x-10 top-0 h-16 rounded-b-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.22),transparent)] opacity-70" />
                  <div className="relative overflow-hidden rounded-[1.55rem]">
                    <img
                      src={profilePhoto}
                      alt="Portrait of Samhith Cheruku"
                      className="block h-[24rem] w-[17rem] object-cover object-top md:h-[26rem] md:w-[18rem]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_18%,transparent_72%,rgba(7,17,27,0.22))]" />
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10 ring-inset" />
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="mt-8 text-center text-xs font-semibold uppercase tracking-[0.32em] text-[var(--muted)] lg:text-left"
              >
                Samhith Cheruku
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.45 }}
                className="mt-4 max-w-2xl text-center text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl lg:text-left"
              >
                Application Architect and Software Engineer
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="mt-6 text-xs text-[var(--muted)]"
              >
                Click anywhere to skip
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 24, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0, y: [0, -4, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.4 },
                x: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                rotateY: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                y: { duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 1 },
              }}
              className="relative hidden [perspective:1600px] lg:block"
            >
              <div className="absolute inset-8 rounded-[2rem] bg-[radial-gradient(circle,_rgba(96,165,250,0.16),_transparent_70%)] blur-3xl" />
              <div className="relative w-[29rem] overflow-hidden rounded-[2rem] border border-white/10 bg-[#09111c]/88 p-4 shadow-[0_38px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                    <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                    <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    system-architecture.ts
                  </span>
                </div>

                <div className="mt-4 space-y-3 font-mono text-[13px] leading-7 text-[#b9c8d8]">
                  <div>
                    <span className="text-[#5f748d]">1</span>
                    <span className="ml-4 text-[#8b9bb0]">const</span>
                    <span className="ml-2 text-[#dbe8f5]">engineer</span>
                    <span className="ml-2 text-[#8b9bb0]">=</span>
                    <span className="ml-2 text-[#9adbc4]">{"{"}</span>
                  </div>
                  <div>
                    <span className="text-[#5f748d]">2</span>
                    <span className="ml-4 text-[#7fb8ff]">role</span>
                    <span className="text-[#8b9bb0]">:</span>
                    <span className="ml-2 text-[#f4d58d]">"Application Architect"</span>
                    <span className="text-[#8b9bb0]">,</span>
                  </div>
                  <div>
                    <span className="text-[#5f748d]">3</span>
                    <span className="ml-4 text-[#7fb8ff]">focus</span>
                    <span className="text-[#8b9bb0]">:</span>
                    <span className="ml-2 text-[#9adbc4]">[</span>
                    <span className="text-[#f4d58d]">"APIs"</span>
                    <span className="text-[#8b9bb0]">,</span>
                    <span className="ml-2 text-[#f4d58d]">"Platforms"</span>
                    <span className="text-[#8b9bb0]">,</span>
                    <span className="ml-2 text-[#f4d58d]">"Reliability"</span>
                    <span className="text-[#9adbc4]">]</span>
                    <span className="text-[#8b9bb0]">,</span>
                  </div>
                  <div>
                    <span className="text-[#5f748d]">4</span>
                    <span className="ml-4 text-[#7fb8ff]">building</span>
                    <span className="text-[#8b9bb0]">:</span>
                    <span className="ml-2 text-[#f4d58d]">"ZoSwi AI"</span>
                    <span className="text-[#8b9bb0]">,</span>
                  </div>
                  <div>
                    <span className="text-[#5f748d]">5</span>
                    <span className="ml-4 text-[#7fb8ff]">status</span>
                    <span className="text-[#8b9bb0]">:</span>
                    <span className="ml-2 text-[#f4d58d]">"shipping"</span>
                  </div>
                  <div>
                    <span className="text-[#5f748d]">6</span>
                    <span className="ml-4 text-[#9adbc4]">{"}"}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    classic engineering
                  </span>
                  <span className="text-xs uppercase tracking-[0.18em] text-[var(--accent-light)]">
                    refined finish
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
