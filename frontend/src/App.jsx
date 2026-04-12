import { useEffect, useState } from "react";
import About from "./components/About";
import AskAboutMe from "./components/AskAboutMe";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import FloatingConnectDock from "./components/FloatingConnectDock";
import Hero from "./components/Hero";
import HighlightStrip from "./components/HighlightStrip";
import { IntroScreen } from "./components/IntroScreen";
import Navbar from "./components/Navbar";
import PrinciplesSection from "./components/PrinciplesSection";
import PremiumBackground from "./components/PremiumBackground";
import { VoiceIntro } from "./components/VoiceIntro";
import WorkCards from "./components/WorkCards";
import { SmoothScroll } from "./components/SmoothScroll";
import { AnimatedTechStack } from "./components/AnimatedTechStack";
import { PageSlideSection } from "./components/PageSlideSection";
import ZoswiBotWidget from "./components/ZoswiBotWidget";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [voiceComplete, setVoiceComplete] = useState(false);

  useEffect(() => {
    if (!introComplete) return;
    const timer = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("zoswi:play-voice"));
    }, 180);
    return () => window.clearTimeout(timer);
  }, [introComplete]);

  return (
    <>
      <IntroScreen onComplete={() => setIntroComplete(true)} />
      {introComplete && !voiceComplete && (
        <VoiceIntro onComplete={() => setVoiceComplete(true)} />
      )}

      {introComplete && (
        <SmoothScroll>
          <div className="relative overflow-x-hidden bg-[var(--bg)]">
            <PremiumBackground />
            <div className="grain-overlay pointer-events-none fixed inset-0 z-[1]" />

            <div className="relative z-10">
              <Navbar />
              <FloatingConnectDock />
              <ZoswiBotWidget />
              <main className="page-snap-root">
                <PageSlideSection>
                  <Hero />
                </PageSlideSection>

                <HighlightStrip />

                <PageSlideSection delay={0.03}>
                  <About />
                </PageSlideSection>

                <PageSlideSection delay={0.03}>
                  <WorkCards />
                </PageSlideSection>

                <PageSlideSection delay={0.03}>
                  <ExperienceSection />
                </PageSlideSection>

                <AnimatedTechStack />

                <PageSlideSection delay={0.03}>
                  <PrinciplesSection />
                </PageSlideSection>

                <PageSlideSection delay={0.02}>
                  <AskAboutMe />
                </PageSlideSection>

                <ContactSection />
              </main>
              <Footer />
            </div>
          </div>
        </SmoothScroll>
      )}
    </>
  );
}

export default App;
