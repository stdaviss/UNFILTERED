import { GAME_DEFAULTS } from "../config.js";
import { SAMPLE_PLAYERS, MODES } from "../data/content.js";
import { CARDS_BY_ID } from "../data/cards.js";
import { getProfile, getSettings, getSession, saveSession } from "./storage.js";
import { buildPool, discardCurrent, drawCard } from "./deck.js";

function uid(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function pinFeatured(deck) {
  const featured = "truth-001";
  return [featured, ...deck.filter((id) => id !== featured)];
}

export function generateRoomCode() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `OU-${n}`;
}

function clonePlayers(customName) {
  const profile = getProfile();
  return SAMPLE_PLAYERS.map((player) => ({
    ...player,
    name: player.isYou ? (customName || profile.name) : player.name,
    avatar: player.isYou ? profile.avatar : player.avatar,
    score: 0,
    status: "ready",
  }));
}

export function createSession({ mode = "classic", totalRounds, roomCode, hostName } = {}) {
  const settings = getSettings();
  const players = clonePlayers(hostName);
  if (mode === "team") {
    players.forEach((player, i) => {
      player.team = i % 2 === 0 ? "A" : "B";
    });
  }
  const session = {
    id: uid("room"),
    roomCode: roomCode || generateRoomCode(),
    mode,
    status: "lobby",
    round: 0,
    totalRounds: totalRounds || settings.totalRounds || GAME_DEFAULTS.totalRounds,
    players,
    currentPlayerIndex: 0,
    currentCardId: null,
    lastCardId: null,
    revealed: false,
    deck: pinFeatured(buildPool(mode)),
    discard: [],
    events: [],
    scoringEnabled: settings.scoringEnabled !== false,
    archetypeActive: null,
    energyOverride: null,
    energyTurnsLeft: 0,
    skippedCount: 0,
    cardsPlayed: 0,
    createdAt: Date.now(),
    pausedBy: null,
    closingPrompt: "One word for how that felt.",
  };
  pushEvent(session, "room created", players[0]);
  saveSession(session);
  return session;
}

export function joinSession(roomCode, displayName) {
  const current = getSession();
  const code = (roomCode || "OU-4827").toUpperCase();
  if (current && current.roomCode === code) {
    if (displayName) {
      const you = current.players.find((p) => p.isYou);
      if (you) you.name = displayName;
      saveSession(current);
    }
    return current;
  }
  const existing = createSession({
    roomCode: code,
    mode: "classic",
    hostName: displayName,
  });
  pushEvent(existing, `${displayName || "A player"} joined the game`, existing.players[0]);
  saveSession(existing);
  return existing;
}

export function addLocalPlayer(session, name) {
  if (session.players.length >= GAME_DEFAULTS.absoluteMax) return session;
  const player = {
    id: uid("player"),
    name: name || `Player ${session.players.length + 1}`,
    avatar: "assets/avatars/guest.svg",
    isHost: false,
    isYou: false,
    status: "ready",
    score: 0,
    team: session.mode === "team" ? (session.players.length % 2 === 0 ? "A" : "B") : null,
  };
  session.players.push(player);
  pushEvent(session, `${player.name} joined the game`, player);
  saveSession(session);
  return session;
}

export function toggleReady(session, playerId) {
  const player = session.players.find((p) => p.id === playerId);
  if (!player) return session;
  player.status = player.status === "ready" ? "waiting" : "ready";
  pushEvent(session, `${player.name} is ${player.status}`, player);
  saveSession(session);
  return session;
}

export function canStart(session) {
  const ready = session.players.filter((p) => p.status === "ready").length;
  const min = MODES[session.mode]?.minPlayers || GAME_DEFAULTS.minPlayers;
  return ready >= min && session.status === "lobby";
}

export function startGame(session) {
  session.status = "starting";
  session.round = 1;
  session.currentPlayerIndex = 0;
  pushEvent(session, `${hostName(session)} started the game`, session.players[0]);
  saveSession(session);
  return session;
}

export function beginTurn(session) {
  session.status = "player_turn";
  session.revealed = false;
  if (session.energyTurnsLeft > 0) session.energyTurnsLeft -= 1;
  if (session.energyTurnsLeft <= 0) session.energyOverride = null;
  drawCard(session);
  pushEvent(session, `Round ${session.round} — ${currentPlayer(session).name}'s turn`, currentPlayer(session), "PLAYER_CHANGED");
  saveSession(session);
  return session;
}

