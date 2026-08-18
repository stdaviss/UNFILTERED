"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { fadeOnly, fadeRise, staggerParent, viewportOnce } from "@/lib/motion";

const LEVELS = [
  {
    peppers: "🌶️",
    label: "Mild",
    color: "#2dd4bf",
    width: "33%",
    note: "Easy laughs, zero risk. Where every table starts.",
  },
  {
    peppers: "🌶️🌶️",
    label: "Medium",
    color: "#ffd23f",
    width: "66%",
    note: "The sherehe sweet spot. Bold, loud, still kind.",
  },
  {
    peppers: "🌶️🌶️🌶️",
    label: "Hot",
    color: "#f43f5e",
    width: "100%",
    note: "After-hours energy. Tagged, telegraphed, opt-in only.",
  },
] as const;

/**
 * Section 4 — The Heat System infographic.
 * Thermometer bars fill on scroll into view.
 */
export default function HeatSystem() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeOnly : fadeRise;

  return (
    <section id="heat" className="bg-kitenge relative bg-night-plum py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="The heat system"
              title={
                <>
                  You control the <span className="text-sunset">thermostat.</span>
                </>
              }
              sub="Every single card is tagged. If the vibe gets too heavy, draw a Safety card or drop the Breathe token to lower the heat. No explanations needed. Ever."
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={item}
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-cat-safety/30 bg-cat-safety/10 px-5 py-4"
            >
              <span className="text-2xl" aria-hidden="true">
                🫶
              </span>
              <p className="text-sm leading-relaxed text-cream-dim">
                <span className="font-semibold text-cat-safety">Skipping is a feature,</span> not a
                failure. The deck is built so nobody ever has to argue for their own comfort.
              </p>
            </motion.div>
          </div>

          {/* Thermometer */}
          <motion.ul
            variants={staggerParent(0.16)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6"
            aria-label="Heat levels"
          >
            {LEVELS.map((l) => (
              <motion.li
                key={l.label}
                variants={item}
                className="rounded-2xl border border-night-edge bg-night-surface/60 p-5"
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-lg font-semibold text-cream">
                    <span className="mr-2" aria-hidden="true">
                      {l.peppers}
                    </span>
                    {l.label}
                  </p>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: l.color }}>
                    {l.width} heat
                  </span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-night-indigo" role="presentation">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${l.color}88, ${l.color})` }}
                    initial={{ width: reduceMotion ? l.width : "0%" }}
                    whileInView={{ width: l.width }}
                    viewport={viewportOnce}
                    transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.15 }}
                  />
                </div>
                <p className="mt-3 text-sm text-cream-faint">{l.note}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
