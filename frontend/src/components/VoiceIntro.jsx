import { useEffect, useRef, useState } from "react";

export const VoiceIntro = ({ onComplete }) => {
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const speakingRef = useRef(false);
  const fallbackTimerRef = useRef(null);
  const startupCheckTimerRef = useRef(null);
  const [needsTapPrompt, setNeedsTapPrompt] = useState(false);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      onComplete();
      return;
    }

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      speakingRef.current = false;
      setNeedsTapPrompt(false);
      if (startupCheckTimerRef.current) window.clearTimeout(startupCheckTimerRef.current);
      onComplete();
    };

    const pickFemaleVoice = (voices) => {
      if (!voices?.length) return null;

      const femaleSignals = [
        "female",
        "woman",
        "aria",
        "jenny",
        "zira",
        "samantha",
        "victoria",
        "karen",
        "susan",
        "serena",
      ];
      const maleSignals = ["male", "man", "david", "mark", "daniel", "alex"];

      const englishVoices = voices.filter((voice) =>
        voice.lang?.toLowerCase().includes("en")
      );
      const pool = englishVoices.length ? englishVoices : voices;

      let best = null;
      let bestScore = -Infinity;

      for (const voice of pool) {
        const name = (voice.name || "").toLowerCase();
        let score = 0;

        if (voice.lang?.toLowerCase().startsWith("en-us")) score += 4;
        if (voice.lang?.toLowerCase().startsWith("en-gb")) score += 3;
        if (femaleSignals.some((signal) => name.includes(signal))) score += 10;
        if (maleSignals.some((signal) => name.includes(signal))) score -= 8;
        if (name.includes("google")) score += 2;
        if (name.includes("microsoft")) score += 2;

        if (score > bestScore) {
          best = voice;
          bestScore = score;
        }
      }

      return best;
    };

    const playVoiceIntro = (attempt = 0, source = "auto") => {
      if (finishedRef.current || startedRef.current || speakingRef.current) return;

      const jarvisScript =
        "Hello, I am ZoSwi AI. I can guide you through Samhith's architecture work, experience, and delivery approach.";

      const utterance = new SpeechSynthesisUtterance(jarvisScript);
      utterance.rate = 1.06;
      utterance.pitch = 1.12;
      utterance.volume = 1;
      utterance.lang = "en-US";

      const voices = window.speechSynthesis.getVoices();
      if (!voices.length && attempt < 6) {
        window.setTimeout(() => playVoiceIntro(attempt + 1), 200);
        return;
      }

      const selectedVoice = pickFemaleVoice(voices);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      speakingRef.current = true;
      if (source !== "auto") {
        setNeedsTapPrompt(false);
      }

      utterance.onstart = () => {
        startedRef.current = true;
        setNeedsTapPrompt(false);
      };
      utterance.onend = () => {
        if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
        finish();
      };
      utterance.onerror = () => {
        speakingRef.current = false;
        if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
        // On mobile, speech can be blocked without user activation.
        // Keep listeners alive so next interaction can retry.
        if (!startedRef.current && !finishedRef.current) {
          setNeedsTapPrompt(true);
        }
      };

      // Prevent queue conflicts if another utterance exists.
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      window.speechSynthesis.speak(utterance);

      // If speech didn't start shortly after speak(), allow retry.
      startupCheckTimerRef.current = window.setTimeout(() => {
        if (!startedRef.current && !finishedRef.current) {
          speakingRef.current = false;
          setNeedsTapPrompt(true);
        }
      }, 700);

      // Some browsers do not reliably fire onend for active utterances.
      fallbackTimerRef.current = window.setTimeout(() => {
        if (startedRef.current) finish();
      }, 9000);
    };

    const handleFirstInteraction = () => {
      playVoiceIntro(0, "gesture");
    };

    const handleExplicitPlay = () => {
      playVoiceIntro(0, "event");
    };

    // Try autoplay first.
    const autoStartTimer = window.setTimeout(playVoiceIntro, 250);
    window.speechSynthesis.onvoiceschanged = () => {
      if (!startedRef.current && !finishedRef.current) {
        playVoiceIntro();
      }
    };

    // Fallback for browsers requiring user gesture.
    window.addEventListener("pointerdown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("zoswi:play-voice", handleExplicitPlay);

    return () => {
      window.clearTimeout(autoStartTimer);
      if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
      if (startupCheckTimerRef.current) window.clearTimeout(startupCheckTimerRef.current);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("zoswi:play-voice", handleExplicitPlay);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [onComplete]);

  return needsTapPrompt ? (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("zoswi:play-voice"))}
      className="fixed bottom-4 left-1/2 z-[120] -translate-x-1/2 rounded-full border border-[#7cbcf0]/40 bg-[#10263d]/92 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#d7ecff] shadow-[0_12px_30px_rgba(4,14,25,0.35)]"
    >
      Tap to Start ZoSwi Voice
    </button>
  ) : null;
};
