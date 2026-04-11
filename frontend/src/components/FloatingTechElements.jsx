import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CodeIcon, ApiIcon, DatabaseIcon, ServerIcon, CloudIcon, ArchitectureIcon, IntegrationIcon, TerminalIcon } from "../assets/tech-icons";

/**
 * Professional Floating Tech Stack Elements
 * - Modern SVG tech icons with subtle animations
 * - Parallax mouse tracking for depth
 * - Sophisticated glow effects
 */
const FloatingTechElements = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const techElements = [
    {
      id: 1,
      Icon: ApiIcon,
      label: "REST APIs",
      position: { x: -15, y: -12 },
      depth: 0.8,
      size: 56,
    },
    {
      id: 2,
      Icon: DatabaseIcon,
      label: "PostgreSQL",
      position: { x: 18, y: -8 },
      depth: 1.2,
      size: 60,
    },
    {
      id: 3,
      Icon: ServerIcon,
      label: "Spring Boot",
      position: { x: -20, y: 15 },
      depth: 1.0,
      size: 52,
    },
    {
      id: 4,
      Icon: CodeIcon,
      label: "Microservices",
      position: { x: 22, y: 18 },
      depth: 0.9,
      size: 54,
    },
    {
      id: 5,
      Icon: CloudIcon,
      label: "Cloud Native",
      position: { x: -12, y: -25 },
      depth: 1.1,
      size: 58,
    },
    {
      id: 6,
      Icon: ArchitectureIcon,
      label: "System Design",
      position: { x: 16, y: 8 },
      depth: 0.7,
      size: 50,
    },
    {
      id: 7,
      Icon: IntegrationIcon,
      label: "MuleSoft",
      position: { x: -8, y: 5 },
      depth: 1.3,
      size: 48,
    },
    {
      id: 8,
      Icon: TerminalIcon,
      label: "Docker",
      position: { x: 10, y: -18 },
      depth: 0.85,
      size: 52,
    },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {techElements.map((element) => {
        const { Icon, label, position, depth, size } = element;
        const parallaxX = mousePos.x * depth * 12;
        const parallaxY = mousePos.y * depth * 12;

        return (
          <motion.div
            key={element.id}
            initial={{
              opacity: 0,
              scale: 0.3,
              rotate: -180,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              x: parallaxX,
              y: parallaxY,
            }}
            transition={{
              opacity: { duration: 0.8, delay: element.id * 0.08 },
              scale: { duration: 0.8, delay: element.id * 0.08, ease: [0.34, 1.56, 0.64, 1] },
              rotate: { duration: 1, delay: element.id * 0.08, ease: "easeOut" },
              x: { duration: 0.5, ease: "easeOut" },
              y: { duration: 0.5, ease: "easeOut" },
            }}
            className="absolute hidden xl:block"
            style={{
              left: `calc(50% + ${position.x}vw)`,
              top: `calc(40% + ${position.y}vh)`,
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{
                y: [0, -12, 0],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 5 + element.id * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              {/* Multi-layer glow effect */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.3, 0.15],
                }}
                transition={{
                  duration: 3 + element.id * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-accent/40 rounded-2xl blur-2xl"
              />

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2.5 + element.id * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute inset-0 bg-blue-400/30 rounded-2xl blur-xl"
              />

              {/* Tech icon container */}
              <motion.div
                whileHover={{
                  scale: 1.15,
                  rotate: 8,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative w-full h-full flex items-center justify-center rounded-2xl border border-accent/30 bg-gradient-to-br from-surface/90 to-surface-soft/70 backdrop-blur-xl shadow-2xl group cursor-pointer"
                style={{
                  boxShadow: '0 8px 32px rgba(107, 159, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Icon */}
                <Icon className="w-7 h-7 text-accent-light drop-shadow-lg group-hover:text-accent transition-colors duration-300" />

                {/* Shine effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl"
                />
              </motion.div>

              {/* Label tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-surface-elevated/95 backdrop-blur-md border border-accent/20 shadow-xl"
              >
                <p className="text-xs font-medium text-accent-light tracking-wide">
                  {label}
                </p>
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-surface-elevated/95 border-l border-t border-accent/20 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingTechElements;
