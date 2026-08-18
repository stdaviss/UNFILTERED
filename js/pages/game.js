import { CATEGORY_META, GAME_DEFAULTS } from "../config.js";
import { MODES, SAFETY_OPTIONS } from "../data/content.js";
import { getSession, saveSession } from "../engine/storage.js";
import {
  awards,
  beginTurn,
  completeTurn,
  currentCard,
  currentPlayer,
  endGame,
  lowerEnergy,
  pauseGame,
  playAgain,
  replaceCard,
  resumeGame,
  skipCard,
  timeAgo,
  revealCard,
} from "../engine/game.js";
import { initChrome } from "../ui/nav.js";
import { renderGameCard } from "../ui/card.js";
import { $, bindOverlayDismiss, closeOverlay, copyText, openOverlay, toast } from "../ui/dom.js";

initChrome({ active: "lobby" });
bindOverlayDismiss();

let session = getSession();
if (!session) {
  location.href = "lobby.html";
}

const primary = $("#primary-btn");
const secondary = $("#secondary-btn");

function renderPlayers() {
  const filled = session.players.length;
  $("#players-panel").innerHTML = `
    <h2>Players <span class="count-pill">${filled} / ${GAME_DEFAULTS.maxPlayers}</span></h2>
    ${session.players.map((p) => {
      const active = currentPlayer(session)?.id === p.id;
      return `
        <div class="player-row" ${active ? 'style="background:rgba(158,228,147,.08);border-radius:10px"' : ""}>
          <img class="avatar" src="${p.avatar}" alt="">
          <div class="grow">
            <div class="name">${p.name}${p.isYou ? " (You)" : ""}</div>
            <div class="meta">${p.isHost ? "Host" : "Ready"}${p.team && session.mode === "team" ? ` · Team ${p.team}` : ""}</div>
          </div>
        </div>`;
    }).join("")}
    ${Array.from({ length: Math.max(0, GAME_DEFAULTS.maxPlayers - filled) }, () => `
      <div class="player-row waiting">
        <img class="avatar" src="assets/avatars/guest.svg" alt="">
        <div class="grow"><div class="name">Waiting for player...</div></div>
      </div>`).join("")}
    <div class="room-code">
      <small>ROOM CODE</small>
      <b>${session.roomCode}</b>
      <button class="btn btn-sm btn-primary btn-block" id="copy-link">Copy Link</button>
    </div>
  `;
  $("#copy-link")?.addEventListener("click", () => {
    copyText(`${location.origin}/lobby.html?room=${session.roomCode}`);
  });
}

function renderInfo() {
  const mode = MODES[session.mode];
  const ranked = [...session.players].sort((a, b) => b.score - a.score);
  $("#info-panel").innerHTML = `
    <h2>Game mode</h2>
    <p style="margin:0 0 16px;color:var(--green);font-weight:800;font-size:22px">${mode?.short || "Classic"}</p>
    <h2>Scoreboard</h2>
    ${session.scoringEnabled ? ranked.map((p, i) => `
      <div class="score-row">
        <span>${i + 1}.</span>
        <img class="avatar sm" src="${p.avatar}" alt="">
        <span class="grow name">${p.name}</span>
        <b>${p.score} pts</b>
      </div>`).join("") : `<p class="notice">Scoring is off. Play for the conversation.</p>`}
    <h2 style="margin-top:16px">Activity feed</h2>
    ${session.events.slice(0, 8).map((ev) => `
      <div class="event-row">
        <img class="avatar sm" src="${ev.avatar}" alt="">
        <span class="grow">${ev.text}</span>
        <time>${timeAgo(ev.at)}</time>
      </div>`).join("")}
  `;
}

function renderCard() {
  const card = currentCard(session);
  const revealed = session.revealed && session.status !== "player_turn";
  $("#card-stage").innerHTML = renderGameCard(card, { revealed });
  const meta = CATEGORY_META[card?.type || "truth"];
  $("#cat-badge").textContent = revealed ? meta.label : "HIDDEN";
  $("#cat-badge").style.setProperty("--cat", meta.color);
  $("#round-label").textContent = `ROUND ${Math.max(1, session.round)} OF ${session.totalRounds}`;
  $("#current-name").textContent = currentPlayer(session)?.name || "—";
  if (session.archetypeActive && session.archetypeActive.playerId === currentPlayer(session)?.id && card?.type !== "archetype") {
    $("#current-name").textContent += " · Archetype active";
  }
}

