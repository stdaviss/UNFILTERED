import { CHECKOUT_URL } from "@/lib/data";

interface Props {
  size?: "md" | "lg";
  className?: string;
  label?: string;
}

/**
 * The primary conversion CTA. Gold gradient, glowing hover.
 * Rendered as a plain anchor so it works before JS hydrates.
 */
export default function BuyButton({ size = "lg", className = "", label = "Buy the Deck" }: Props) {
  const sizing =
    size === "lg"
      ? "px-9 py-4 text-lg"
      : "px-6 py-3 text-base";

  return (
    <a
      href={CHECKOUT_URL}
      className={`focus-gold inline-flex items-center justify-center gap-2 rounded-full bg-cta-gradient font-display font-semibold text-night-indigo shadow-glow-gold transition-all duration-200 hover:scale-[1.04] hover:shadow-glow-gold-lg active:scale-[0.98] ${sizing} ${className}`}
    >
      {label}
      <span aria-hidden="true">→</span>
    </a>
  );
}
