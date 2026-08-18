"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CHECKOUT_URL, PRICE_DISPLAY } from "@/lib/data";

/**
 * Mobile thumb-zone CTA. 80% of traffic arrives from IG/TikTok bios on
 * phones — the buy button lives at the bottom edge once the hero CTA
 * scrolls out of view. Hidden on desktop.
 */
export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-night-edge bg-night-indigo/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg sm:hidden"
        >
          <a
            href={CHECKOUT_URL}
            className="focus-gold flex w-full items-center justify-center gap-2 rounded-full bg-cta-gradient py-4 font-display text-base font-semibold text-night-indigo shadow-glow-gold active:scale-[0.98]"
          >
            Buy the Deck · {PRICE_DISPLAY}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