function renderControls() {
  if (session.status === "player_turn") {
    primary.textContent = "Reveal Next Card";
    primary.disabled = false;
    secondary.textContent = "End Round";
    secondary.disabled = true;
  } else if (session.status === "card_revealed") {
    primary.textContent = "Complete Turn";
    primary.disabled = false;
    secondary.textContent = "End Round";
    secondary.disabled = false;
  } else {
    primary.disabled = session.status === "paused" || session.status === "game_complete";
  }
}

function renderSafety() {
  $("#safety-grid").innerHTML = SAFETY_OPTIONS.map((opt) => `
    <button type="button" data-safety="${opt.id}">
      <b>${opt.label}</b>
      <span>${opt.hint}</span>
    </button>`).join("");
}

function renderComplete() {
  $("#wrap-stats").innerHTML = `
    <div class="stat"><b>${Math.min(session.round, session.totalRounds)}</b><span>Rounds completed</span></div>
    <div class="stat"><b>${session.cardsPlayed}</b><span>Cards played</span></div>
    <div class="stat"><b>${session.skippedCount}</b><span>Cards skipped</span></div>
  `;
  $("#wrap-awards").innerHTML = awards(session).map((a) =>
    `<li><b>${a.label}:</b> ${a.player?.name || "—"}</li>`
  ).join("");
  $("#closing-prompt").textContent = session.closingPrompt;
}

function render() {
  session = getSession();
  if (!session) return;
  renderPlayers();
  renderInfo();
  renderCard();
  renderControls();

  if (session.status === "paused") openOverlay("pause-modal");
  else closeOverlay("pause-modal");

  if (session.status === "game_complete") {
    renderComplete();
    openOverlay("complete-modal");
  }
}

primary.addEventListener("click", () => {
  if (session.status === "player_turn") {
    session = revealCard(session);
  } else if (session.status === "card_revealed") {
    session = completeTurn(session);
  }
  render();
});

secondary.addEventListener("click", () => {
  if (session.status === "card_revealed") {
    session = completeTurn(session);
    render();
  }
});

$("#safety-btn").addEventListener("click", () => openOverlay("safety-modal"));
document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeOverlay(btn.dataset.close));
});

$("#safety-grid").addEventListener("click", (e) => {
  const id = e.target.closest("[data-safety]")?.dataset.safety;
  if (!id) return;
  closeOverlay("safety-modal");
  if (id === "skip") session = skipCard(session);
  if (id === "replace") session = replaceCard(session);
  if (id === "reframe") { toast("Reframe: answer as a team or hypothetically."); }
  if (id === "group") { toast("Group response — no spotlight."); }
  if (id === "pause") session = pauseGame(session);
  if (id === "lower-energy") session = lowerEnergy(session);
  if (id === "end") session = endGame(session);
  render();
});

$("#resume-btn").addEventListener("click", () => {
  session = resumeGame(session);
  render();
});
$("#pause-end-btn").addEventListener("click", () => {
  session = endGame(session);
  render();
});
$("#again-btn").addEventListener("click", () => {
  session = playAgain(session);
  location.href = "lobby.html";
});
$("#return-lobby").addEventListener("click", (e) => {
  e.preventDefault();
  session.status = "lobby";
  session.round = 0;
  session.currentCardId = null;
  saveSession(session);
  location.href = "lobby.html";
});

document.querySelector(".drawer-tabs")?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-drawer]");
  if (!btn) return;
  const id = btn.dataset.drawer;
  const panel = document.getElementById(id);
  const open = !panel.classList.contains("open-mobile");
  document.querySelectorAll(".game-side").forEach((p) => p.classList.remove("open-mobile"));
  document.querySelectorAll(".drawer-tabs button").forEach((b) => b.setAttribute("aria-pressed", "false"));
  if (open) {
    panel.classList.add("open-mobile");
    btn.setAttribute("aria-pressed", "true");
  }
});

renderSafety();

if (session.status === "starting" || session.status === "lobby") {
  openOverlay("start-modal");
  setTimeout(() => {
    closeOverlay("start-modal");
    session = beginTurn(session);
    render();
  }, 1400);
} else {
  render();
}
