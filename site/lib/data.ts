/**
 * All site copy and content data lives here so sections stay presentational.
 */

export type HeatLevel = 1 | 2 | 3;

export const HEAT = {
  1: { peppers: "\u{1F336}", label: "Mild" },
  2: { peppers: "\u{1F336}\u{1F336}", label: "Medium" },
  3: { peppers: "\u{1F336}\u{1F336}\u{1F336}", label: "Hot" },
} as const;

/* ------------------------------------------------------------------ */
/* Card categories — Section 3 carousel                                */
/* ------------------------------------------------------------------ */
export interface CardCategory {
  id: string;
  label: string;
  count: string;
  color: string; // tailwind cat.* hex
  tagline: string;
  sample: string;
  sampleHeat: HeatLevel;
  locked?: boolean;
}

export const CATEGORIES: CardCategory[] = [
  {
    id: "truth",
    label: "TRUTH",
    count: "50 cards",
    color: "#ffd23f",
    tagline: "Spill the tea. Gently.",
    sample:
      "What's the biggest \u201Cplot\u201D you ever committed to that flopped by 9pm? Give us the full story.",
    sampleHeat: 1,
  },
  {
    id: "dare",
    label: "DARE",
    count: "50 cards",
    color: "#f272a1",
    tagline: "Act it out. No shame.",
    sample:
      "Act like you're a matatu tout pulling in customers at rush hour. The table rates your hustle out of 10.",
    sampleHeat: 2,
  },
  {
    id: "scenario",
    label: "SCENARIO",
    count: "25 cards",
    color: "#e64980",
    tagline: "What would the crew do?",
    sample:
      "It's 2am, the DJ's power just cut, and someone suggests a road trip to Naivasha \u201Cright now.\u201D As a table, decide in 30 seconds: kesha or home?",
    sampleHeat: 2,
  },
  {
    id: "archetype",
    label: "ARCHETYPE",
    count: "20 cards",
    color: "#9b6df2",
    tagline: "Become the character.",
    sample:
      "For the next 3 rounds you are \u201CThe Aunty Who Knows Everyone.\u201D Greet every player like you attended their christening.",
    sampleHeat: 1,
  },
  {
    id: "safety",
    label: "SAFETY",
    count: "10 cards",
    color: "#2dd4bf",
    tagline: "Skip is a feature.",
    sample:
      "Breathe. Skip any card, swap any player, or drop the heat one level. No explanations. No questions. That's the rule.",
    sampleHeat: 1,
  },
  {
    id: "filtersoff",
    label: "FILTERS OFF",
    count: "15 cards",
    color: "#f43f5e",
    tagline: "Locked until the whole table says yes.",
    sample:
      "\u{1F512} Sealed. These 15 foil-edged cards only leave the vault when every single player consents. Re-lock them anytime, mid-game, no debate.",
    sampleHeat: 3,
    locked: true,
  },
];

/* ------------------------------------------------------------------ */
/* Section 2 — How the Night Unfolds                                   */
/* ------------------------------------------------------------------ */
export interface NightStep {
  step: string;
  title: string;
  body: string;
  detail: { icon: string; label: string; note: string }[];
}

