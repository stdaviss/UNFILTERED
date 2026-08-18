import { GAME_DEFAULTS } from "../config.js";
import { MODES } from "../data/content.js";
import { getSession } from "../engine/storage.js";
import { addLocalPlayer, canStart, createSession, startGame, toggleReady } from "../engine/game.js";
import { initChrome } from "../ui/nav.js";
import { $, copyText, toast } from "../ui/dom.js";

initChrome({ active: "lobby" });

let session = getSession();
if (!session) {
  const params = new URLSearchParams(location.search);
  session = createSession({
    mode: params.get("mode") || "classic",
    roomCode: params.get("room") || undefined,
  });
}

function render() {
  const mode = MODES[session.mode];
  const ready = session.players.filter((p) => p.status === "ready").length;
  $("#room-code").textContent = session.roomCode;
  $("#ready-line").textContent = `${ready} PLAYER${ready === 1 ? "" : "S"} READY`;
  $("#mode-line").textContent = `${mode?.name || "Classic"} · ${session.totalRounds} rounds · invite only`;
  $("#start-btn").disabled = !canStart(session);

  const emptySlots = Math.max(0, GAME_DEFAULTS.maxPlayers - session.players.length);
  $("#lobby-players").innerHTML = `
    <h2>Players <span class="count-pill">${session.players.length} / ${GAME_DEFAULTS.maxPlayers}</span></h2>
    ${session.players.map((p) => `
      <div class="player-row">
        <img class="avatar" src="${p.avatar}" alt="">
        <div class="grow">
          <div class="name">${p.name}${p.isYou ? " (You)" : ""} ${p.isHost ? "♛" : ""}</div>
          <div class="meta">${p.status === "ready" ? "Ready" : "Waiting"}</div>
        </div>
        <button class="btn btn-sm btn-ghost" data-ready="${p.id}">${p.status === "ready" ? "Unready" : "Ready"}</button>
      </div>
    `).join("")}
    ${Array.from({ length: emptySlots }, () => `
      <div class="player-row waiting">
        <img class="avatar" src="assets/avatars/guest.svg" alt="">
        <div class="grow"><div class="name">Waiting for player...</div></div>
      </div>`).join("")}
  `;
}

$("#lobby-players").addEventListener("click", (e) => {
  const id = e.target.closest("[data-ready]")?.dataset.ready;
  if (!id) return;
  session = toggleReady(session, id);
  render();
});

$("#start-btn").addEventListener("click", () => {
  if (!canStart(session)) {
    toast("Need at least 3 ready players.");
    return;
  }
  session = startGame(session);
  location.href = "game.html";
});

$("#copy-btn").addEventListener("click", () => {
  const url = `${location.origin}${location.pathname.replace("lobby.html", "lobby.html")}?room=${session.roomCode}`;
  copyText(url);
});

$("#add-btn").addEventListener("click", () => {
  const name = prompt("Player display name");
  if (!name) return;
  session = addLocalPlayer(session, name.trim());
  render();
});

render();
