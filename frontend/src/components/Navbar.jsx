import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import profilePhoto from "../assets/profile-photo.png";
import { navLinks } from "../data/portfolioData";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDot, setShowProfileDot] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);

      const heroSection = document.getElementById("top");
      if (!heroSection) {
        setShowProfileDot(false);
        return;
      }

      // Hero screen: only "SC". After hero: show avatar till end.
      const heroTriggerY = heroSection.offsetHeight - 120;
      setShowProfileDot(window.scrollY >= heroTriggerY);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6"
    >
      <nav
        className={`relative mx-auto mt-3 flex w-full max-w-7xl items-center justify-between overflow-hidden rounded-full px-4 py-3.5 transition-all duration-500 sm:mt-4 sm:px-5 sm:py-4 ${
          isScrolled
            ? "premium-panel soft-ring"
            : "border-transparent bg-transparent"
        }`}
      >
        {isScrolled && (
          <>
            <div className="pointer-events-none absolute inset-0 rounded-full border border-white/15 shadow-[0_0_28px_rgba(31,199,182,0.26)]" />
            <div className="pointer-events-none absolute -left-16 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(31,199,182,0.28),_transparent_65%)] blur-2xl" />
            <div className="pointer-events-none absolute -right-16 top-1/2 h-24 w-40 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(87,166,255,0.24),_transparent_65%)] blur-2xl" />
            <motion.div
              aria-hidden="true"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)]"
            />
          </>
        )}

        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ opacity: 0.8 }}
          className="relative z-10 flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.24em] text-white"
        >
          <motion.span
            initial={false}
            animate={{
              width: showProfileDot ? 28 : 0,
              opacity: showProfileDot ? 1 : 0,
              marginRight: showProfileDot ? 2 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <span className="block h-7 w-7 overflow-hidden rounded-full border border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.24)]">
              <img
                src={profilePhoto}
                alt="Samhith profile"
                className="h-full w-full scale-[1.14] object-cover object-top"
              />
            </span>
          </motion.span>
          SC
        </motion.button>

        <div className="relative z-10 hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => goToSection(link.id)}
              className="text-sm font-medium text-[var(--text-secondary)] transition-colors duration-300 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={() => goToSection("contact")}
            className="hidden premium-button btn-dark rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 sm:block"
          >
            Connect
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-white transition-colors duration-200 hover:bg-white/[0.08] md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaXmark className="text-lg" /> : <FaBars className="text-base" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute right-1 top-[calc(100%+0.6rem)] z-30 w-48 rounded-2xl border border-white/12 bg-[#081321]/95 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl md:hidden sm:right-2 sm:w-52">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToSection("contact")}
                className="mt-1 flex w-full items-center rounded-xl bg-[var(--accent)] px-3 py-2 text-left text-sm font-semibold text-white"
              >
                Connect
              </button>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}

export default Navbar;
