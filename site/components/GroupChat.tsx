"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { CHAT_MESSAGES, type ChatMessage } from "@/lib/data";
import { bubblePop, fadeOnly, fadeRise, staggerParent, viewportOnce } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/* Avatar — stylized cast member (gradient monogram)                   */
/* ------------------------------------------------------------------ */
function Avatar({ msg }: { msg: ChatMessage }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 select-none items-center justify-center rounded-full font-display text-sm font-bold text-night-indigo"
      style={{ background: `linear-gradient(135deg, ${msg.avatarHue}, #e64980)` }}
    >
      {msg.initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Chat bubble                                                         */
/* ------------------------------------------------------------------ */
function Bubble({ msg }: { msg: ChatMessage }) {
  const reduceMotion = useReducedMotion();
  const isRight = msg.side === "right";

  return (
    <motion.li
      variants={reduceMotion ? fadeOnly : bubblePop(msg.side)}
      className={`flex items-end gap-2.5 ${isRight ? "flex-row-reverse" : ""}`}
    >
      <Avatar msg={msg} />
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-card sm:max-w-[70%] ${
          isRight
            ? "rounded-br-sm bg-gradient-to-br from-magenta to-magenta-deep text-cream"
            : "rounded-bl-sm border border-night-edge bg-night-surface text-cream"
        }`}
      >
        {!isRight && (
          <p className="mb-1 text-xs font-semibold" style={{ color: msg.avatarHue }}>
            {msg.name}
          </p>
        )}
        <p className="text-[15px] leading-snug">{msg.text}</p>
        <p className={`mt-1.5 text-right text-[10px] ${isRight ? "text-cream/70" : "text-cream-faint"}`}>
          {msg.time} <span aria-hidden="true">✓✓</span>
        </p>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Video placeholder (TikTok / Reels embeds)                           */
/* ------------------------------------------------------------------ */
function VideoTile({ label, gradient }: { label: string; gradient: string }) {
  return (
    <button
      type="button"
      aria-label={`Play video: ${label}`}
      className="focus-gold group relative aspect-[9/16] w-full overflow-hidden rounded-2xl border border-night-edge shadow-card transition-transform hover:scale-[1.02]"
      style={{ background: gradient }}
    >
      <span className="grain-overlay absolute inset-0" aria-hidden="true" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream/95 text-xl text-night-indigo shadow-glow-gold transition-transform group-hover:scale-110">
          ▶
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-night-indigo/90 to-transparent p-3 text-left">
        <span className="text-xs font-semibold text-cream">{label}</span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Section 5 — Social proof as a group chat                            */
/* ------------------------------------------------------------------ */
export default function GroupChat() {
  return (
    <section className="grain-overlay relative overflow-hidden bg-night-charcoal py-24 sm:py-32">
      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The reviews"
          title={
            <>
              Straight from <span className="text-gold">the group chat.</span>
            </>
          }
          sub="No five-star widgets. Just what the crew actually said the morning after."
        />

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Chat window */}
          <div className="overflow-hidden rounded-3xl border border-night-edge bg-night-indigo shadow-card-lift">
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-night-edge bg-night-surface/80 px-5 py-4">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cta-gradient font-display text-sm font-bold text-night-indigo"
              >
                🎉
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-cream">the plot 🍾 (do not leave)</p>
                <p className="text-xs text-cream-faint">Brayo, Achieng, Nakato, Juma, You +3</p>
              </div>
              <span className="ml-auto text-xs font-medium text-cat-safety">● online</span>
            </div>

            {/* Messages */}
            <motion.ul
              variants={staggerParent(0.22, 0.15)}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="bg-kitenge space-y-4 p-5 sm:p-6"
              aria-label="Player reviews shown as chat messages"
            >
              {CHAT_MESSAGES.map((m) => (
                <Bubble key={m.id} msg={m} />
              ))}
            </motion.ul>
          </div>

          {/* Video embeds */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <VideoTile
                label="POV: someone drew the matatu dare 💀"
                gradient="linear-gradient(160deg, #35205c 0%, #e64980 130%)"
              />
              <VideoTile
                label="Unboxing the Filters Off vault 🔥"
                gradient="linear-gradient(160deg, #1d0f38 0%, #ff7a45 140%)"
              />
            </div>
            <p className="mt-4 text-center text-xs text-cream-faint">
              Tag <span className="font-semibold text-magenta-soft">@partyunfiltered</span> — best
              table of the week gets reposted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
