import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import profilePhoto from "../assets/profile-photo.png";

export const LiveMemoji = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isExpanded = isHovered || isTouchDevice;

  const springConfig = { damping: 22, stiffness: 140 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  useEffect(() => {
    const touchQuery = window.matchMedia("(hover: none), (pointer: coarse)");
    const handleTouchPref = () => setIsTouchDevice(touchQuery.matches);
    handleTouchPref();
    touchQuery.addEventListener("change", handleTouchPref);

    const handleMouseMove = (e) => {
      const rect = document.getElementById("memoji-container")?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      touchQuery.removeEventListener("change", handleTouchPref);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      id="memoji-container"
      className="relative mx-auto w-full max-w-[430px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ y: isExpanded ? [0, -8, 0] : [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative [perspective:1400px]"
      >
        <motion.div
          animate={{
            opacity: isExpanded ? 1 : 0.6,
            scale: isExpanded ? 1 : 0.75,
          }}
          className="absolute inset-10 rounded-[2rem] bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_70%)] blur-3xl"
        />

        <motion.div
          animate={{
            scale: isExpanded ? 1 : 0.58,
            borderRadius: isExpanded ? "2rem" : "9999px",
            padding: 0,
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto"
          style={{ transform: "translateZ(50px)" }}
        >
          <motion.div
            animate={{ borderRadius: isExpanded ? "1.55rem" : "9999px" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden"
          >
            <img
              src={profilePhoto}
              alt="Portrait of Samhith Cheruku"
              className="block h-[20rem] w-full object-cover object-top sm:h-[30rem]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_18%,transparent_72%,rgba(7,17,27,0.22))]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