export const NIGHT_STEPS: NightStep[] = [
  {
    step: "01",
    title: "Set the Vibe",
    body: "Every table picks its heat before the first card is drawn. You control the thermostat all night.",
    detail: [
      { icon: "\u{1F7E2}", label: "Warm-Up", note: "Chill. Coworker-safe. Soda-friendly." },
      { icon: "\u{1F7E1}", label: "Sherehe", note: "The default. Loud, funny, unfiltered-ish." },
      { icon: "\u{1F534}", label: "After-Hours", note: "Max heat. Grown folks only." },
    ],
  },
  {
    step: "02",
    title: "Draw & Deliver",
    body: "Pull a Truth, Dare, Scenario, or Archetype. Read it loud. Answer it, act it out, or become the character. The table is your audience.",
    detail: [
      { icon: "\u2728", label: "170 cards", note: "155 core + 15 locked spicy cards." },
      { icon: "\u{1F3AD}", label: "Zero trauma-mining", note: "Recognition and comedy, not confession." },
      { icon: "\u23ED\uFE0F", label: "Skip freely", note: "Skipping is a feature, never a failure." },
    ],
  },
  {
    step: "03",
    title: "The \u201CFilters Off\u201D Pack",
    body: "15 spicy cards sealed in their own vault. They only come out if the whole table \u2014 every single person \u2014 says yes. Anyone can re-lock them at any time. No debate, no side-eye.",
    detail: [
      { icon: "\u{1F512}", label: "Unanimous unlock", note: "One \u201Cno\u201D keeps the vault shut." },
      { icon: "\u{1F510}", label: "Re-lock anytime", note: "Mid-round, mid-card, whenever." },
      { icon: "\u{1F336}\u{1F336}\u{1F336}", label: "Max heat only", note: "Every card is tagged and telegraphed." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Section 5 — Group chat reviews                                      */
/* ------------------------------------------------------------------ */
export interface ChatMessage {
  id: number;
  name: string;
  initials: string;
  avatarHue: string; // gradient start color
  text: string;
  time: string;
  side: "left" | "right";
}

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    name: "Brayo \u{1F1F0}\u{1F1EA}",
    initials: "B",
    avatarHue: "#ff7a45",
    text: "Bro the Filters Off pack almost ruined my friendship \u{1F602}\u{1F525}",
    time: "11:42 PM",
    side: "left",
  },
  {
    id: 2,
    name: "Achieng",
    initials: "A",
    avatarHue: "#e64980",
    text: "Played it at my Airbnb in Diani. Best night ever. We didn't even touch our phones till 3am.",
    time: "11:44 PM",
    side: "left",
  },
  {
    id: 3,
    name: "You",
    initials: "Y",
    avatarHue: "#ffd23f",
    text: "Finally a game that doesn't force us to talk about our childhood trauma \u{1F64F}",
    time: "11:45 PM",
    side: "right",
  },
  {
    id: 4,
    name: "Nakato \u{1F1FA}\u{1F1EC}",
    initials: "N",
    avatarHue: "#9b6df2",
    text: "The matatu tout dare?? My guy stood on a CHAIR. Landlord texted us \u{1F480}",
    time: "11:47 PM",
    side: "left",
  },
  {
    id: 5,
    name: "Juma \u{1F1F9}\u{1F1FF}",
    initials: "J",
    avatarHue: "#2dd4bf",
    text: "Respect for the Safety card. My quiet friends actually played instead of hiding in the kitchen.",
    time: "11:51 PM",
    side: "left",
  },
  {
    id: 6,
    name: "You",
    initials: "Y",
    avatarHue: "#ffd23f",
    text: "Ordering a second deck for the mubs trip. It's decided \u{1F336}\u{1F336}\u{1F336}",
    time: "11:52 PM",
    side: "right",
  },
];

/* ------------------------------------------------------------------ */
/* Section 6 — What's in the box                                       */
/* ------------------------------------------------------------------ */
export const BOX_CONTENTS = [
  {
    icon: "\u{1F4E6}",
    title: "1\u00D7 Premium Rigid Box",
    note: "Magnetic closure. Heavy in the hand. Looks expensive on the shelf because it is.",
  },
  {
    icon: "\u{1F0CF}",
    title: "155 Core Cards",
    note: "Linen finish. Truth, Dare, Scenario, Archetype & Safety \u2014 every card heat-tagged.",
  },
  {
    icon: "\u{1F525}",
    title: "15 Filters Off Cards",
    note: "Foil-stamped edges, sealed in their own vault sleeve. Unanimous consent to open.",
  },
  {
    icon: "\u{1F4D5}",
    title: "1\u00D7 Host Guide",
    note: "How to run the night, read the room, and keep everyone safe without killing the vibe.",
  },
  {
    icon: "\u{1FAF6}",
    title: "1\u00D7 \u201CBreathe\u201D Token",
    note: "Physical acrylic token. Place it on the table and the heat drops. No explanations needed.",
  },
];

/* ------------------------------------------------------------------ */
/* Section 7 — FAQ                                                     */
/* ------------------------------------------------------------------ */
export const FAQS = [
  {
    q: "Do we need to drink to play?",
    a: "No. Soda is valid. Chai is valid. The game runs on the cards and the crew, not the bar tab \u2014 alcohol is an optional side quest, never a mechanic.",
  },
  {
    q: "Is this safe for my coworkers?",
    a: "Stick to \u{1F7E2} Warm-Up mode and keep the Filters Off vault locked, and yes \u2014 it plays like a very funny team bonding session. Save \u{1F534} After-Hours for people who've seen you dance.",
  },
  {
    q: "What if someone gets a card they don't want?",
    a: "They skip it. That's it. Skipping is built into the rules as a first-class move \u2014 no explanations, no penalties, no \u201Ccome onnn.\u201D Safety cards and the Breathe token exist so nobody has to argue for their own comfort.",
  },
  {
    q: "How does the Filters Off pack actually unlock?",
    a: "The 15 spicy cards ship sealed. Before they touch the table, every single player must say yes \u2014 one \u201Cno\u201D (or one silence) keeps them locked, and anyone can re-lock them at any point in the night. Consent is the mechanic.",
  },
  {
    q: "How many people can play?",
    a: "Best from 4 to 10 players, 18+. Bigger sherehe? Split into two tables and swap decks at midnight.",
  },
  {
    q: "Where do you ship?",
    a: "Kenya, Uganda, Tanzania and Rwanda with local-rate delivery \u2014 plus worldwide shipping for the diaspora. Duties shown at checkout, no surprises.",
  },
];

/* ------------------------------------------------------------------ */
/* Commerce                                                            */
/* ------------------------------------------------------------------ */
export const PRICE_DISPLAY = "KES 4,500";
export const PRICE_SUB = "\u2248 $34 \u00B7 ships from Nairobi";

/**
 * Point this at a Stripe Payment Link or Shopify checkout URL via env.
 * Falls back to the waitlist section when unset.
 */
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "#join-guest-list";
