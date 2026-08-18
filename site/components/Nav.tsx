import BuyButton from "./BuyButton";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-night-indigo/70 backdrop-blur-lg">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#top" className="focus-gold flex items-baseline gap-1.5">
          <span className="font-display text-lg font-bold tracking-tight text-cream">
            PARTY UNFILTERED<span className="text-gold">™</span>
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.25em] text-cream-faint sm:inline">
            East Africa
          </span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-medium text-cream-dim md:flex">
          <a href="#how-it-plays" className="focus-gold transition-colors hover:text-cream">
            How it plays
          </a>
          <a href="#the-cards" className="focus-gold transition-colors hover:text-cream">
            The cards
          </a>
          <a href="#heat" className="focus-gold transition-colors hover:text-cream">
            Heat system
          </a>
          <a href="#in-the-box" className="focus-gold transition-colors hover:text-cream">
            In the box
          </a>
        </div>

        <BuyButton size="md" label="Buy Now" />
      </nav>
    </header>
  );
}
