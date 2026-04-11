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

  useEffect(() => {
    buildTransparentNeuralIcon(zoswiNeuralRaw).then(setAiIconSrc);
  }, []);

  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.55 }}
      className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2 sm:bottom-6 sm:left-4 sm:translate-x-0"
      aria-label="Quick connect links"
    >
      <div className="flex items-center gap-4 sm:flex-col">
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
            className="group relative flex h-8 w-8 items-center justify-center text-[var(--text-secondary)] transition-colors duration-200 hover:text-white"
            aria-label={label}
            title={label}
          >
            {customIcon ? (
              <img
                src={aiIconSrc}
                alt="ZoSwi AI"
                className="h-7 w-7 object-contain brightness-125 contrast-110 saturate-125 drop-shadow-[0_0_12px_rgba(87,166,255,0.48)]"
              />
            ) : (
              <Icon className="text-[1.3rem] drop-shadow-[0_0_12px_rgba(87,166,255,0.25)]" />
            )}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-[#081220]/95 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </motion.a>
        ))}
      </div>
    </motion.aside>
  );
}

export default FloatingConnectDock;
