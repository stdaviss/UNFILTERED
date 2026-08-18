"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { NIGHT_STEPS } from "@/lib/data";
import { fadeOnly, fadeRise, staggerParent, viewportOnce } from "@/lib/motion";

/**
 * Section 2 — "How the Night Unfolds"
 * Rules reframed as a party timeline, revealed step by step on scroll.
 */
export default function NightFlow() {
  const reduceMotion = useReducedMotion();
  const item = reduceMotion ? fadeOnly : fadeRise;

  return (
    <section id="how-it-plays" className="bg-kitenge relative bg-night-plum py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How the night unfolds"
          title={
            <>
              No rulebook lectures. <span className="text-gold">Just a timeline.</span>
            </>
          }
          sub="Three moves between “everyone's on their phone” and “nobody wants to go home.”"
        />

        <motion.ol
          variants={staggerParent(0.18)}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mt-16 grid gap-6 lg:grid-cols-3"
        >
          {/* Connecting line (desktop) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-night-edge to-transparent lg:block"
          />

          {NIGHT_STEPS.map((s) => (
            <motion.li
              key={s.step}
              variants={item}
              className="relative flex flex-col rounded-3xl border border-night-edge bg-night-surface/60 p-7 backdrop-blur-sm"
            >
              <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-cta-gradient font-display text-xl font-bold text-night-indigo shadow-glow-sunset">
                {s.step}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-cream">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream-dim">{s.body}</p>

              <ul className="mt-6 space-y-3 border-t border-night-edge/60 pt-5">
                {s.detail.map((d) => (
                  <li key={d.label} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 shrink-0" aria-hidden="true">
                      {d.icon}
                    </span>
                    <span>
                      <span className="font-semibold text-cream">{d.label}</span>{" "}
                      <span className="text-cream-faint">— {d.note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
