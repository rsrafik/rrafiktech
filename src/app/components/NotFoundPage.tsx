import { motion } from "motion/react";
import { useNavigate } from "react-router";

const rings = [
  { r: 540, text: "404 · PAGE NOT FOUND · ", size: 56, dir: 1, dur: 78 },
  { r: 468, text: "PAGE NOT FOUND · 404 · ", size: 50, dir: -1, dur: 70 },
  { r: 406, text: "404 · PAGE NOT FOUND · ", size: 44, dir: 1, dur: 62 },
  { r: 352, text: "PAGE NOT FOUND · 404 · ", size: 38, dir: -1, dur: 55 },
  { r: 305, text: "404 · PAGE NOT FOUND · ", size: 32, dir: 1, dur: 49 },
  { r: 264, text: "PAGE NOT FOUND · 404 · ", size: 27, dir: -1, dur: 44 },
  { r: 228, text: "404 · PAGE NOT FOUND · ", size: 23, dir: 1, dur: 39 },
  { r: 196, text: "PAGE NOT FOUND · 404 · ", size: 19, dir: -1, dur: 34 },
  { r: 168, text: "404 · PAGE NOT FOUND · ", size: 16, dir: 1, dur: 30 },
  { r: 144, text: "PAGE NOT FOUND · 404 · ", size: 13, dir: -1, dur: 26 },
];

function estimateTextWidth(text: string, fontSize: number) {
  return text.length * fontSize * 0.5;
}

function buildRingText(text: string, radius: number, fontSize: number) {
  const normalizedText = `${text.trim()}     `;
  const circumference = 2 * Math.PI * radius;
  const targetWidth = circumference * 0.9;
  let result = normalizedText;

  while (
    estimateTextWidth(result + normalizedText, fontSize) <= targetWidth
  ) {
    result += normalizedText;
  }

  return result.trim();
}

function getRingBandSize(fontSize: number) {
  return Math.max(18, Math.round(fontSize * 1.08));
}

function RotatingRing({ ring, index, center }: { ring: typeof rings[number]; index: number; center: number }) {
  const pathId = `ring-path-${index}`;
  const circumference = 2 * Math.PI * ring.r;
  const ringText = buildRingText(ring.text, ring.r, ring.size);
  const bandSize = getRingBandSize(ring.size);
  const bandOffset = bandSize / 2;
  return (
    <g>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`0 ${center} ${center}`}
        to={`${ring.dir > 0 ? 360 : -360} ${center} ${center}`}
        dur={`${ring.dur}s`}
        repeatCount="indefinite"
      />
      <circle
        cx={center}
        cy={center}
        r={ring.r - bandOffset}
        fill="none"
        stroke="#c5c0b3"
        strokeWidth={0.8}
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={center}
        cy={center}
        r={ring.r + bandOffset}
        fill="none"
        stroke="#c5c0b3"
        strokeWidth={0.8}
        vectorEffect="non-scaling-stroke"
      />
      <text
        fill="#494d16"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: ring.size,
          fontWeight: 700,
          letterSpacing: "0.01em",
        }}
        dominantBaseline="middle"
      >
        <textPath
          href={`#${pathId}`}
          startOffset="0%"
          textLength={circumference * 0.94}
          lengthAdjust="spacing"
        >
          {ringText}
        </textPath>
      </text>
    </g>
  );
}

export function NotFoundPage() {
  const navigate = useNavigate();
  const svgSize = 1200;
  const center = svgSize / 2;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f0ede4] flex items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width: "160vmin", height: "160vmin", maxWidth: 1400, maxHeight: 1400 }}>
        <svg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className="absolute inset-0 w-full h-full"
          overflow="visible"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {rings.map((ring, i) => (
              <path
                key={i}
                id={`ring-path-${i}`}
                d={`M ${center},${center} m -${ring.r},0 a ${ring.r},${ring.r} 0 1,1 ${ring.r * 2},0 a ${ring.r},${ring.r} 0 1,1 -${ring.r * 2},0`}
              />
            ))}
          </defs>
          {rings.map((ring, i) => (
            <RotatingRing key={i} ring={ring} index={i} center={center} />
          ))}
        </svg>

        {/* Center button */}
        <motion.button
          onClick={() => navigate("/")}
          className="relative z-10 w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-[#494d16] flex items-center justify-center cursor-pointer border-none shadow-[0_0_60px_rgba(73,77,22,0.28)]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 120, damping: 14 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="text-[#f0ede4] text-center text-[11px] md:text-[13px] tracking-[0.15em] leading-[1.6] uppercase"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            BACK TO
            <br />
            MAIN PAGE
          </span>
        </motion.button>

        {/* Innermost decorative ring (static) */}
        <div className="absolute w-[170px] h-[170px] md:w-[210px] md:h-[210px] rounded-full border border-[#c5c0b3]/40 pointer-events-none" />
      </div>
    </div>
  );
}
