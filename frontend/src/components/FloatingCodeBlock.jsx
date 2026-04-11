import React from "react";
import { motion } from "framer-motion";

export const FloatingCodeBlock = ({ position = "top-right" }) => {
  const codeSnippets = [
    `interface Architecture {
  scalable: true,
  reliable: true,
  performant: true
}`,
    `async function integrate() {
  const result = await 
    connect(api, database);
  return optimize(result);
}`,
    `class System {
  build() {
    return new Platform()
      .withAPIs()
      .withIntegration()
      .deploy();
  }
}`,
  ];

  const randomSnippet =
    codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

  const positionClasses = {
    "top-right": "top-20 right-10",
    "top-left": "top-32 left-10",
    "bottom-right": "bottom-32 right-10",
    "bottom-left": "bottom-20 left-10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className={`absolute ${
        positionClasses[position] || positionClasses["top-right"]
      } hidden lg:block`}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          boxShadow: [
            "0 8px 32px rgba(107, 159, 255, 0.1)",
            "0 12px 48px rgba(107, 159, 255, 0.2)",
            "0 8px 32px rgba(107, 159, 255, 0.1)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-lg border border-accent/40 bg-gradient-to-br from-[#0d1a2c] via-[#0a1428] to-[#050812] p-4 backdrop-blur-xl max-w-xs"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-accent/60 ml-2 font-mono">code.ts</span>
        </div>
        <pre className="text-xs leading-relaxed text-accent/80 font-mono overflow-hidden">
          <code>{randomSnippet}</code>
        </pre>
      </motion.div>
    </motion.div>
  );
};

export default FloatingCodeBlock;
