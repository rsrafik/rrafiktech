import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import waterLilyImg from "../../assets/water-lily.png";

interface MenuItem {
  label: string;
  align: "left" | "center" | "right";
  offsetX: string;
  sectionId: string;
}

const menuItems: MenuItem[] = [
  { label: "ABOUT", align: "left", offsetX: "3%", sectionId: "about" },
  { label: "SKILLS", align: "left", offsetX: "15%", sectionId: "skills" },
  { label: "PROJECTS", align: "left", offsetX: "27%", sectionId: "projects" },
  { label: "PORTFOLIO", align: "left", offsetX: "39%", sectionId: "portfolio" },
  { label: "CONTACT", align: "left", offsetX: "51%", sectionId: "contact" },
];

// Sections that have their own route instead of being on the home page
const routeSections: Record<string, string> = {
  portfolio: "/portfolio",
  projects: "/projects",
};

export function FullscreenMenu({ isOnLightBg = false, activeSection }: { isOnLightBg?: boolean; activeSection?: string | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pendingScrollRef = useRef<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Track closing state for reverse cascade
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = useCallback(() => {
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setHoveredIndex(null);
    // Delay actual close to let reverse cascade play
    const totalCascadeTime = (menuItems.length - 1) * 0.06 + 0.35;
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, totalCascadeTime * 1000);
  }, []);

  const handleMenuItemClick = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      e.preventDefault();
      pendingScrollRef.current = sectionId;
      setHoveredIndex(null);
      setIsClosing(true);
      const totalCascadeTime = (menuItems.length - 1) * 0.06 + 0.35;

      // Check if this section has its own route
      const route = routeSections[sectionId];

      // Wait for close cascade to finish, then navigate
      setTimeout(() => {
        if (route) {
          // Navigate to the route
          if (location.pathname !== route) {
            navigate(route);
          }
        } else {
          // If we're not on the home page, navigate home first then scroll
          if (location.pathname !== "/") {
            navigate("/");
            // Wait a tick for the page to render, then scroll
            setTimeout(() => {
              const target = document.getElementById(sectionId);
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }, 100);
          } else {
            const target = document.getElementById(sectionId);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }, totalCascadeTime * 1000);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, totalCascadeTime * 1000);
    },
    [navigate, location.pathname]
  );

  const handleExitComplete = useCallback(() => {
    pendingScrollRef.current = null;
  }, []);

  return (
    <>
      {/* Menu Button - top right */}
      <motion.button
        onClick={handleOpen}
        className={`fixed top-6 right-6 z-[90] px-8 py-3 backdrop-blur-sm border-none cursor-pointer font-['Limelight',sans-serif] text-[#fff8d9] tracking-widest transition-all duration-500 ease-in-out ${
          isOnLightBg
            ? "bg-[rgba(58,74,58,0.85)] hover:bg-[rgba(58,74,58,1)]"
            : "bg-white/20 hover:bg-[#fff8d9]/30"
        }`}
        style={{ fontSize: "clamp(13px, 1.2vw, 17px)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        MENU
      </motion.button>

      {/* Fullscreen Overlay */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Dark base layer */}
            <div className="absolute inset-0 bg-[#1a1a0e]" />

            {/* Background image - hidden by default, revealed on hover via stripes */}
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: `url(${waterLilyImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Dark overlay on top of background */}
            <div className="absolute inset-0 bg-[#1a1a0e]/85" />

            {/* Close Button - top right */}
            <motion.button
              onClick={handleClose}
              className="absolute top-6 right-6 z-[110] px-8 py-3 bg-white/20 backdrop-blur-sm border-none cursor-pointer font-['Limelight',sans-serif] text-[#fff8d9] tracking-widest transition-all duration-300 hover:bg-[#fff8d9]/30"
              style={{ fontSize: "clamp(13px, 1.2vw, 17px)" }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              CLOSE
            </motion.button>

            {/* Menu Items */}
            <div className="relative z-[105] flex flex-col justify-center h-full px-6 md:px-12 py-24 gap-2 md:gap-0">
              {menuItems.map((item, index) => {
                // Reverse cascade: last item exits first (index 0 delay = biggest)
                const reverseIndex = menuItems.length - 1 - index;
                return (
                <motion.div
                  key={item.label}
                  className="relative"
                  initial={{ opacity: 0, y: 60, x: -30 }}
                  animate={
                    isClosing
                      ? {
                          opacity: 0,
                          y: 80,
                          x: 30,
                          transition: {
                            duration: 0.35,
                            delay: reverseIndex * 0.06,
                            ease: [0.4, 0, 1, 1],
                          },
                        }
                      : {
                          opacity: 1,
                          y: 0,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            delay: 0.15 + index * 0.08,
                            ease: "easeOut",
                          },
                        }
                  }
                >
                  {/* Hover stripe - reveals background image */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        className="absolute inset-0 -left-12 -right-12 overflow-hidden"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ originY: 0.5 }}
                      >
                        <div
                          className="absolute inset-0 opacity-70"
                          style={{
                            backgroundImage: `url(${waterLilyImg})`,
                            backgroundSize: "100vw 100vh",
                            backgroundPosition: "center",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active section stripe - always visible for current section */}
                  {activeSection === item.sectionId && hoveredIndex !== index && (
                    <div
                      className="absolute inset-0 -left-12 -right-12 overflow-hidden transition-opacity duration-300"
                      style={{ opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.4 : 1 }}
                    >
                      <div
                        className="absolute inset-0 opacity-70"
                        style={{
                          backgroundImage: `url(${waterLilyImg})`,
                          backgroundSize: "100vw 100vh",
                          backgroundPosition: "center",
                        }}
                      />
                    </div>
                  )}

                  <a
                    href={`#${item.sectionId}`}
                    className="relative block py-2 md:py-3 cursor-pointer transition-colors duration-300"
                    style={{ paddingLeft: item.offsetX }}
                    onMouseEnter={() => {
                      if (!isClosing && activeSection !== item.sectionId) setHoveredIndex(index);
                    }}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={(e) => handleMenuItemClick(e, item.sectionId)}
                  ><span
                      className="font-['Limelight',sans-serif] text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] leading-none transition-all duration-300 relative z-10"
                      style={{
                        color: "#fff8d9",
                        opacity:
                          hoveredIndex === null
                            ? activeSection === item.sectionId
                              ? 1
                              : 0.7
                            : hoveredIndex === index
                              ? 1
                              : activeSection === item.sectionId
                                ? 0.85
                                : 0.3,
                        textShadow:
                          hoveredIndex === index || (hoveredIndex === null && activeSection === item.sectionId)
                            ? "0 2px 20px rgba(255, 248, 217, 0.4)"
                            : activeSection === item.sectionId
                              ? "0 1px 10px rgba(255, 248, 217, 0.25)"
                              : "none",
                      }}
                    >{item.label}</span></a>
                </motion.div>
                );
              })}
            </div>

            {/* Bottom left accent text */}
            <motion.span
              className="absolute bottom-6 left-6 z-[105] font-['Gowun_Dodum',sans-serif] text-[#c5b57a]/50 text-[13px] tracking-[0.2em] uppercase"
              initial={{ opacity: 0 }}
              animate={isClosing ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: isClosing ? 0.2 : 0.6, delay: isClosing ? 0 : 0.6 }}
            >
              Portfolio
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
