export const MODES = {
  classic: {
    id: "classic",
    name: "Classic Mode",
    short: "Classic",
    description: "Mix of Truth, Dare and Scenario cards.",
    detail: "The default social mode. Truth, Dare, Scenario, Archetype, and Safety — shuffled at the start of the session.",
    players: "3–15 Players",
    minPlayers: 3,
    color: "#3BAAF0",
    icon: "assets/icons/question.svg",
    locked: false,
    weightsKey: "classic",
  },
  team: {
    id: "team",
    name: "Team Mode",
    short: "Team",
    description: "Play in teams and earn points together.",
    detail: "Same card mix as Classic, scored as two playful teams rather than individuals.",
    players: "4+ Players",
    minPlayers: 4,
    color: "#9EE493",
    icon: "assets/icons/users.svg",
    locked: false,
    weightsKey: "team",
  },
  leadership: {
    id: "leadership",
    name: "Leadership Mode",
    short: "Leadership",
    description: "Deep questions for leaders and managers.",
    detail: "Light energy. Weighted toward Truth and Scenario — built for mixed seniority and formal rooms.",
    players: "3–12 Players",
    minPlayers: 3,
    color: "#F5B83D",
    icon: "assets/icons/crown.svg",
    locked: false,
    weightsKey: "leadership",
  },
  "after-hours": {
    id: "after-hours",
    name: "After Hours",
    short: "After Hours",
    description: "Fun, wild and unpredictable.",
    detail: "High-energy mode with more Dares and Archetypes. Requires group agreement before you start.",
    players: "3–15 Players",
    minPlayers: 3,
    color: "#9B6BDE",
    icon: "assets/icons/party.svg",
    locked: false,
    weightsKey: "after-hours",
    requiresAgreement: true,
  },
  extreme: {
    id: "extreme",
    name: "Unfiltered Extreme",
    short: "Extreme",
    description: "Only for the bold. Higher intensity.",
    detail: "Locked for this MVP. Highest Dare and Archetype weighting — still never humiliating, still skippable.",
    players: "4+ Players",
    minPlayers: 4,
    color: "#E96A4C",
    icon: "assets/icons/flame.svg",
    locked: true,
    weightsKey: "extreme",
  },
};

export const MODE_LIST = Object.values(MODES);

export const SAMPLE_PLAYERS = [
  { id: "player-dave", name: "Dave", avatar: "assets/avatars/dave.svg", isHost: true, isYou: true, status: "ready", score: 0, team: "A" },
  { id: "player-sarah", name: "Sarah", avatar: "assets/avatars/sarah.svg", isHost: false, isYou: false, status: "ready", score: 0, team: "B" },
  { id: "player-michael", name: "Michael", avatar: "assets/avatars/michael.svg", isHost: false, isYou: false, status: "ready", score: 0, team: "A" },
  { id: "player-jessica", name: "Jessica", avatar: "assets/avatars/jessica.svg", isHost: false, isYou: false, status: "ready", score: 0, team: "B" },
];

export const SAMPLE_GAMES = [
  { id: "g1", roomCode: "OU-4827", mode: "classic", status: "active", players: 4, round: 3, totalRounds: 10, updated: "Playing now" },
  { id: "g2", roomCode: "OU-1192", mode: "leadership", status: "lobby", players: 5, round: 0, totalRounds: 10, updated: "Waiting in lobby" },
  { id: "g3", roomCode: "OU-7740", mode: "after-hours", status: "complete", players: 6, round: 10, totalRounds: 10, updated: "Yesterday" },
];

export const SAMPLE_LEADERBOARD = [
  { rank: 1, name: "Sarah", avatar: "assets/avatars/sarah.svg", label: "Most Unfiltered", points: 42, games: 11 },
  { rank: 2, name: "Michael", avatar: "assets/avatars/michael.svg", label: "Best Energy", points: 37, games: 9 },
  { rank: 3, name: "Jessica", avatar: "assets/avatars/jessica.svg", label: "Biggest Plot Twist", points: 33, games: 10 },
  { rank: 4, name: "Dave", avatar: "assets/avatars/dave.svg", label: "Quiet MVP", points: 28, games: 12 },
];

export const SAFETY_OPTIONS = [
  { id: "skip", label: "Skip", hint: "Draw a replacement. No explanation." },
  { id: "replace", label: "Replace Card", hint: "Same turn, different card." },
  { id: "reframe", label: "Reframe", hint: "Answer as a team, or hypothetically." },
  { id: "group", label: "Group Response", hint: "Everyone answers together." },
  { id: "pause", label: "Pause", hint: "Freeze the round until the host resumes." },
  { id: "lower-energy", label: "Lower Energy", hint: "Truth + Scenario only for a few turns." },
  { id: "end", label: "End Game", hint: "That's a wrap — no one is evaluated." },
];
