"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { CATEGORIES, HEAT, type CardCategory } from "@/lib/data";
import { fadeOnly, fadeRise, staggerParent, viewportOnce } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Single flip card                                                    */
/* ------------------------------------------------------------------ */
function FlipCard({ cat }: { cat: CardCategory }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggle = () => setFlipped((f) => !f);

  return (
    <button
      type="button"
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      data-flipped={flipped}
      aria-pressed={flipped}
      aria-label={`${cat.label} category card. ${flipped ? `Sample: ${cat.sample}` : "Activate to reveal a sample card."}`}
      className="flip-card perspective-1200 focus-gold group h-[400px] w-[280px] shrink-0 snap-center text-left sm:h-[420px] sm:w-[300px]"
    >
      <div
        className="flip-inner preserve-3d relative h-full w-full"
        style={reduceMotion && flipped ? { transform: "rotateY(180deg)", transition: "none" } : undefined}
      >
        {/* FRONT */}
        <div
          className="backface-hidden bg-kitenge absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border p-7 shadow-card"
          style={{
            borderColor: `${cat.color}44`,
            background: `linear-gradient(165deg, ${cat.color}1f 0%, rgba(23,19,33,0.96) 55%)`,
          }}
        >
          {/* Category color band */}
          <div
            className="absolute inset-x-0 top-0 h-2"
            style={{ backgroundColor: cat.color }}
            aria-hidden="true"
          />

          <div>
            <p
              className="font-display text-3xl font-bold tracking-tight"
              style={{ color: cat.color }}
            >
              {cat.locked && (
                <span className="mr-2" aria-hidden="true">
                  🔒
                </span>
              )}
              {cat.label}
            </p>
            <p className="mt-2 text-sm font-medium text-cream-faint">{cat.count}</p>
          </div>

          <div>
            <p className="text-lg font-medium text-cream">{cat.tagline}</p>
            <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream-faint">
              <span
                className="inline-block h-2 w-2 rounded-full transition-transform group-hover:scale-150"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
              Tap / hover to flip
            </p>
          </div>
        </div>

        {/* BACK */}
        <div
          className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border p-7 shadow-card-lift"
          style={{
            borderColor: `${cat.color}66`,
            background: `linear-gradient(165deg, ${cat.color}33 0%, rgba(29,15,56,0.97) 60%)`,
          }}
        >
          <div>
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: cat.color }}
            >
              {cat.locked ? "The vault" : "Sample card"}
            </p>
            <p className="mt-4 font-display text-xl font-medium leading-snug text-cream">
              “{cat.sample}”
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="text-base" aria-label={`Heat: ${HEAT[cat.sampleHeat].label}`}>
              {HEAT[cat.sampleHeat].peppers}
            </span>
            <span className="text-xs font-medium text-cream-faint">
              {cat.locked ? "Unanimous consent to unlock" : "Skip anytime. No penalty."}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Carousel                                                            */
/* ------------------------------------------------------------------ */
export default function CardCarousel() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeOnly : fadeRise;

  return (
    <section id="the-cards" className="grain-overlay relative overflow-hidden bg-night-charcoal py-24 sm:py-32">
      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The cards"
          title={
            <>
              Six flavors of chaos. <span className="text-magenta-soft">One deck.</span>
            </>
          }
          sub="Flip a category to taste a sample. Every card in the deck is heat-tagged, so nothing sneaks up on the table."
        />
      </div>

      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        role="region"
        aria-label="Card categories carousel. Scroll horizontally to browse."
        className="scrollbar-none relative z-[2] mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc(50vw-620px))] pb-6 pt-2"
      >
        {CATEGORIES.map((cat) => (
          <motion.div key={cat.id} variants={item}>
            <FlipCard cat={cat} />
          </motion.div>
        ))}
        <div className="w-2 shrink-0" aria-hidden="true" />
      </motion.div>

      <p className="relative z-[2] mt-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-cream-faint">
        ← Swipe to browse →
      </p>
    </section>
  );
}
