import { motion, useScroll, useTransform, useInView } from "motion/react";
import {
  SiJavascript,
  SiPython,
  SiSwift,
  SiHtml5,
  SiCss3,
  SiReact,
  SiSpringboot,
  SiTailwindcss,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
  SiNotion,
  SiSharp,
} from "react-icons/si";
import { FaJava, FaC } from "react-icons/fa6";
import { TbBrandSwift } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import type { IconType } from "react-icons";
import { useRef } from "react";
import statueImg from "../../assets/statue-image.png";
import bustImg from "../../assets/bust-image.png";

interface Skill {
  name: string;
  icon: IconType;
}

const languages: Skill[] = [
  { name: "Java", icon: FaJava },
  { name: "Python", icon: SiPython },
  { name: "C", icon: FaC },
  { name: "C#", icon: SiSharp },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Swift", icon: SiSwift },
  { name: "HTML/CSS", icon: SiHtml5 },
];

const frameworks: Skill[] = [
  { name: "React", icon: SiReact },
  { name: "Spring Boot", icon: SiSpringboot },
  { name: "SwiftUI", icon: TbBrandSwift },
  { name: "TailwindCSS", icon: SiTailwindcss },
  { name: "Firebase", icon: SiFirebase },
];

const tools: Skill[] = [
  { name: "MySQL", icon: SiMysql },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Figma", icon: SiFigma },
  { name: "Notion", icon: SiNotion },
  { name: "Agile Development", icon: VscCode },
];

