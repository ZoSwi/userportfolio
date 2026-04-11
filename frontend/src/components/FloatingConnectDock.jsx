import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import zoswiNeuralRaw from "../assets/zoswi-neural-raw.png";
import { buildTransparentNeuralIcon } from "../utils/buildTransparentNeuralIcon";

const connectLinks = [
  {
    label: "ZoSwi AI",
    href: "#zoswi-ai",
    customIcon: true,
    action: () => window.dispatchEvent(new CustomEvent("zoswi:open")),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/samhith-cheruku",
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/samhithcheruku",
    Icon: FaGithub,
  },
  {
    label: "Gmail",
    href: "#contact",
    Icon: SiGmail,
  },
];

function FloatingConnectDock() {
  const [aiIconSrc, setAiIconSrc] = useState(zoswiNeuralRaw);
  const [isBotOpen, setIsBotOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileDock, setShowMobileDock] = useState(false);

  useEffect(() => {
    buildTransparentNeuralIcon(zoswiNeuralRaw).then(setAiIconSrc);
  }, []);

  useEffect(() => {
    const handleBotState = (event) => {
      setIsBotOpen(Boolean(event?.detail?.open));
    };
    window.addEventListener("zoswi:state", handleBotState);
    return () => window.removeEventListener("zoswi:state", handleBotState);
  }, []);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 640);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      if (window.innerWidth >= 640) {
        setShowMobileDock(true);
        return;
      }
      const heroSection = document.getElementById("top");
      const heroRect = heroSection?.getBoundingClientRect();
      const isPastHero = heroRect ? heroRect.bottom <= window.innerHeight * 0.92 : window.scrollY > window.innerHeight;
      setShowMobileDock(isPastHero);
    };
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  if (isMobile) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.55 }}
      className={`fixed bottom-[calc(0.85rem+env(safe-area-inset-bottom))] right-3 z-40 transition-opacity duration-200 sm:bottom-6 sm:left-4 sm:right-auto sm:translate-x-0 ${
        isBotOpen || !showMobileDock
          ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100"
          : "opacity-100"
      }`}
      aria-label="Quick connect links"
    >
      <div className="rounded-full border border-white/10 bg-[#071321]/78 px-2.5 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-lg sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
        <div className="flex items-center gap-3 sm:flex-col sm:gap-4">
        {connectLinks.map(({ label, href, Icon, customIcon, action }) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("#") ? undefined : "_blank"}
            rel={href.startsWith("#") ? undefined : "noreferrer"}
            onClick={(event) => {
              if (action) {
                event.preventDefault();
                action();
              }
            }}
            whileHover={{ y: -2, scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex h-8 w-8 items-center justify-center text-[var(--text-secondary)] transition-colors duration-200 hover:text-white sm:h-8 sm:w-8"
            aria-label={label}
            title={label}
          >
            {customIcon ? (
              <img
                src={aiIconSrc}
                alt="ZoSwi AI"
                className="h-6 w-6 object-contain brightness-125 contrast-110 saturate-125 drop-shadow-[0_0_12px_rgba(87,166,255,0.48)] sm:h-7 sm:w-7"
              />
            ) : (
              <Icon className="text-[1.15rem] drop-shadow-[0_0_12px_rgba(87,166,255,0.25)] sm:text-[1.3rem]" />
            )}
            <span className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md border border-white/10 bg-[#081220]/95 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
              {label}
            </span>
          </motion.a>
        ))}
        </div>
      </div>
    </motion.aside>
  );
}

export default FloatingConnectDock;
