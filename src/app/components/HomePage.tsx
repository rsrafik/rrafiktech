import { LandingSection } from "./LandingSection";
import { AboutSection } from "./AboutSection";
import { SkillsSection } from "./SkillsSection";
import { ContactSection } from "./ContactSection";
import { FullscreenMenu } from "./FullscreenMenu";
import { useState, useEffect, useRef, useCallback } from "react";

export function HomePage() {
  const [isOnLightBg, setIsOnLightBg] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const checkPosition = useCallback(() => {
    if (!aboutRef.current) return;
    const rect = aboutRef.current.getBoundingClientRect();
    const menuButtonBottom = 60;
    setIsOnLightBg(rect.top <= menuButtonBottom);

    // Detect active section using viewport midpoint
    const midpoint = window.innerHeight / 2;
    const sections = [
      { id: "contact", ref: contactRef },
      { id: "skills", ref: skillsRef },
      { id: "about", ref: aboutRef },
    ];
    let found: string | null = null;
    for (const section of sections) {
      const el = section.ref.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (r.top <= midpoint && r.bottom > midpoint) {
          found = section.id;
          break;
        }
      }
    }
    setActiveSection(found);
  }, []);

  useEffect(() => {
    // Delay initial check to ensure layout has settled
    const raf = requestAnimationFrame(() => {
      checkPosition();
    });
    window.addEventListener("scroll", checkPosition, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", checkPosition);
    };
  }, [checkPosition]);

  return (
    <div className="relative w-full min-h-screen bg-white overflow-x-hidden">
      <FullscreenMenu isOnLightBg={isOnLightBg} activeSection={activeSection} />
      <LandingSection />
      <div
        ref={aboutRef}
        id="about"
        className="relative"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
      >
        <AboutSection />
      </div>
      <div
        ref={skillsRef}
        id="skills"
        className="relative"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
      >
        <SkillsSection />
      </div>
      {/* Gradient bridge: parchment fades to white before Contact */}
      <div className="h-36 md:h-52 bg-gradient-to-b from-[#f3efe2] to-white" />
      <div
        ref={contactRef}
        id="contact"
        className="relative"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1200px" }}
      >
        <ContactSection />
      </div>
    </div>
  );
}
