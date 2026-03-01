import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef } from "react";
import imgPondInTheWoods from "../../assets/pond-in-the-woods.png";

export function LandingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Track when text content is in view for reversible animations
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { margin: "-50px" });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 -top-[10%] h-[120%]"
      >
        <img
          alt="Pond in the Woods by Narcisse Virgile Diaz de la Peña"
          className="w-full h-full object-cover"
          src={imgPondInTheWoods}
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Text content */}
      <motion.div
        ref={textRef}
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <motion.h1
          animate={isTextInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.92 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-['Plaster',sans-serif] text-[#fff8d9] text-center leading-none"
          style={{ fontSize: "clamp(46px, 7.5vw, 104px)" }}
        >
          Rachel Rafik
        </motion.h1>
        <motion.p
          animate={isTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1.2, delay: isTextInView ? 0.3 : 0, ease: "easeOut" }}
          className="font-['Ephesis',sans-serif] text-[#fff8d9] text-center mt-4"
          style={{ fontSize: "clamp(24px, 3.8vw, 54px)" }}
        >
          Developer, Artist, Designer
        </motion.p>
      </motion.div>

      {/* Attribution */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-6 md:left-8"
      >
        <p className="font-['Pompiere',sans-serif] text-[#d5b669]" style={{ fontSize: "clamp(12px, 1.2vw, 18px)" }}>
          Pond in the Woods &bull; Narcisse Virgile Diaz de la Pe&ntilde;a
        </p>
      </motion.div>
    </section>
  );
}
