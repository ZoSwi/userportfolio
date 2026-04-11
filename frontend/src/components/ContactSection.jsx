import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa6";
import { contactLinks } from "../data/portfolioData";
import Reveal from "./Reveal";
import zoswiNeuralRaw from "../assets/zoswi-neural-raw.png";
import { buildTransparentNeuralIcon } from "../utils/buildTransparentNeuralIcon";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

function ContactSection() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusType, setStatusType] = useState("idle");
  const [aiIconSrc, setAiIconSrc] = useState(zoswiNeuralRaw);

  useEffect(() => {
    buildTransparentNeuralIcon(zoswiNeuralRaw).then(setAiIconSrc);
  }, []);

  const handleSend = async (event) => {
    event.preventDefault();
    if (!email.trim() || !title.trim() || !message.trim()) {
      setStatusType("error");
      setStatusText("Please complete all fields before sending.");
      return;
    }

    setIsSending(true);
    setStatusText("");
    setStatusType("idle");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          title: title.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        let apiMessage = "Unable to send message right now.";
        try {
          const errorData = await response.json();
          if (errorData?.message) {
            apiMessage = errorData.message;
          }
        } catch {
          // keep default message
        }
        throw new Error(apiMessage);
      }

      setStatusType("success");
      setStatusText("Message sent successfully.");
      setEmail("");
      setTitle("");
      setMessage("");
    } catch (error) {
      setStatusType("error");
      setStatusText(error.message || "Unable to send message right now.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 pb-16 pt-20 sm:px-10 sm:pb-20 sm:pt-28 lg:px-20">
      <Reveal>
        <div className="contact-premium-shell group relative overflow-hidden rounded-[32px] border border-white/10 bg-[var(--surface)] p-6 sm:p-10 md:p-14">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="contact-hover-glow pointer-events-none absolute inset-0" />
          <div className="contact-grid-overlay pointer-events-none absolute inset-0" />
          <div className="contact-accent-beam pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-6xl">
                Let&apos;s discuss backend and architecture delivery.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
                If you are hiring, building a platform team, or need someone who can move between system design and implementation, I&apos;d be glad to connect.
              </p>
            </div>

            <div className="contact-link-card rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <form onSubmit={handleSend} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Your email"
                  className="w-full rounded-xl border border-white/12 bg-[#0b1827]/70 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent-light)]/45"
                />
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Title"
                  className="w-full rounded-xl border border-white/12 bg-[#0b1827]/70 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent-light)]/45"
                />
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Message"
                  className="w-full resize-none rounded-xl border border-white/12 bg-[#0b1827]/70 px-4 py-3 text-sm text-white outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent-light)]/45"
                />
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={`text-xs ${
                      statusType === "error"
                        ? "text-red-400"
                        : statusType === "success"
                        ? "text-emerald-300"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {statusText || "Your message is sent securely to Samhith."}
                  </p>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--accent-light)]/35 bg-[var(--accent-light)]/15 p-3 text-[var(--accent-light)] transition-colors duration-300 hover:bg-[var(--accent-light)]/25 disabled:cursor-not-allowed disabled:opacity-55"
                    aria-label="Send message"
                  >
                    <FaPaperPlane className="text-sm" />
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("zoswi:open"))}
                  className="contact-social-chip inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent-light)]/40 hover:text-white"
                >
                  <img
                    src={aiIconSrc}
                    alt="ZoSwi AI"
                    className="h-5 w-5 object-contain brightness-125 contrast-110 saturate-125 drop-shadow-[0_0_10px_rgba(87,166,255,0.45)]"
                  />
                  <span>ZoSwi AI</span>
                </button>
                {contactLinks.map((item) => {
                  const Icon = item.label === "LinkedIn" ? FaLinkedin : FaGithub;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-social-chip inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] transition-all duration-300 hover:border-[var(--accent-light)]/40 hover:text-white"
                    >
                      <Icon className="text-sm text-[var(--accent-light)]" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default ContactSection;