export function revealCard(session) {
  session.status = "card_revealed";
  session.revealed = true;
  const card = currentCard(session);
  if (card?.type === "archetype") {
    session.archetypeActive = { title: card.title, playerId: currentPlayer(session).id };
  }
  pushEvent(session, `${card?.type || "card"} revealed`, currentPlayer(session), "CARD_REVEALED");
  saveSession(session);
  return session;
}

export function completeTurn(session) {
  const card = currentCard(session);
  if (session.scoringEnabled && card && card.type !== "safety") {
    currentPlayer(session).score += 1;
  }
  session.cardsPlayed += 1;
  const halt = card?.type === "safety" ? applySafetyCard(session, card) : false;
  if (halt || session.status === "paused" || session.status === "game_complete") {
    saveSession(session);
    return session;
  }
  discardCurrent(session);
  advancePlayer(session);
  if (session.round > session.totalRounds) {
    return endGame(session);
  }
  return beginTurn(session);
}

export function skipCard(session, reason = "Card skipped.") {
  session.skippedCount += 1;
  discardCurrent(session);
  pushEvent(session, reason, currentPlayer(session), "CARD_SKIPPED");
  drawCard(session);
  session.status = "player_turn";
  session.revealed = false;
  saveSession(session);
  return session;
}

export function replaceCard(session) {
  return skipCard(session, "Card replaced.");
}

export function pauseGame(session) {
  session.status = "paused";
  session.pausedBy = currentPlayer(session)?.name;
  pushEvent(session, "Game paused", currentPlayer(session), "GAME_PAUSED");
  saveSession(session);
  return session;
}

export function resumeGame(session) {
  session.status = session.revealed ? "card_revealed" : "player_turn";
  session.pausedBy = null;
  pushEvent(session, "Game resumed", currentPlayer(session), "GAME_RESUMED");
  saveSession(session);
  return session;
}

export function endGame(session) {
  session.status = "game_complete";
  pushEvent(session, "That's a wrap.", currentPlayer(session), "GAME_ENDED");
  saveSession(session);
  return session;
}

export function lowerEnergy(session) {
  session.energyOverride = "light";
  session.energyTurnsLeft = 5;
  session.deck = buildPool(session.mode, "light").concat(session.deck);
  pushEvent(session, "Energy lowered for the next few turns", currentPlayer(session));
  saveSession(session);
  return session;
}

function applySafetyCard(session, card) {
  switch (card.safetyAction) {
    case "pause":
      pauseGame(session);
      return true;
    case "lower-energy":
      lowerEnergy(session);
      return false;
    case "end":
      endGame(session);
      return true;
    case "skip":
    case "replace":
      skipCard(session);
      return true;
    default:
      return false;
  }
}

function advancePlayer(session) {
  session.currentPlayerIndex = (session.currentPlayerIndex + 1) % session.players.length;
  if (session.currentPlayerIndex === 0) session.round += 1;
}

export function currentPlayer(session) {
  return session.players[session.currentPlayerIndex];
}

export function currentCard(session) {
  return session.currentCardId ? CARDS_BY_ID[session.currentCardId] : null;
}

export function playAgain(session) {
  return createSession({
    mode: session.mode,
    totalRounds: session.totalRounds,
    hostName: session.players.find((p) => p.isYou)?.name,
  });
}

function hostName(session) {
  return session.players.find((p) => p.isHost)?.name || "Host";
}

export function pushEvent(session, text, player, type = "INFO") {
  session.events.unshift({
    id: uid("evt"),
    text,
    playerId: player?.id || null,
    avatar: player?.avatar || "assets/avatars/guest.svg",
    type,
    at: Date.now(),
  });
  session.events = session.events.slice(0, 24);
}

export function timeAgo(ts) {
  const s = Math.max(1, Math.round((Date.now() - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return `${h} hr ago`;
}

export function awards(session) {
  const ranked = [...session.players].sort((a, b) => b.score - a.score);
  return [
    { label: "Most Unfiltered", player: ranked[0] },
    { label: "Best Energy", player: ranked[1] || ranked[0] },
    { label: "Biggest Plot Twist", player: ranked[2] || ranked[0] },
    { label: "Quiet MVP", player: ranked[ranked.length - 1] },
  ];
}
