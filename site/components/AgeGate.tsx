"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const COOKIE_NAME = "pu_age_verified";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function hasConsentCookie() {
  return document.cookie.split("; ").some((c) => c.startsWith(`${COOKIE_NAME}=1`));
}

function setConsentCookie() {
  document.cookie = `${COOKIE_NAME}=1; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

/**
 * 18+ age gate.
 *
 * SEO-safe by design: the page content is fully server-rendered underneath;
 * this modal only mounts client-side after hydration, so crawlers (which
 * don't run the cookie check) index the complete page.
 */
export default function AgeGate() {
  const [open, setOpen] = useState(false);
  const [denied, setDenied] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hasConsentCookie()) setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const confirm = () => {
    setConsentCookie();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-night-indigo/90 backdrop-blur-md" aria-hidden="true" />

          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="bg-kitenge relative w-full max-w-md overflow-hidden rounded-3xl border border-night-edge bg-night-surface p-8 shadow-card-lift"
          >
            <div className="relative">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-magenta/40 bg-magenta/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-magenta-soft">
                <span aria-hidden="true">🔞</span> Grown folks only
              </p>

              <h2 id="age-gate-title" className="font-display text-3xl font-semibold leading-tight">
                This game is rated 18+.
                <br />
                <span className="text-gold">Are you of legal age?</span>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                Party Unfiltered™ contains adult humor and an optional spicy pack. By entering, you
                confirm you&apos;re 18 or older.
              </p>

              {denied && (
                <p role="status" className="mt-4 rounded-xl bg-night-plum p-3 text-sm text-cream-dim">
                  No stress — come back when you&apos;re grown. The sherehe will be waiting. 🎈
                </p>
              )}

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  ref={confirmRef}
                  onClick={confirm}
                  className="focus-gold flex-1 rounded-full bg-cta-gradient px-6 py-3.5 font-display text-base font-semibold text-night-indigo shadow-glow-gold transition-transform hover:scale-[1.03] active:scale-[0.98]"
                >
                  Yes, I&apos;m 18+
                </button>
                <button
                  onClick={() => setDenied(true)}
                  className="focus-gold flex-1 rounded-full border border-night-edge px-6 py-3.5 text-base font-medium text-cream-dim transition-colors hover:border-cream-faint hover:text-cream"
                >
                  Not yet
                </button>
              </div>

              <p className="mt-5 text-center text-[11px] text-cream-faint">
                We store a single cookie so we don&apos;t ask again for 30 days.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
