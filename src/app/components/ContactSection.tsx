import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiOutlineDownload } from "react-icons/hi";
import { Mail, Send, CheckCircle, ArrowUpRight } from "lucide-react";

function AnimatedContactTitle() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(titleRef, { margin: "-80px" });

  const letters = "CONTACT".split("");

  return (
    <div
      ref={titleRef}
      className="flex flex-col items-center mb-20 md:mb-28 relative z-10"
    >
      <motion.div
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 1,
          delay: isInView ? 0.1 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-32 h-px bg-[#c5b57a] mb-6 origin-center"
      />

      <h2 className="font-['Limelight',sans-serif] text-[#494d17] text-center leading-none flex overflow-hidden" style={{ fontSize: "clamp(54px, 8.5vw, 120px)" }}>
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
              delay: isInView
                ? 0.2 + i * 0.06
                : (letters.length - 1 - i) * 0.03,
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
        animate={
          isInView
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 1,
          delay: isInView ? 0.8 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-32 h-px bg-[#c5b57a] mt-6 origin-center"
      />

      <motion.p
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.8, delay: isInView ? 0.9 : 0 }}
        className="font-['Gowun_Dodum',sans-serif] text-[#8a8a7a] mt-6 text-center max-w-lg tracking-wide"
        style={{ fontSize: "clamp(16px, 1.6vw, 24px)" }}
      >
        Let's create something extraordinary together.
      </motion.p>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  isTextarea = false,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  isTextarea?: boolean;
  delay?: number;
}) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(fieldRef, { margin: "-40px" });
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      ref={fieldRef}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{
        duration: 0.7,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <label className="font-['Cormorant_SC',serif] text-[#494d17] tracking-[0.3em] uppercase block mb-2" style={{ fontSize: "clamp(15px, 1.3vw, 19px)" }}>
        {label}
      </label>
      <div className="relative">
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={5}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-b border-[#c5b57a]/30 focus:border-[#c5b57a] text-[#2a2a2a] font-['Gowun_Dodum',sans-serif] py-3 px-1 outline-none transition-colors duration-500 resize-none placeholder:text-[#b5b5a5]"
            style={{ fontSize: "clamp(17px, 1.6vw, 24px)" }}
          />
        ) : (
          <input
            name={name}
            type={type}
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-transparent border-b border-[#c5b57a]/30 focus:border-[#c5b57a] text-[#2a2a2a] font-['Gowun_Dodum',sans-serif] py-3 px-1 outline-none transition-colors duration-500 placeholder:text-[#b5b5a5]"
            style={{ fontSize: "clamp(17px, 1.6vw, 24px)" }}
          />
        )}
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[#c5b57a] origin-left"
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

function LinkCard({
  icon: Icon,
  label,
  subtext,
  href,
  delay = 0,
  download = false,
}: {
  icon: React.ElementType;
  label: string;
  subtext: string;
  href: string;
  delay?: number;
  download?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { margin: "-40px" });

  return (
    <motion.div
      ref={cardRef}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.7,
        delay: isInView ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        download={download ? true : undefined}
        className="group relative flex items-center gap-5 p-7 md:p-8 border border-[#c5b57a]/20 bg-white/40 backdrop-blur-sm hover:border-[#c5b57a]/50 hover:bg-white/70 transition-all duration-500 overflow-hidden"
      >
        {/* Hover fill */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#c5b57a]/5 to-[#768a55]/5"
          initial={{ x: "-100%" }}
          whileHover={{ x: "0%" }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative z-10 flex items-center justify-center w-16 h-16 border border-[#c5b57a]/30 group-hover:border-[#c5b57a]/60 transition-colors duration-500">
          <Icon className="text-[#494d17] group-hover:text-[#768a55] transition-colors duration-300" style={{ fontSize: "clamp(22px, 2vw, 32px)" }} />
        </div>

        <div className="relative z-10 flex-1">
          <p className="font-['Playfair_Display',serif] text-[#2a2a2a] group-hover:text-[#494d17] transition-colors duration-300" style={{ fontWeight: 600, fontSize: "clamp(18px, 1.7vw, 26px)" }}>
            {label}
          </p>
          <p className="font-['Gowun_Dodum',sans-serif] text-[#8a8a7a] tracking-wide" style={{ fontSize: "clamp(14px, 1.3vw, 18px)" }}>
            {subtext}
          </p>
        </div>

        <ArrowUpRight className="relative z-10 text-[#c5b57a]/50 w-6 h-6 group-hover:text-[#494d17] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
      </a>
    </motion.div>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const isButtonInView = useInView(buttonRef, { margin: "-40px" });
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const subject = (form.elements.namedItem("subject") as HTMLInputElement)?.value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)?.value;

    const mailtoLink = `mailto:rrafik@purdue.edu?subject=${encodeURIComponent(subject || "")}&body=${encodeURIComponent(`From: ${email}\n\n${message || ""}`)}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-white py-28 md:py-44 overflow-hidden"
    >
      {/* Decorative orbs */}
      <div className="absolute top-32 -right-40 w-80 h-80 rounded-full bg-[#c5b57a]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-[#768a55]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d5b669]/[0.03] blur-3xl pointer-events-none" />

      {/* Corner decorations */}
      <div className="absolute top-16 left-8 md:left-16 opacity-20">
        <div className="w-16 h-px bg-[#c5b57a]" />
        <div className="w-px h-16 bg-[#c5b57a]" />
      </div>
      <div className="absolute top-16 right-8 md:right-16 opacity-20">
        <div className="w-16 h-px bg-[#c5b57a] ml-auto" />
        <div className="w-px h-16 bg-[#c5b57a] ml-auto" />
      </div>

      <AnimatedContactTitle />

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Form - takes 3 columns */}
          <div className="lg:col-span-3">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
              {/* Mail icon header */}
              <motion.div
                className="flex items-center gap-4 mb-10"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-40px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 flex items-center justify-center border border-[#c5b57a]/30">
                  <Mail className="text-[#494d17] w-8 h-8" />
                </div>
                <p className="font-['Ephesis',sans-serif] text-[#768a55]" style={{ fontSize: "clamp(30px, 3.2vw, 52px)" }}>
                  Send a message
                </p>
              </motion.div>

              <FormField
                label="Email"
                name="email"
                type="email"
                placeholder="your@email.com"
                delay={0.1}
              />
              <FormField
                label="Subject"
                name="subject"
                type="text"
                placeholder="What's on your mind?"
                delay={0.2}
              />
              <FormField
                label="Message"
                name="message"
                placeholder="Tell me about your project, idea, or just say hello..."
                isTextarea
                delay={0.3}
              />

              {/* Submit button */}
              <motion.div
                ref={buttonRef}
                animate={
                  isButtonInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{
                  duration: 0.7,
                  delay: isButtonInView ? 0.4 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <button
                  type="submit"
                  disabled={submitted}
                  className="group relative flex items-center gap-4 px-14 py-6 border border-[#494d17]/60 bg-transparent hover:bg-[#494d17] cursor-pointer overflow-hidden transition-all duration-500 disabled:opacity-70"
                >
                  <motion.div
                    className="absolute inset-0 bg-[#494d17]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: "left" }}
                  />
                  {submitted ? (
                    <>
                      <CheckCircle className="relative z-10 w-6 h-6 text-[#768a55]" />
                      <span className="relative z-10 font-['Limelight',sans-serif] text-[#768a55] tracking-[0.25em]" style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}>
                        SENT
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="relative z-10 w-6 h-6 text-[#494d17] group-hover:text-white transition-colors duration-300" />
                      <span className="relative z-10 font-['Limelight',sans-serif] text-[#494d17] tracking-[0.25em] group-hover:text-white transition-colors duration-300" style={{ fontSize: "clamp(15px, 1.4vw, 19px)" }}>
                        SEND MESSAGE
                      </span>
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>

          {/* Links sidebar - takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <motion.p
              className="font-['Ephesis',sans-serif] text-[#768a55] mb-2"
              style={{ fontSize: "clamp(30px, 3.2vw, 52px)" }}
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-40px" }}
              transition={{ duration: 0.6 }}
            >
              Find me elsewhere
            </motion.p>

            <LinkCard
              icon={SiGithub}
              label="GitHub"
              subtext="View my repositories & code"
              href="https://github.com/rsrafik"
              delay={0.15}
            />
            <LinkCard
              icon={SiLinkedin}
              label="LinkedIn"
              subtext="Let's connect professionally"
              href="https://www.linkedin.com/in/rachel-rafik-29841b2b1/"
              delay={0.25}
            />
            <LinkCard
              icon={HiOutlineDownload}
              label="Resume"
              subtext="Download my CV"
              href="/rachel-rafik-resume.pdf"
              delay={0.35}
              download
            />

            {/* Decorative quote */}
            <motion.div
              className="mt-8 pt-8 border-t border-[#c5b57a]/15"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ margin: "-30px" }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="font-['Playfair_Display',serif] text-[#b5b5a5] italic leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 22px)" }}>
                "Every artist was first an amateur."
              </p>
              <p className="font-['Cormorant_SC',serif] text-[#c5b57a]/50 tracking-[0.3em] mt-2" style={{ fontSize: "clamp(13px, 1.1vw, 16px)" }}>
                — Ralph Waldo Emerson
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        className="flex justify-center mt-20 md:mt-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-30px" }}
        transition={{ duration: 1 }}
      >

      </motion.div>
    </section>
  );
}
