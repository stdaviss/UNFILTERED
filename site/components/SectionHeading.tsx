"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeOnly, fadeRise, viewportOnce } from "@/lib/motion";

interface Props {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
}

export default function SectionHeading({ eyebrow, title, sub, align = "center" }: Props) {
  const reduceMotion = useReducedMotion();
  const v = reduceMotion ? fadeOnly : fadeRise;
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={v}
      className={`max-w-2xl ${alignCls}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sunset">{eyebrow}</p>
      <h2 className="text-balance mt-3 font-display text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {sub && <p className="text-balance mt-4 text-base leading-relaxed text-cream-dim sm:text-lg">{sub}</p>}
    </motion.div>
  );
}
