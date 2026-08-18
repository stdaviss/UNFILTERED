import { SAMPLE_GAMES, MODES } from "../data/content.js";
import { getRooms, getSession } from "../engine/storage.js";
import { initChrome } from "../ui/nav.js";
import { $ } from "../ui/dom.js";

initChrome({ active: "my-games" });

const rooms = getRooms();
const live = getSession();
const list = rooms.length ? rooms : SAMPLE_GAMES;

$("#games-list").innerHTML = list.map((game) => {
  const mode = MODES[game.mode];
  const href = game.status === "complete" ? "my-games.html" : (game.status === "lobby" ? "lobby.html" : "game.html");
  const canOpen = live && live.roomCode === game.roomCode;
  return `
    <a class="list-card" href="${canOpen || game.status !== "complete" ? href : "index.html"}">
      <img class="avatar lg" src="${mode?.icon || "assets/icons/question.svg"}" alt="">
      <div>
        <h3>${game.roomCode} · ${mode?.short || game.mode}</h3>
        <p>${game.players} players · ${game.status} · ${game.updated}${game.round ? ` · round ${game.round}/${game.totalRounds}` : ""}</p>
      </div>
      <span class="btn btn-sm btn-ghost">${game.status === "complete" ? "Replay" : "Open"}</span>
    </a>`;
}).join("") || `<p class="notice">No games yet. Create one from Home.</p>`;
