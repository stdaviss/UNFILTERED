import { MODE_WEIGHTS } from "../config.js";
import { CARDS, CARDS_BY_ID } from "../data/cards.js";

export function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function buildPool(modeId, energyOverride) {
  const weights = MODE_WEIGHTS[energyOverride || modeId] || MODE_WEIGHTS.classic;
  const byType = {};
  for (const card of CARDS) {
    (byType[card.type] ||= []).push(card.id);
  }

  if (modeId === "leadership" || energyOverride === "light") {
    byType.dare = CARDS.filter((card) => card.type === "dare" && card.difficulty === "light").map((card) => card.id);
  }

  const pool = [];
  Object.entries(weights).forEach(([type, weight]) => {
    const source = shuffle(byType[type] || []);
    if (!source.length || !weight) return;
    const count = Math.max(1, Math.round((source.length * weight) / 100));
    pool.push(...source.slice(0, Math.min(source.length, count)));
  });

  return shuffle(pool);
}

export function drawCard(session) {
  if (!session.deck.length) {
    session.deck = shuffle(session.discard.splice(0));
  }
  let nextId = session.deck.shift();
  if (nextId === session.lastCardId && session.deck.length) {
    session.deck.push(nextId);
    nextId = session.deck.shift();
  }
  session.currentCardId = nextId;
  session.lastCardId = nextId;
  session.revealed = false;
  return CARDS_BY_ID[nextId];
}

export function discardCurrent(session) {
  if (session.currentCardId) session.discard.push(session.currentCardId);
  session.currentCardId = null;
  session.revealed = false;
}
