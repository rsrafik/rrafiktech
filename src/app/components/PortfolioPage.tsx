import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgArtwork1 from "../../assets/artwork-1.png";
import imgArtwork2 from "../../assets/artwork-2.png";
import imgArtwork3 from "../../assets/artwork-3.png";
import imgArtwork4 from "../../assets/artwork-4.png";
import imgArtwork5 from "../../assets/artwork-5.png";
import imgArtwork6 from "../../assets/artwork-6.png";
import imgBg from "../../assets/image-background.png";

interface Artwork {
  id: number;
  src: string;
  title: string;
  subtitle: string;
}

const artworks: Artwork[] = [
  {
    id: 1,
    src: imgArtwork1,
    title: "THE PERFORMER",
    subtitle: "Charcoal on Paper",
  },
  {
    id: 2,
    src: imgArtwork2,
    title: "BOUND",
    subtitle: "Charcoal on Canvas",
  },
  {
    id: 3,
    src: imgArtwork3,
    title: "SEVERED SOUL",
    subtitle: "Charcoal on Paper",
  },
  {
    id: 4,
    src: imgArtwork4,
    title: "THE CHOSEN ONE",
    subtitle: "Charcoal on Paper",
  },
  {
    id: 5,
    src: imgArtwork5,
    title: "KING AMONG GODS",
    subtitle: "Graphite on Paper",
  },
  {
    id: 6,
    src: imgArtwork6,
    title: "SKULLBORNE",
    subtitle: "Charcoal on Paper",
  },
];

const swipeConfidenceThreshold = 50;

