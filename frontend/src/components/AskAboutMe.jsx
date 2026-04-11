import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { askSuggestions } from "../data/portfolioData";
import Reveal from "./Reveal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

function AskAboutMe() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasAsked, setHasAsked] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!question.trim()) return;

    setHasAsked(true);
    setError("");
    setAnswer("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error("Unable to get a response right now.");
      }

      const data = await response.json();
      setAnswer(data.answer ?? "No response available.");
    } catch (submitError) {
      setError(submitError.message);
      setAnswer("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ask" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:px-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Ask About My Work
            </p>
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-5xl">
              Work Focused Technical Insights
            </h2>
            <p className="text-base leading-relaxed text-[var(--text-secondary)]">
              Ask about my architecture decisions, backend engineering work, integration delivery, and my approach to reliable systems execution.
            </p>

            <div className="flex flex-wrap gap-3">
              {askSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuestion(suggestion)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[var(--text-secondary)] transition-colors duration-300 hover:text-white"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="ask-premium-panel relative mt-4 overflow-hidden rounded-[28px] border border-white/10 bg-[var(--surface)]/92 p-5 sm:p-8 md:mt-6 md:p-10">
            <div className="ask-panel-grid pointer-events-none absolute inset-0 opacity-50" />
            <div className="ask-panel-orb pointer-events-none absolute -right-12 top-8 h-36 w-36 rounded-full" />
            <div className="ask-panel-orb ask-panel-orb-secondary pointer-events-none absolute -left-10 bottom-10 h-28 w-28 rounded-full" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="ask-input" className="sr-only">
                Ask about my work
              </label>
              <div className="ask-input-row flex flex-col gap-3 sm:flex-row sm:items-end">
                <textarea
                  id="ask-input"
                  rows={4}
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="Ask about my experience, systems thinking, or project work..."
                  className="ask-textarea w-full resize-none rounded-2xl border border-white/10 bg-[var(--surface-elevated)] px-5 py-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-[var(--muted)] focus:border-[var(--accent)]/40"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="ask-submit-btn h-fit rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-7"
                >
                  {isLoading ? "Thinking..." : "Ask"}
                </button>
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Powered by ZoSwi AI
              </p>
            </form>

            {hasAsked && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLoading ? "loading" : error || answer || "empty"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 rounded-2xl border border-white/10 bg-[#08111d]/72 p-6"
                >
                  {isLoading ? (
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                      ZoSwi AI is reviewing Samhith's resume context to provide a precise, professional response.
                    </p>
                  ) : error ? (
                    <p className="text-sm text-red-400">{error}</p>
                  ) : (
                    <p className="whitespace-pre-wrap break-words text-base leading-relaxed text-[var(--text)]">
                      {answer || "I may not have enough verified resume context for that yet. Please contact Samhith for a precise answer."}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default AskAboutMe;
