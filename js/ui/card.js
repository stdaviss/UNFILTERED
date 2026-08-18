import { ASSETS, CATEGORY_META } from "../config.js";
import { ART_OVERRIDES } from "../data/art-overrides.js";

export function cardArt(card) {
  if (!card) return ASSETS.cardBack;
  if (ART_OVERRIDES[card.id]) return ART_OVERRIDES[card.id];
  if (card.type === "safety") return ASSETS.safetyStop;
  return card.art || ASSETS.characters[card.character] || ASSETS.characters.nova;
}

export function renderGameCard(card, { revealed = true } = {}) {
  if (!revealed || !card) {
    return `
      <article class="game-card" aria-label="Facedown card">
        <div class="card-face back">
          <img src="${ASSETS.cardBack}" alt="Office Unfiltered card back">
        </div>
      </article>`;
  }

  const meta = CATEGORY_META[card.type];
  const art = cardArt(card);
  const title = card.title ? `<div style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;margin-bottom:6px">${card.title}</div>` : "";
  return `
    <article class="game-card reveal" style="--cat:${meta.color}" aria-label="${meta.label} card">
      <div class="card-face" style="--cat:${meta.color}">
        <div class="card-pattern"></div>
        <div class="card-cat">
          <img src="${meta.icon}" alt="">
          ${meta.label}
        </div>
        <div class="card-art">
          <img src="${art}" alt="${card.character} illustration">
        </div>
        <div class="card-text">${title}${card.text}</div>
      </div>
    </article>`;
}

export function renderFanCard(type, art, label) {
  return `
    <div class="fan-card ${type}">
      <span class="fan-label">${label}</span>
      <img class="art" src="${art}" alt="${label} card art">
    </div>`;
}