export function PortfolioPage() {
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      setPage(([prev]) => {
        let next = prev + newDirection;
        if (next < 0) next = artworks.length - 1;
        if (next >= artworks.length) next = 0;
        return [next, newDirection];
      });
    },
    []
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [paginate]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeConfidenceThreshold) {
      paginate(diff > 0 ? 1 : -1);
    }
  };

  // Mouse drag for desktop swipe
  const isDragging = useRef(false);
  const mouseStartX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    mouseStartX.current = e.clientX;
    touchEndX.current = e.clientX; // Initialize to same position so a click without drag has diff=0
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };
  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = mouseStartX.current - touchEndX.current;
    if (Math.abs(diff) > swipeConfidenceThreshold) {
      paginate(diff > 0 ? 1 : -1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.92,
    }),
  };

  const artwork = artworks[currentIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background image with dark overlay */}
      <motion.img
        src={imgBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        draggable={false}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-black/75 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* Top header area */}
      <div className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-6">
        {/* Left: Section label */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="font-['Cormorant_SC',serif] text-[#c5b57a]/70 tracking-[0.4em] uppercase" style={{ fontWeight: 400, fontSize: "clamp(13px, 1.2vw, 18px)" }}>
            Selected Works
          </p>
          <p className="font-['Playfair_Display',serif] text-[#fff8d9] tracking-[0.2em] -mt-0.5" style={{ fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 22px)" }}>
            PORTFOLIO
          </p>
        </motion.div>
      </div>

      {/* Counter - positioned to vertically center with MENU button */}
      <motion.div
        className="fixed top-6 z-20 flex items-center"
        style={{ right: 'calc(1.5rem + 120px)' }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center">
          <span className="font-['Limelight',sans-serif] text-[#fff8d9] leading-none" style={{ fontSize: "clamp(26px, 3.5vw, 52px)" }}>
            {currentIndex + 1}
          </span>
          <span className="font-['Limelight',sans-serif] text-[#c5b57a]/40 leading-none mx-2" style={{ fontSize: "clamp(26px, 3.5vw, 52px)" }}>
            /
          </span>
          <span className="font-['Limelight',sans-serif] text-[#c5b57a]/40 leading-none" style={{ fontSize: "clamp(26px, 3.5vw, 52px)" }}>
            {artworks.length}
          </span>
        </div>
      </motion.div>

      {/* Decorative horizontal line */}
      <motion.div
        className="absolute top-[90px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c5b57a]/30 to-transparent z-10"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      />

      {/* Main image area - centered between header line and bottom controls */}
      <div className="absolute top-[100px] bottom-[70px] left-0 right-0 flex flex-col items-center justify-center z-10 cursor-grab active:cursor-grabbing">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={artwork.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 35 },
                opacity: { duration: 0.35 },
                scale: { duration: 0.4 },
              }}
              className="relative flex flex-col items-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.7}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > 10000 || offset.x > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <img
                src={artwork.src}
                alt={artwork.title}
                className="max-w-[85vw] md:max-w-[48vw] max-h-[58vh] md:max-h-[65vh] w-auto h-auto object-contain pointer-events-none"
                draggable={false}
              />
              {/* Title area - slides with the image */}
              <div className="mt-8 text-center">
                <p className="font-['Playfair_Display',serif] text-[#fff8d9] tracking-[0.2em] uppercase" style={{ fontWeight: 700, fontSize: "clamp(22px, 3vw, 46px)" }}>
                  {artwork.title}
                </p>
                <p className="font-['Cormorant_SC',serif] text-[#c5b57a]/70 tracking-[0.4em] uppercase" style={{ fontWeight: 400, fontSize: "clamp(14px, 1.5vw, 22px)" }}>
                  {artwork.subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12">
        {/* PREV / NEXT buttons */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <button
            onClick={() => paginate(-1)}
            className="flex items-center gap-3 bg-transparent border border-[#c5b57a]/30 px-6 py-3 cursor-pointer group transition-all duration-300 hover:border-[#c5b57a]/60 hover:bg-[#c5b57a]/5"
          >
            <ChevronLeft className="w-5 h-5 text-[#c5b57a]/60 group-hover:text-[#fff8d9] transition-colors" />
            <span className="font-['Limelight',sans-serif] text-[#c5b57a]/60 tracking-[0.2em] group-hover:text-[#fff8d9] transition-colors" style={{ fontSize: "clamp(13px, 1.2vw, 18px)" }}>
              PREV
            </span>
          </button>
          <button
            onClick={() => paginate(1)}
            className="flex items-center gap-3 bg-transparent border border-[#c5b57a]/30 px-6 py-3 cursor-pointer group transition-all duration-300 hover:border-[#c5b57a]/60 hover:bg-[#c5b57a]/5"
          >
            <span className="font-['Limelight',sans-serif] text-[#c5b57a]/60 tracking-[0.2em] group-hover:text-[#fff8d9] transition-colors" style={{ fontSize: "clamp(13px, 1.2vw, 18px)" }}>
              NEXT
            </span>
            <ChevronRight className="w-5 h-5 text-[#c5b57a]/60 group-hover:text-[#fff8d9] transition-colors" />
          </button>
        </motion.div>

        {/* Indicator bars */}
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {artworks.map((item, i) => (
            <button
              key={item.id}
              onClick={() =>
                setPage(([prev]) => [i, i > prev ? 1 : -1])
              }
              className="relative h-6 cursor-pointer bg-transparent border-none p-0 transition-all duration-300"
              style={{ width: i === currentIndex ? 20 : 8 }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 transition-all duration-500"
                style={{
                  height: i === currentIndex ? 20 : 14,
                  backgroundColor:
                    i === currentIndex
                      ? "#fff8d9"
                      : "rgba(197, 181, 122, 0.3)",
                  width: i === currentIndex ? 3 : 2,
                  margin: "0 auto",
                }}
              />
            </button>
          ))}
        </motion.div>
      </div>

      {/* Back to home link */}
      <motion.a
        href="/"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 font-['Gowun_Dodum',sans-serif] text-[#c5b57a]/40 tracking-[0.2em] uppercase hover:text-[#fff8d9] transition-colors duration-300 hidden md:block"
        style={{ fontSize: "clamp(12px, 1.1vw, 16px)" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        ← Back to Home
      </motion.a>
    </div>
  );
}
