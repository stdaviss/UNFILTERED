import type { Config } from "tailwindcss";

/**
 * PARTY UNFILTERED™ — East Africa Edition
 * Design system: Modern Afro-Urban / Premium Sherehe Culture
 * Dark-mode-first. Neon accents against deep plum nights.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds — the night itself
        night: {
          plum: "#1d0f38", // primary section background
          indigo: "#120b26", // deepest background / page base
          charcoal: "#171321", // alternating sections
          surface: "#271745", // raised cards / modals
          edge: "#3a2563", // hairline borders on dark surfaces
        },
        // Accents — the neon signs
        sunset: {
          DEFAULT: "#ff7a45",
          soft: "#ff9a6e",
          deep: "#e05a26",
        },
        magenta: {
          DEFAULT: "#e64980",
          soft: "#f272a1",
          deep: "#c22a61",
        },
        gold: {
          DEFAULT: "#ffd23f",
          soft: "#ffe07a",
          deep: "#e6b41a",
        },
        // Category color bands
        cat: {
          truth: "#ffd23f", // Gold
          dare: "#f272a1", // Pink
          scenario: "#e64980", // Magenta
          archetype: "#9b6df2", // Purple
          safety: "#2dd4bf", // Teal
          filtersoff: "#f43f5e", // Red
        },
        // Text
        cream: {
          DEFAULT: "#fdf3ff",
          dim: "#cbb8dc", // secondary text, still AA on night.plum
          faint: "#9d87b8", // captions on dark
        },
      },
      fontFamily: {
        display: ["'Clash Display'", "system-ui", "sans-serif"],
        sans: ["'General Sans'", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero-sm": ["2.5rem", { lineHeight: "1.02", letterSpacing: "-0.01em" }],
        hero: ["4.25rem", { lineHeight: "0.98", letterSpacing: "-0.015em" }],
        "hero-lg": ["5.5rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
      },
      boxShadow: {
        "glow-gold": "0 0 24px 2px rgba(255, 210, 63, 0.35), 0 0 64px 8px rgba(255, 210, 63, 0.12)",
        "glow-gold-lg": "0 0 32px 4px rgba(255, 210, 63, 0.5), 0 0 96px 16px rgba(255, 210, 63, 0.2)",
        "glow-magenta": "0 0 24px 2px rgba(230, 73, 128, 0.35), 0 0 64px 8px rgba(230, 73, 128, 0.12)",
        "glow-sunset": "0 0 24px 2px rgba(255, 122, 69, 0.35), 0 0 64px 8px rgba(255, 122, 69, 0.12)",
        card: "0 12px 32px -8px rgba(0, 0, 0, 0.55)",
        "card-lift": "0 24px 48px -12px rgba(0, 0, 0, 0.65)",
      },
      backgroundImage: {
        // Radial "club light" washes for hero + section headers
        "hero-glow":
          "radial-gradient(ellipse 80% 55% at 50% -12%, rgba(230,73,128,0.28), transparent 60%), radial-gradient(ellipse 60% 45% at 82% 18%, rgba(255,122,69,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 12% 30%, rgba(155,109,242,0.16), transparent 60%)",
        "cta-gradient": "linear-gradient(100deg, #ffd23f 0%, #ff7a45 55%, #e64980 120%)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tilt, 0deg))" },
          "50%": { transform: "translateY(-14px) rotate(var(--tilt, 0deg))" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(-2%, 2%)" },
          "40%": { transform: "translate(2%, -1%)" },
          "60%": { transform: "translate(-1%, -2%)" },
          "80%": { transform: "translate(1%, 2%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-slower": "float-slow 8s ease-in-out 1s infinite",
        "float-slowest": "float-slow 10s ease-in-out 2s infinite",
        "pulse-glow": "pulse-glow 3.5s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
