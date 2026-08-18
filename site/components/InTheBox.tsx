"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import BuyButton from "./BuyButton";
import { BOX_CONTENTS, PRICE_DISPLAY, PRICE_SUB } from "@/lib/data";
import { fadeOnly, fadeRise, staggerParent, viewportOnce } from "@/lib/motion";

/**
 * Section 6 — What's in the box (moody flat-lay).
 * Illustrated with CSS objects on a "table" surface; swap for a real
 * flat-lay photo (WebP/AVIF via next/image) when product shots exist.
 */
function FlatLay() {
  return (
    <div
      role="img"
      aria-label="Flat-lay of the game contents: rigid box, core card deck, sealed Filters Off pack, host guide and acrylic Breathe token on a dark table"
      className="grain-overlay bg-kitenge relative aspect-[4/3] overflow-hidden rounded-3xl border border-night-edge shadow-card-lift"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 50% 20%, #2a1650 0%, #1d0f38 55%, #120b26 100%)",
      }}
    >
      {/* Spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 45% at 50% 40%, rgba(255,210,63,0.10), transparent 70%)",
        }}
      />

      {/* The box */}
      <div className="absolute left-[8%] top-[14%] h-[46%] w-[38%] rotate-[-6deg] rounded-lg border border-night-edge bg-gradient-to-br from-[#2a1650] to-[#150a2d] p-3 shadow-card">
        <p className="font-display text-[min(2.6vw,17px)] font-bold leading-tight text-cream">
          PARTY
          <br />
          UN<span className="text-gold">FILTERED</span>
        </p>
        <p className="mt-1 text-[min(1.4vw,9px)] text-cream-faint">EAST AFRICA · 18+</p>
      </div>

      {/* Core deck stack */}
      <div className="absolute left-[52%] top-[12%] h-[38%] w-[24%]">
        {[3, 2, 1, 0].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-lg border border-white/10 bg-gradient-to-br from-night-surface to-night-plum shadow-card"
            style={{ transform: `translate(${i * 4}px, ${-i * 4}px) rotate(${i * 2 - 3}deg)` }}
          >
            {i === 0 && (
              <p className="p-2.5 font-display text-[min(1.8vw,11px)] font-semibold text-gold">
                155 CORE
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Filters Off sealed pack */}
      <div className="absolute right-[6%] top-[42%] h-[30%] w-[20%] rotate-[8deg] rounded-lg border border-cat-filtersoff/50 bg-gradient-to-br from-[#3d0f22] to-[#1d0a14] p-2.5 shadow-glow-magenta">
        <p className="font-display text-[min(1.8vw,11px)] font-bold text-cat-filtersoff">
          🔒 FILTERS OFF
        </p>
        <p className="mt-1 text-[min(1.3vw,8px)] text-cream-faint">15 · FOIL EDGES</p>
      </div>

      {/* Host guide */}
      <div className="absolute bottom-[10%] left-[16%] h-[26%] w-[30%] rotate-[3deg] rounded-md border border-white/10 bg-gradient-to-br from-[#241243] to-[#171321] p-2.5 shadow-card">
        <p className="font-display text-[min(1.8vw,11px)] font-semibold text-cream">HOST GUIDE</p>
        <div className="mt-1.5 space-y-1" aria-hidden="true">
          <div className="h-1 w-4/5 rounded bg-white/15" />
          <div className="h-1 w-3/5 rounded bg-white/10" />
          <div className="h-1 w-2/3 rounded bg-white/10" />
        </div>
      </div>

      {/* Breathe token */}
      <div className="absolute bottom-[14%] right-[26%] flex h-[16%] w-[12%] items-center justify-center rounded-full border-2 border-cat-safety/60 bg-cat-safety/15 shadow-[0_0_24px_rgba(45,212,191,0.3)]">
        <p className="font-display text-[min(1.6vw,10px)] font-bold tracking-wide text-cat-safety">
          BREATHE
        </p>
      </div>
    </div>
  );
}

export default function InTheBox() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeOnly : fadeRise;

  return (
    <section id="in-the-box" className="bg-kitenge relative bg-night-plum py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What's in the box"
          title={
            <>
              Built like it&apos;s going to <span className="text-sunset">survive the night.</span>
            </>
          }
          sub="Premium components, because this deck is going to get passed around a lot of tables."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={item}>
            <FlatLay />
          </motion.div>

          <motion.ul
            variants={staggerParent(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-4"
          >
            {BOX_CONTENTS.map((b) => (
              <motion.li
                key={b.title}
                variants={item}
                className="flex items-start gap-4 rounded-2xl border border-night-edge bg-night-surface/50 p-5"
              >
                <span className="text-2xl" aria-hidden="true">
                  {b.icon}
                </span>
                <div>
                  <p className="font-display text-base font-semibold text-cream">{b.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-cream-faint">{b.note}</p>
                </div>
              </motion.li>
            ))}

            <motion.li variants={item} className="pt-4">
              <BuyButton className="w-full sm:w-auto" />
              <p className="mt-3 text-sm text-cream-faint">
                <span className="font-semibold text-cream-dim">{PRICE_DISPLAY}</span> · {PRICE_SUB}
              </p>
            </motion.li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
