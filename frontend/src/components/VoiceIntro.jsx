import { useEffect, useRef } from "react";

export const VoiceIntro = ({ onComplete }) => {
  const startedRef = useRef(false);
  const finishedRef = useRef(false);
  const fallbackTimerRef = useRef(null);

  useEffect(() => {
    const hasHeardVoice = sessionStorage.getItem("voice_intro_played");
    if (hasHeardVoice) {
      onComplete();
      return;
    }

    if (!("speechSynthesis" in window)) {
      onComplete();
      return;
    }

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      sessionStorage.setItem("voice_intro_played", "true");
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

    const playVoiceIntro = (attempt = 0) => {
      if (startedRef.current || finishedRef.current) return;

      const jarvisScript =
        "Hello, I am ZoSwi AI. I am here to help you understand the work of my founder, Samhith Cheruku, Application Architect and Software Engineer. I am ready to guide you through his experience, architecture decisions, and delivery approach.";

      const utterance = new SpeechSynthesisUtterance(jarvisScript);
      utterance.rate = 0.9;
      utterance.pitch = 1.08;
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

      startedRef.current = true;

      utterance.onend = () => {
        if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
        finish();
      };
      utterance.onerror = () => {
        if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
        finish();
      };

      // Prevent queue conflicts if another utterance exists.
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

      // Some browsers do not reliably fire onend for blocked utterances.
      fallbackTimerRef.current = window.setTimeout(finish, 7000);
    };

    const handleFirstInteraction = () => {
      playVoiceIntro();
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    // Try autoplay first.
    const autoStartTimer = window.setTimeout(playVoiceIntro, 250);
    window.speechSynthesis.onvoiceschanged = () => {
      if (!startedRef.current && !finishedRef.current) {
        playVoiceIntro();
      }
    };

    // Fallback for browsers requiring user gesture.
    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      window.clearTimeout(autoStartTimer);
      if (fallbackTimerRef.current) window.clearTimeout(fallbackTimerRef.current);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [onComplete]);

  return null;
};