function MarqueeRow({
  skills,
  direction = "left",
  duration = 30,
  label,
}: {
  skills: Skill[];
  direction?: "left" | "right";
  duration?: number;
  label: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isRowInView = useInView(rowRef, { margin: "-50px" });
  const repeated = [...skills, ...skills, ...skills, ...skills];

  return (
    <div ref={rowRef} className="flex flex-col gap-3 mb-10">
      <motion.p
        animate={isRowInView ? { opacity: 1, x: 0 } : { opacity: 0, x: direction === "left" ? -20 : 20 }}
        transition={{ duration: 0.6 }}
        className="font-['Ephesis',sans-serif] text-[#768a55] px-6 md:px-16"
        style={{ fontSize: "clamp(24px, 2.7vw, 38px)" }}
      >
        {label}
      </motion.p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#faf8f0] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#faf8f0] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center w-max"
          animate={{
            x: direction === "left" ? ["0%", "-25%"] : ["-25%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration,
              ease: "linear",
            },
          }}
        >
          {repeated.map((skill, i) => (
            <div key={`${skill.name}-${i}`} className="flex items-center">
              <div className="flex items-center gap-3 px-4 py-2 group cursor-default">
                <skill.icon className="text-[#494d17] opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ fontSize: "clamp(20px, 1.8vw, 30px)" }} />
                <span className="font-['Gowun_Dodum',sans-serif] text-[#2a2a2a] whitespace-nowrap group-hover:text-[#494d17] transition-colors duration-300" style={{ fontSize: "clamp(17px, 1.45vw, 24px)" }}>
                  {skill.name}
                </span>
              </div>
              <span className="text-[#c5b57a] mx-2.5 select-none" style={{ fontSize: "clamp(16px, 1.3vw, 22px)" }}>
                &bull;
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function AnimatedTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { margin: "-80px" });

  const letters = "MY SKILLS".split("");

  return (
    <div ref={titleRef} className="flex flex-col items-center mb-8 md:mb-12 relative z-10">
      <motion.div
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, delay: isInView ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-px bg-[#c5b57a] mb-6 origin-center"
      />

      <h2 className="font-['Limelight',sans-serif] text-[#494d17] text-center leading-none flex overflow-hidden" style={{ fontSize: "clamp(42px, 5.8vw, 84px)" }}>
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            animate={
              isInView
                ? { y: "0%", opacity: 1, rotateX: 0 }
                : { y: "120%", opacity: 0, rotateX: 90 }
            }
            transition={{
              duration: 0.7,
              delay: isInView ? 0.2 + i * 0.06 : (letters.length - 1 - i) * 0.03,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
            style={{
              minWidth: letter === " " ? "0.3em" : undefined,
              textShadow: "0 2px 30px rgba(197, 181, 122, 0.3)",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </h2>

      <motion.div
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, delay: isInView ? 0.8 : 0, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-px bg-[#c5b57a] mt-6 origin-center"
      />

      <motion.div
        animate={isInView ? { opacity: 0.15, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.5, delay: isInView ? 0.6 : 0, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[430px] h-[96px] rounded-full bg-[#c5b57a] blur-3xl pointer-events-none -z-10"
      />
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // Statue (left): dramatic parallax rise + slight rotation + scale
  const statueY = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [200, 30, 0, -60]);
  const statueOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.75, 1], [0, 0, 0.14, 0.14, 0.04]);
  const statueRotate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [5, 1, 0, -2]);
  const statueScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.85, 1, 1.03]);

  // Bust (right): parallax with opposite rotation
  const bustY = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 1], [180, 20, 0, -50]);
  const bustOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.35, 0.75, 1], [0, 0, 0.08, 0.08, 0.02]);
  const bustRotate = useTransform(scrollYProgress, [0.05, 0.35, 0.65, 1], [-4, -1, 0, 2]);
  const bustScale = useTransform(scrollYProgress, [0.05, 0.35, 0.65], [0.8, 1, 1.05]);

  // Mobile statue
  const mobileStatueY = useTransform(scrollYProgress, [0.3, 0.55, 1], [100, 0, -30]);
  const mobileStatueOpacity = useTransform(scrollYProgress, [0.3, 0.42, 0.55, 0.85, 1], [0, 0, 0.15, 0.15, 0.05]);
  const mobileStatueScale = useTransform(scrollYProgress, [0.3, 0.55], [0.85, 1]);

  // Accent orbs parallax
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={sectionRef} className="relative bg-gradient-to-b from-white via-[#faf8f0] to-[#f3efe2] py-16 md:py-24 overflow-hidden min-h-screen">
      {/* Decorative warm accent circles with parallax */}
      <motion.div
        style={{ y: orb1Y }}
        className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-[#d5b669]/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: orb2Y }}
        className="absolute bottom-32 -right-24 w-80 h-80 rounded-full bg-[#768a55]/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#c5b57a]/5 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: orb3Y }}
        className="md:hidden absolute bottom-28 left-1/2 -translate-x-1/2 w-[340px] h-[420px] rounded-full bg-[#c5b57a]/7 blur-3xl pointer-events-none"
      />

      {/* Statue - left side decorative element (desktop only) */}
      <motion.div
        style={{
          y: statueY,
          opacity: statueOpacity,
          rotate: statueRotate,
          scale: statueScale,
        }}
        className="hidden md:block absolute -left-12 bottom-0 w-[360px] lg:w-[420px] pointer-events-none select-none origin-bottom"
      >
        <img
          src={statueImg}
          alt=""
          className="w-full h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>

      <AnimatedTitle />

      <div className="relative z-10">
        {/* Bust - right side, flipped (desktop only) */}
        <motion.div
          style={{
            y: bustY,
            opacity: bustOpacity,
            rotate: bustRotate,
            scale: bustScale,
          }}
          className="hidden lg:block absolute -right-10 bottom-0 w-[600px] xl:w-[690px] pointer-events-none select-none -scale-x-100 z-0 origin-bottom"
        >
          <img
            src={bustImg}
            alt=""
            className="w-full h-auto object-contain"
          />
        </motion.div>
        <MarqueeRow
          skills={languages}
          direction="left"
          duration={25}
          label="Languages"
        />
        <MarqueeRow
          skills={frameworks}
          direction="right"
          duration={20}
          label="Frameworks & Libraries"
        />
        <MarqueeRow
          skills={tools}
          direction="left"
          duration={22}
          label="Tools & Methodologies"
        />
      </div>

      {/* Mobile statue - centered at bottom */}
      <motion.div
        style={{
          y: mobileStatueY,
          opacity: mobileStatueOpacity,
          scale: mobileStatueScale,
        }}
        className="md:hidden relative z-10 flex justify-center -mt-36 pointer-events-none select-none"
      >
        <img
          src={statueImg}
          alt=""
          className="w-[220px] h-auto object-contain"
        />
      </motion.div>
    </section>
  );
}
