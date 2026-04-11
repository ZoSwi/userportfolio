import { useState } from "react";
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
import { FadeInSection, ScrollSection } from "./components/ScrollSection";
import ZoswiBotWidget from "./components/ZoswiBotWidget";

function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const [voiceComplete, setVoiceComplete] = useState(false);

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
              <main>
                <Hero />

                <FadeInSection>
                  <HighlightStrip />
                </FadeInSection>

                <ScrollSection>
                  <About />
                </ScrollSection>

                <ScrollSection>
                  <WorkCards />
                </ScrollSection>

                <FadeInSection>
                  <ExperienceSection />
                </FadeInSection>

                <AnimatedTechStack />

                <ScrollSection>
                  <PrinciplesSection />
                </ScrollSection>

                <FadeInSection>
                  <AskAboutMe />
                </FadeInSection>

                <FadeInSection>
                  <ContactSection />
                </FadeInSection>
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
