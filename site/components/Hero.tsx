"use client";

import { motion, useReducedMotion } from "framer-motion";
import BuyButton from "./BuyButton";
import { HEAT, PRICE_DISPLAY, PRICE_SUB } from "@/lib/data";
import { fadeOnly, fadeRise, staggerParent } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Floating heat card (3D stack element)                               */
/* ------------------------------------------------------------------ */
function HeatCard({
  level,
  title,
  color,
  className,
  floatClass,
  tilt,
}: {
  level: 1 | 2 | 3;
  title: string;
  color: string;
  className: string;
  floatClass: string;
  tilt: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <div
      aria-label={`Sample card: ${title}, heat level ${HEAT[level].label}`}
      role="img"
      className={`absolute w-32 select-none rounded-2xl border p-3 shadow-card backdrop-blur-sm sm:w-36 ${className} ${
        reduceMotion ? "" : floatClass
      }`}
      style={{
        borderColor: `${color}55`,
        background: `linear-gradient(160deg, ${color}26 0%, rgba(29,15,56,0.92) 60%)`,
        ["--tilt" as string]: tilt,
        transform: `rotate(${tilt})`,
      }}
    >
      <div
        className="mb-2 h-1.5 w-8 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <p className="font-display text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color }}>
        {title}
      </p>
      <p className="mt-1 text-lg leading-none" aria-hidden="true">
        {HEAT[level].peppers}
      </p>
      <p className="mt-1.5 text-[10px] font-medium text-cream-faint">{HEAT[level].label} heat</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* CSS-only isometric game box                                         */
/* ------------------------------------------------------------------ */
function GameBox() {
  return (
    <div
      className="perspective-1200 relative mx-auto h-[260px] w-[220px] sm:h-[300px] sm:w-[250px]"
      role="img"
      aria-label="Party Unfiltered East Africa Edition game box, a deep plum rigid box with gold lettering"
    >
      <div
        className="preserve-3d absolute inset-0"
        style={{ transform: "rotateX(14deg) rotateY(-24deg)" }}
      >
        {/* Front face */}
        <div
          className="bg-kitenge absolute inset-0 flex flex-col justify-between overflow-hidden rounded-xl border border-night-edge p-5"
          style={{
            background: "linear-gradient(155deg, #2a1650 0%, #1d0f38 55%, #150a2d 100%)",
            transform: "translateZ(34px)",
            boxShadow: "0 30px 60px -18px rgba(0,0,0,0.75)",
          }}
        >
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-magenta-soft">
              East Africa Edition
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-[0.95] text-cream">
              PARTY
              <br />
              UN
              <span className="text-gold">FILTERED</span>
              <span className="align-super text-sm text-gold">™</span>
            </h3>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[10px] font-medium leading-snug text-cream-dim">
              170 cards
              <br />3 heat levels
              <br />
              18+
            </p>
            <span className="text-2xl" aria-hidden="true">
              🌶️
            </span>
          </div>
          {/* Foil shine sweep */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "linear-gradient(115deg, transparent 30%, rgba(255,210,63,0.25) 45%, transparent 60%)",
            }}
          />
        </div>

        {/* Right side face */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-[68px] rounded-r-xl"
          style={{
            background: "linear-gradient(180deg, #0f081f 0%, #170d30 100%)",
            transform: "rotateY(90deg) translateZ(calc(100% - 34px))",
            transformOrigin: "right",
          }}
        />

        {/* Top face (lid) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[68px] rounded-t-xl"
          style={{
            background: "linear-gradient(90deg, #35205c 0%, #241243 100%)",
            transform: "rotateX(-90deg) translateZ(34px)",
            transformOrigin: "top",
          }}
        />
      </div>

      {/* Floor glow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 h-16 w-[130%] -translate-x-1/2 rounded-[100%] bg-magenta/20 blur-3xl"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function Hero() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeOnly : fadeRise;

  return (
    <section
      id="top"
      className="grain-overlay bg-hero-glow relative overflow-hidden bg-night-indigo pb-20 pt-28 sm:pt-32 lg:pb-28"
    >
      <div className="bg-kitenge absolute inset-0" aria-hidden="true" />

      <motion.div
        variants={staggerParent(0.14)}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-8"
      >
        {/* Copy */}
        <div className="text-center lg:text-left">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold"
          >
            <span className="animate-pulse-glow" aria-hidden="true">
              ●
            </span>
            East Africa Edition · 18+
          </motion.p>

          <motion.h1
            variants={item}
            className="text-balance mt-6 font-display text-hero-sm font-bold text-cream sm:text-hero lg:text-hero-lg"
          >
            THE GAME THAT BRINGS THE{" "}
            <span className="bg-cta-gradient bg-clip-text text-transparent">SHEREHE</span> TO THE
            TABLE.
          </motion.h1>

          <motion.p
            variants={item}
            className="text-balance mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-dim sm:text-lg lg:mx-0"
          >
            170 cards. 3 heat levels. Zero forced vulnerability. The ultimate East African party
            game for grown-ups.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <BuyButton />
            <a
              href="#the-cards"
              className="focus-gold inline-flex items-center gap-2 rounded-full border border-cream-faint/40 px-8 py-4 font-display text-lg font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              Play the Free Web Demo
              <span aria-hidden="true">▶</span>
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-5 text-sm text-cream-faint">
            <span className="font-semibold text-cream-dim">{PRICE_DISPLAY}</span> · {PRICE_SUB}
          </motion.p>
        </div>

        {/* 3D focal point */}
        <motion.div
          variants={reduceMotion ? fadeOnly : { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 24, delay: 0.2 } } }}
          className="relative mx-auto w-full max-w-md pb-10 pt-6"
        >
          <GameBox />
          <HeatCard
            level={1}
            title="Warm-Up"
            color="#2dd4bf"
            className="-left-2 top-0 sm:left-2"
            floatClass="animate-float-slow"
            tilt="-8deg"
          />
          <HeatCard
            level={2}
            title="Sherehe"
            color="#ffd23f"
            className="-right-2 top-16 sm:right-0"
            floatClass="animate-float-slower"
            tilt="7deg"
          />
          <HeatCard
            level={3}
            title="After-Hours"
            color="#f43f5e"
            className="bottom-0 left-6 sm:left-10"
            floatClass="animate-float-slowest"
            tilt="-4deg"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
