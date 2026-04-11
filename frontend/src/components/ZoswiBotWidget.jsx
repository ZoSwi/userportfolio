import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";
import { MdPerson } from "react-icons/md";
import zoswiNeuralRaw from "../assets/zoswi-neural-raw.png";
import { buildTransparentNeuralIcon } from "../utils/buildTransparentNeuralIcon";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

const quickPrompts = [
  "Summarize Samhith's architecture experience",
  "What backend systems has Samhith built?",
  "What is Samhith's integration expertise?",
];

const quickLinks = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function ZoswiBotWidget() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiAvatarSrc, setAiAvatarSrc] = useState(zoswiNeuralRaw);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "I'm ZoSwi AI, built by Samhith. Ask me about his work, projects, architecture, and professional experience.",
    },
  ]);

  const appendMessage = (role, value, ctaHref = null, ctaLabel = null) => {
    setMessages((prev) => [...prev, { role, text: value, ctaHref, ctaLabel }]);
  };

  useEffect(() => {
    if (!chatWindowRef.current) return;
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages, isLoading, open]);

  useEffect(() => {
    buildTransparentNeuralIcon(zoswiNeuralRaw).then(setAiAvatarSrc);
  }, []);

  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 220);
    };

    window.addEventListener("zoswi:open", handleOpen);
    return () => window.removeEventListener("zoswi:open", handleOpen);
  }, []);

  const blockedIntent = (value) => {
    const q = value.toLowerCase();
    return [
      "write code",
      "code snippet",
      "fix this code",
      "leetcode",
      "personal life",
      "girlfriend",
      "boyfriend",
      "wife",
      "husband",
      "address",
      "phone number",
      "date of birth",
    ].some((term) => q.includes(term));
  };

  const sendQuestion = async (question) => {
    const value = question.trim();
    if (!value || isLoading) return;

    appendMessage("user", value);
    setText("");

    if (blockedIntent(value)) {
      appendMessage(
        "assistant",
        "I can help with Samhith's professional work and portfolio topics. For personal details, please use the contact page.",
        "#contact",
        "Go to Contact page"
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: value }),
      });

      if (!response.ok) {
        let msg = "Unable to respond right now.";
        try {
          const payload = await response.json();
          if (payload?.message) msg = payload.message;
        } catch {
          // keep fallback
        }
        throw new Error(msg);
      }

      const data = await response.json();
      appendMessage("assistant", data.answer || "I do not have enough context for that yet.");
    } catch (error) {
      appendMessage("assistant", error.message || "Unable to respond right now.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence mode="wait">
        {open ? (
          <motion.div
            key="bot-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24 }}
            className="zoswi-widget zoswi-panel-size flex h-[min(78vh,620px)] w-[min(94vw,440px)] min-h-0 flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#081426]/95"
          >
            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="zoswi-3d-text">ZoSwi AI</span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">Portfolio Assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-[var(--text-secondary)] hover:text-white"
                aria-label="Close ZoSwi AI"
              >
                <FaXmark />
              </button>
            </div>

            <div
              ref={chatWindowRef}
              data-lenis-prevent
              className="zoswi-chat-window min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3"
            >
              {messages.map((item, index) => {
                const isAssistant = item.role === "assistant";
                return (
                  <div
                    key={`${item.role}-${index}`}
                    className={`flex items-end gap-2 ${isAssistant ? "justify-start" : "justify-end"}`}
                  >
                    {isAssistant && (
                      <span className="inline-flex shrink-0 items-center justify-center">
                        <img src={aiAvatarSrc} alt="ZoSwi AI" className="zoswi-ai-icon h-8 w-8 object-contain" />
                      </span>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl border px-3 py-2 text-sm leading-relaxed ${
                        isAssistant
                          ? "border-white/10 bg-[#112943]/84 text-[#c8def2]"
                          : "border-[#62aee3]/40 bg-[#1a4268]/86 text-[#e8f5ff]"
                      }`}
                    >
                      <p className="break-words [overflow-wrap:anywhere]">{item.text}</p>
                      {item.ctaHref && item.ctaLabel && (
                        <div className="mt-2">
                          <a
                            href={item.ctaHref}
                            className="inline-flex rounded-md border border-[#69aee0]/40 bg-[#143754]/70 px-2.5 py-1 text-xs font-semibold text-[#d8ecff] hover:border-[#82c0ea]/60 hover:text-white"
                          >
                            {item.ctaLabel}
                          </a>
                        </div>
                      )}
                    </div>
                    {!isAssistant && (
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-[#d8edff]">
                        <MdPerson className="zoswi-human-glyph text-xl" />
                      </span>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <span className="inline-flex shrink-0 items-center justify-center">
                    <img src={aiAvatarSrc} alt="ZoSwi AI" className="zoswi-ai-icon h-8 w-8 object-contain" />
                  </span>
                  <div className="max-w-[82%] rounded-2xl border border-white/10 bg-[#112943]/84 px-3 py-2 text-sm text-[#c8def2]">
                    ZoSwi AI is reviewing context...
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-[#081a2c]/72 px-4 py-3">
              <div className="zoswi-chip-row mb-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendQuestion(prompt)}
                    className="shrink-0 rounded-full border border-white/12 bg-[#0c1e31]/82 px-3 py-1.5 text-[11px] text-[#a8c0d8] hover:border-[#5ca6dd]/35 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="zoswi-chip-row mb-2 flex flex-nowrap items-center gap-2 overflow-x-auto pb-1">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="shrink-0 rounded-full border border-[#66aee0]/30 bg-[#143653]/70 px-3 py-1.5 text-[11px] font-semibold text-[#d7ecff] hover:border-[#87c2eb]/55 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendQuestion(text);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Ask ZoSwi AI..."
                  className="zoswi-input w-full rounded-xl border border-white/12 bg-[#0c1f33]/88 px-3 py-2 text-base text-[#e8f5ff] outline-none placeholder:text-[var(--muted)] focus:border-[#5ca6dd]/45 sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#5ca6dd]/35 bg-[#173958]/78 text-[#7cc4f8] hover:bg-[#1c4a73] disabled:opacity-60 sm:h-9 sm:w-9"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="bot-trigger"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            className="zoswi-trigger group relative inline-flex items-center gap-2 rounded-full border border-white/12 bg-[#081426]/95 px-4 py-3 text-sm font-semibold text-white"
            aria-label="Open ZoSwi AI"
          >
            <span className="zoswi-3d-text">ZoSwi AI</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ZoswiBotWidget;
