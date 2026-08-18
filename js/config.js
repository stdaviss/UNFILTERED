/**
 * Office Unfiltered — swap-friendly configuration.
 *
 * To replace art: drop a new file in /assets and update the path here,
 * or set a card's `art` field in js/data/cards.js.
 * Character SVGs are referenced by key so an entire cast member can be
 * replaced without touching gameplay code.
 */

export const BRAND = {
  name: "Office Unfiltered",
  tagline: "REAL PEOPLE. REAL ANSWERS.",
  subTagline: "The card game that makes workplace conversations unforgettable.",
};

export const COLORS = {
  background: "#0B0D0C",
  surface: "#111512",
  panel: "#151A17",
  green: "#9EE493",
  green2: "#76E0A1",
  truth: "#3BAAF0",
  dare: "#F5B83D",
  scenario: "#E96A4C",
  archetype: "#9B6BDE",
  safety: "#39B7A5",
};

export const CATEGORY_META = {
  truth: {
    label: "TRUTH",
    color: COLORS.truth,
    icon: "assets/icons/truth.svg",
    prompt: "Answer the question.",
  },
  dare: {
    label: "DARE",
    color: COLORS.dare,
    icon: "assets/icons/dare.svg",
    prompt: "Perform the task — or skip, no explanation needed.",
  },
  scenario: {
    label: "SCENARIO",
    color: COLORS.scenario,
    icon: "assets/icons/scenario.svg",
    prompt: "Discuss. There is no single correct answer.",
  },
  archetype: {
    label: "ARCHETYPE",
    color: COLORS.archetype,
    icon: "assets/icons/archetype.svg",
    prompt: "Use this perspective for the next response.",
  },
  safety: {
    label: "SAFETY",
    color: COLORS.safety,
    icon: "assets/icons/safety.svg",
    prompt: "This card changes how the next moment works.",
  },
};

/** File paths for every swappable graphic. */
export const ASSETS = {
  background: "assets/backgrounds/office.svg",
  logo: "assets/brand/logo.svg",
  box: "assets/brand/game-box.svg",
  cardBack: "assets/cards/back.svg",
  safetyStop: "assets/cards/safety-stop.svg",
  pattern: "assets/cards/workplace-pattern.svg",
  characters: {
    nova: "assets/characters/nova.svg",
    atlas: "assets/characters/atlas.svg",
    echo: "assets/characters/echo.svg",
    spark: "assets/characters/spark.svg",
    pulse: "assets/characters/pulse.svg",
    zen: "assets/characters/zen.svg",
    logic: "assets/characters/logic.svg",
    link: "assets/characters/link.svg",
    bold: "assets/characters/bold.svg",
    rise: "assets/characters/rise.svg",
    safety: "assets/cards/safety-stop.svg",
  },
  avatars: {
    dave: "assets/avatars/dave.svg",
    sarah: "assets/avatars/sarah.svg",
    michael: "assets/avatars/michael.svg",
    jessica: "assets/avatars/jessica.svg",
    guest: "assets/avatars/guest.svg",
  },
  icons: {
    users: "assets/icons/users.svg",
    join: "assets/icons/join.svg",
    shield: "assets/icons/shield.svg",
    lock: "assets/icons/lock.svg",
    trophy: "assets/icons/trophy.svg",
    gear: "assets/icons/gear.svg",
    copy: "assets/icons/copy.svg",
    crown: "assets/icons/crown.svg",
    flame: "assets/icons/flame.svg",
    party: "assets/icons/party.svg",
    question: "assets/icons/question.svg",
  },
};

/**
 * Example Classic weighting from the gameplay spec.
 * Values are relative weights, not required to sum to 100.
 */
export const MODE_WEIGHTS = {
  classic: { truth: 35, dare: 30, scenario: 20, archetype: 10, safety: 5 },
  light: { truth: 45, dare: 10, scenario: 35, archetype: 5, safety: 5 },
  leadership: { truth: 50, dare: 5, scenario: 35, archetype: 5, safety: 5 },
  team: { truth: 35, dare: 30, scenario: 20, archetype: 10, safety: 5 },
  "after-hours": { truth: 20, dare: 40, scenario: 15, archetype: 20, safety: 5 },
  extreme: { truth: 15, dare: 45, scenario: 10, archetype: 25, safety: 5 },
};

export const GAME_DEFAULTS = {
  minPlayers: 3,
  preferredPlayers: 4,
  maxPlayers: 8,
  absoluteMax: 10,
  totalRounds: 10,
  scoringEnabled: true,
};

export const STORAGE_KEYS = {
  profile: "ou.profile",
  session: "ou.session",
  rooms: "ou.rooms",
  settings: "ou.settings",
};

export const CURRENT_USER_ID = "player-dave";
