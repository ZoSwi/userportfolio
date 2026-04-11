import { motion } from "framer-motion";

const codeSnippets = [
  "const api = new RestAPI()",
  "async function integrate()",
  "class Architecture {}",
  "interface Platform extends Core",
  "database.connect()",
  "service.deploy()",
  "while(optimizing) {}",
  "fn build_system()",
];

export function TechBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main Grid Background */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-[0.02]" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
            </pattern>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7EA2FF" />
              <stop offset="100%" stopColor="#5B7FFF" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0">
        {codeSnippets.map((snippet, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute text-xs font-mono text-accent/5 whitespace-nowrap"
            style={{
              left: `${(index * 12.5) % 100}%`,
              top: `${(index * 15) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {snippet}
          </motion.div>
        ))}
      </div>

      {/* Animated Gradient Overlays */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full bg-gradient-to-tl from-blue-600/5 to-transparent blur-[100px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Tech Nodes Network */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7EA2FF" />
            <stop offset="100%" stopColor="#5B7FFF" />
          </linearGradient>
        </defs>
        {/* Network connections */}
        <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="url(#nodeGradient)" strokeWidth="0.5" opacity="0.5" />
        <line x1="40%" y1="50%" x2="80%" y2="30%" stroke="url(#nodeGradient)" strokeWidth="0.5" opacity="0.5" />
        <line x1="80%" y1="30%" x2="60%" y2="80%" stroke="url(#nodeGradient)" strokeWidth="0.5" opacity="0.5" />
        <line x1="60%" y1="80%" x2="20%" y2="70%" stroke="url(#nodeGradient)" strokeWidth="0.5" opacity="0.5" />
        <line x1="20%" y1="70%" x2="10%" y2="20%" stroke="url(#nodeGradient)" strokeWidth="0.5" opacity="0.5" />

        {/* Nodes */}
        <circle cx="10%" cy="20%" r="6" fill="url(#nodeGradient)" opacity="0.4" />
        <circle cx="40%" cy="50%" r="6" fill="url(#nodeGradient)" opacity="0.4" />
        <circle cx="80%" cy="30%" r="6" fill="url(#nodeGradient)" opacity="0.4" />
        <circle cx="60%" cy="80%" r="6" fill="url(#nodeGradient)" opacity="0.4" />
        <circle cx="20%" cy="70%" r="6" fill="url(#nodeGradient)" opacity="0.4" />
      </svg>
    </div>
  );
}

export default TechBackground;
