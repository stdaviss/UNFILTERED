import type { Variants, Transition } from "framer-motion";

/**
 * Shared motion language for the whole site.
 *
 * Rules:
 *  - Spring-based, never linear. The site should feel like it has a pulse.
 *  - Everything respects prefers-reduced-motion: components use
 *    `useReducedMotion()` and swap these variants for opacity-only fades.
 *  - Scroll reveals use `whileInView` with `viewport={{ once: true }}` so
 *    the main thread stays free after first reveal.
 */

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 30,
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: springSoft },
};

export const fadeOnly: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/** Parent that staggers its children on scroll into view. */
export const staggerParent = (stagger = 0.12, delayChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Chat bubble pop — used by the Group Chat reviews section. */
export const bubblePop = (side: "left" | "right"): Variants => ({
  hidden: { opacity: 0, y: 18, x: side === "left" ? -14 : 14, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 24 },
  },
});

export const viewportOnce = { once: true, margin: "-80px" } as const;
