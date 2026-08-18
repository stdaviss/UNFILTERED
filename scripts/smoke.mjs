import { CARDS, CARDS_BY_TYPE } from "../js/data/cards.js";
import { createSession, startGame, beginTurn, revealCard, completeTurn, skipCard, pauseGame, resumeGame, endGame, canStart, currentCard } from "../js/engine/game.js";

globalThis.localStorage = {
  store: {},
  getItem(k) { return this.store[k] ?? null; },
  setItem(k, v) { this.store[k] = String(v); },
  removeItem(k) { delete this.store[k]; },
};

const counts = Object.fromEntries(Object.entries(CARDS_BY_TYPE).map(([k, v]) => [k, v.length]));
if (CARDS.length !== 155) throw new Error(`expected 155 cards, got ${CARDS.length}`);
if (counts.truth !== 50 || counts.dare !== 50 || counts.scenario !== 25 || counts.archetype !== 20 || counts.safety !== 10) {
  throw new Error(`unexpected counts ${JSON.stringify(counts)}`);
}

let session = createSession({ mode: "classic", roomCode: "OU-4827", hostName: "Dave" });
if (session.roomCode !== "OU-4827") throw new Error("room code");
if (!canStart(session)) throw new Error("should start with 4 ready sample players");

session = startGame(session);
session = beginTurn(session);
if (!session.currentCardId) throw new Error("no card drawn");
session = revealCard(session);
if (!currentCard(session)) throw new Error("reveal");
session = completeTurn(session);
if (session.round < 1) throw new Error("round");

session = skipCard(session);
if (session.status !== "player_turn") throw new Error("skip should draw replacement");

session = pauseGame(session);
if (session.status !== "paused") throw new Error("pause");
session = resumeGame(session);
session = endGame(session);
if (session.status !== "game_complete") throw new Error("end");

console.log("smoke ok", { cards: CARDS.length, counts, room: session.roomCode, played: session.cardsPlayed });
