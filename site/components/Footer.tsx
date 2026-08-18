"use client";

import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <footer id="join-guest-list" className="bg-kitenge relative border-t border-night-edge bg-night-indigo pb-32 pt-20 sm:pb-16">
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Newsletter */}
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-bold text-cream">
            Join the <span className="text-gold">Guest List.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-cream-dim">
            Restock alerts, new edition drops, and free printable expansion cards. No spam — we
            respect the group chat.
          </p>

          {joined ? (
            <p
              role="status"
              className="mt-6 rounded-full border border-cat-safety/40 bg-cat-safety/10 px-6 py-3.5 text-sm font-medium text-cat-safety"
            >
              You&apos;re on the list. See you at the door. 🎫
            </p>
          ) : (
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes("@")) setJoined(true);
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@thecrew.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-gold w-full flex-1 rounded-full border border-night-edge bg-night-surface px-6 py-3.5 text-sm text-cream placeholder:text-cream-faint"
              />
              <button
                type="submit"
                className="focus-gold rounded-full bg-cta-gradient px-8 py-3.5 font-display text-sm font-semibold text-night-indigo shadow-glow-gold transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Count me in
              </button>
            </form>
          )}
        </div>

        {/* Links */}
        <div className="mt-16 flex flex-col items-center justify-between gap-8 border-t border-night-edge/60 pt-10 text-sm text-cream-faint md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-base font-bold text-cream">
              PARTY UNFILTERED<span className="text-gold">™</span>
            </p>
            <p className="mt-1 text-xs">East Africa Edition · Made for the sherehe. 18+ only.</p>
          </div>

          <nav aria-label="Social media" className="flex gap-6">
            <a href="https://instagram.com" className="focus-gold transition-colors hover:text-cream">
              Instagram
            </a>
            <a href="https://tiktok.com" className="focus-gold transition-colors hover:text-cream">
              TikTok
            </a>
            <a href="https://wa.me/" className="focus-gold transition-colors hover:text-cream">
              WhatsApp
            </a>
          </nav>

          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <a href="#" className="focus-gold transition-colors hover:text-cream">
              Privacy Policy
            </a>
            <a href="#" className="focus-gold transition-colors hover:text-cream">
              Terms of Service
            </a>
            <a href="#" className="focus-gold transition-colors hover:text-cream">
              Shipping &amp; Returns
            </a>
          </nav>
        </div>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-cream-faint/80">
          © {new Date().getFullYear()} Party Unfiltered Ltd. Personal data is handled in accordance
          with the Kenya Data Protection Act (2019), the Uganda Data Protection and Privacy Act
          (2019) and applicable data protection law in your region. This game is intended for
          players aged 18 and above. Play kind, skip freely, and drink water.
        </p>
      </div>
    </footer>
  );
}
