# Party Unfiltered™ — East Africa Edition · Landing Site

High-converting, dark-mode e-commerce landing page. Modern Afro-Urban / premium sherehe aesthetic. Mobile-first, 18+.

**Stack:** Next.js 14 (App Router, fully static prerender) · Tailwind CSS (theme in `tailwind.config.ts`) · Framer Motion · TypeScript.

## Run it

```bash
cd site
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
```

Set `NEXT_PUBLIC_CHECKOUT_URL` to a Stripe Payment Link or Shopify checkout URL to wire up every Buy button (falls back to the newsletter section when unset).

## Component architecture

```
app/
  layout.tsx            Fonts (Clash Display + General Sans via Fontshare), metadata, OG tags
  page.tsx              Section composition (server component)
  globals.css           Theme vars, kitenge pattern, film grain, 3D flip utilities, reduced-motion
components/
  AgeGate.tsx           18+ modal — cookie-gated, client-only mount so crawlers index the full page
  Nav.tsx               Fixed glass nav (server component, zero JS of its own)
  BuyButton.tsx         Gold-gradient CTA (plain anchor — works pre-hydration)
  Hero.tsx              Headline + CSS-only 3D isometric box + 3 floating heat cards
  NightFlow.tsx         §2 "How the Night Unfolds" — 3-step party timeline
  CardCarousel.tsx      §3 Snap-scroll carousel, 6 flip cards (hover + tap + keyboard)
  HeatSystem.tsx        §4 Thermometer infographic, bars fill on scroll
  GroupChat.tsx         §5 Reviews as a WhatsApp-style chat + video placeholders
  InTheBox.tsx          §6 CSS flat-lay illustration + contents list
  Faq.tsx               §7 Accessible accordion (aria-expanded, spring height)
  Footer.tsx            Guest List signup, socials, DPA compliance notice
  StickyBuyBar.tsx      Mobile thumb-zone CTA, appears after hero scrolls away
lib/
  data.ts               All copy/content data (categories, samples, chat, FAQ, pricing)
  motion.ts             Shared spring transitions + variants (single motion language)
```

## Animation strategy

- **Springs everywhere, two presets** (`lib/motion.ts`): `springSoft` for reveals, `springSnappy` for micro-interactions. No linear easings.
- **Card flip:** pure CSS 3D (`perspective` + `rotateY` + `backface-visibility`) triggered by `:hover`, `:focus-visible`, and a `data-flipped` attribute toggled on tap — so it works for mouse, keyboard, and touch. Framer Motion only staggers the cards *into* view; the flip itself never touches JS layout.
- **Group chat:** a `staggerChildren` parent with a per-bubble `bubblePop` variant (y/x/scale spring keyed to bubble side), fired once via `whileInView` + `viewport={{ once: true }}` so messages "arrive" like a live chat, then the listeners disconnect.
- **Reduced motion:** every animated component calls `useReducedMotion()` and swaps to opacity-only variants; CSS animations are killed globally in `globals.css`.

## Performance & a11y notes

- Fully static output; first-load JS ≈ 137 kB (Framer Motion included). No images at all — box, flat-lay, textures and grain are CSS/inline-SVG, so LCP is the hero headline text.
- Age gate renders client-side over server-rendered content: crawlers see the whole page.
- WCAG 2.1 AA: semantic landmarks, labelled carousel region, keyboard-flippable cards, `aria-expanded` accordion, focus-visible gold rings, AA-contrast text tokens (`cream`, `cream-dim`).
