import { STORAGE_KEYS } from "../config.js";

export function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getProfile() {
  return readJSON(STORAGE_KEYS.profile, {
    id: "player-dave",
    name: "Dave",
    avatar: "assets/avatars/dave.svg",
    status: "online",
  });
}

export function saveProfile(profile) {
  writeJSON(STORAGE_KEYS.profile, profile);
}

export function getSettings() {
  return readJSON(STORAGE_KEYS.settings, {
    scoringEnabled: true,
    reducedMotion: false,
    totalRounds: 10,
  });
}

export function saveSettings(settings) {
  writeJSON(STORAGE_KEYS.settings, { ...getSettings(), ...settings });
}

export function getSession() {
  return readJSON(STORAGE_KEYS.session, null);
}

export function saveSession(session) {
  writeJSON(STORAGE_KEYS.session, session);
  const rooms = readJSON(STORAGE_KEYS.rooms, []);
  const next = rooms.filter((room) => room.roomCode !== session.roomCode);
  next.unshift({
    id: session.id,
    roomCode: session.roomCode,
    mode: session.mode,
    status: session.status === "game_complete" ? "complete" : session.status === "lobby" ? "lobby" : "active",
    players: session.players.length,
    round: session.round,
    totalRounds: session.totalRounds,
    updated: "Just now",
  });
  writeJSON(STORAGE_KEYS.rooms, next.slice(0, 12));
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

export function getRooms() {
  return readJSON(STORAGE_KEYS.rooms, []);
}
