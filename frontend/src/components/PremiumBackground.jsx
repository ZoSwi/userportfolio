import { motion } from "framer-motion";

function PremiumBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(31,204,156,0.16),_transparent_28%),linear-gradient(180deg,_rgba(8,17,29,0.94)_0%,_rgba(6,14,24,0.98)_100%)]" />
      <div className="absolute inset-0 bg-[conic-gradient(from_210deg_at_50%_50%,rgba(52,211,153,0.06),transparent_18%,rgba(96,165,250,0.05)_38%,transparent_58%,rgba(139,92,246,0.05)_76%,transparent)] opacity-70" />

      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-12 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(52,211,153,0.18),_transparent_62%)] blur-[90px]"
      />

      <motion.div
        animate={{ x: [0, -35, 0], y: [0, 28, 0], scale: [1.08, 1, 1.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute right-[-8rem] top-[18%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(29,78,216,0.14),_transparent_64%)] blur-[100px]"
      />

      <div className="absolute inset-0 opacity-60 [perspective:1800px]">
        <motion.div
          animate={{ rotateX: [68, 72, 68], rotateZ: [-16, -12, -16], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-12%] top-[52%] h-[42rem] w-[72rem] rounded-[3rem] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.01))] shadow-[0_40px_120px_rgba(0,0,0,0.24)]"
        />

        <motion.div
          animate={{ rotateX: [72, 66, 72], rotateZ: [12, 16, 12], y: [0, 10, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute right-[-14%] top-[20%] h-[28rem] w-[56rem] rounded-[3rem] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.008))]"
        />
        <motion.div
          animate={{ rotateX: [74, 70, 74], rotateZ: [-6, -2, -6], y: [0, -8, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="absolute left-[16%] top-[10%] h-[18rem] w-[26rem] rounded-[2.5rem] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.018),rgba(255,255,255,0.004))]"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.18]">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1440 1200">
          <defs>
            <linearGradient id="premiumLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.65" />
            </linearGradient>
          </defs>
          <path d="M140 220C260 310 330 390 470 420C620 455 770 310 920 340C1040 364 1150 450 1300 520" fill="none" stroke="url(#premiumLine)" strokeWidth="1.2" />
          <path d="M100 760C260 700 430 650 560 690C710 736 810 850 980 844C1110 840 1215 760 1340 640" fill="none" stroke="url(#premiumLine)" strokeWidth="1" />
          <path d="M420 120C480 210 520 320 640 360C744 396 860 356 940 262" fill="none" stroke="url(#premiumLine)" strokeWidth="0.9" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(7,17,27,0.12)_50%,rgba(7,17,27,0.88)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(4,10,18,0.44)_100%)]" />
    </div>
  );
}

export default PremiumBackground;
