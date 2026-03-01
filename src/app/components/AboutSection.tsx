import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue } from "motion/react";
import { useRef, useCallback } from "react";
import { useNavigate } from "react-router";
import imgPalmHouse from "../../assets/palm-house.png";

export function AboutSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  // Use useInView WITHOUT once so it toggles on scroll up/down
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { margin: "-100px" });

  const show = isInView;

  // 3D tilt on hover
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = imageContainerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 12);  // tilt left/right
    rotateX.set(y * -12); // tilt up/down (inverted for natural feel)
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <section ref={ref} className="relative bg-white py-[14vh] md:py-[18vh] px-6 md:px-16 overflow-hidden min-h-screen flex items-center">
      <div ref={inViewRef} className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* Image with parallax */}
        <motion.div className="relative w-full lg:w-[44%] shrink-0" style={{ maxWidth: "540px" }}>
          <motion.div
            style={{ y: imageY }}
            className="relative"
          >
            <motion.div
              animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
              ref={imageContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformPerspective: 800,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                alt="The Interior of the Palm House on the Pfaueninsel Near Potsdam by Carl Blechen"
                className="w-full aspect-[477/512] object-cover rounded-[25px]"
                src={imgPalmHouse}
                loading="lazy"
                decoding="async"
              />
              {/* Decorative border - inset over the image */}
              <motion.div
                animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: show ? 0.2 : 0, ease: "easeOut" }}
                className="absolute inset-[12px] border border-[#c5b57a] rounded-[20px] pointer-events-none"
              />
            </motion.div>
          </motion.div>
          <motion.p
            animate={show ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: show ? 0.5 : 0 }}
            className="font-['Pompiere',sans-serif] text-black mt-3"
            style={{ fontSize: "clamp(14px, 1.2vw, 20px)" }}
          >
            The Interior of the Palm House on the Pfaueninsel Near Potsdam &bull; Carl Blechen
          </motion.p>
        </motion.div>

        {/* Text content */}
        <div className="flex-1">
          <motion.h2
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: show ? 0.1 : 0, ease: "easeOut" }}
            className="font-['Limelight',sans-serif] text-[#494d17] text-center lg:text-left leading-none mb-10"
            style={{ fontSize: "clamp(46px, 6.2vw, 84px)" }}
          >
            ABOUT ME
          </motion.h2>
          <motion.div
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: show ? 0.3 : 0, ease: "easeOut" }}
            className="font-['Gowun_Dodum',sans-serif] text-black text-justify space-y-6"
            style={{ fontSize: "clamp(17px, 1.35vw, 22px)" }}
          >
            <p>
              I'm a{" "}
              <span className="text-[#494d17]">Moroccan-Venezuelan</span>{" "}
              (50/50 mix) living in the US. I speak{" "}
              <span className="text-[#494d17]">3 languages</span>, and my goal
              is to learn one per continent.
            </p>
            <p>
              I'm a major in{" "}
              <span className="text-[#494d17]">Computer Science </span>
              studying at{" "}
              <span className="text-[#494d17]">Purdue University</span>, and
              have been coding for 6 years now. I am concentrating in Software
              Engineering, Systems Software, and Machine Intelligence. I have
              two minors: Management and Arabic.
            </p>
            <p>
              I'm also an{" "}
              <span className="text-[#494d17]">artist</span>. My specialization
              is in charcoal. Curious about my pieces? Click{" "}
              <span
                className="text-[#768a55] underline decoration-dotted cursor-pointer"
                onClick={() => navigate("/portfolio")}
              >
                here
              </span>
              . I love art so much that I put some of my favorites throughout
              this site.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
