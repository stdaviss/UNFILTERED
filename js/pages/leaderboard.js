import { SAMPLE_LEADERBOARD } from "../data/content.js";
import { initChrome } from "../ui/nav.js";
import { $ } from "../ui/dom.js";

initChrome({ active: "leaderboard" });

$("#board").innerHTML = SAMPLE_LEADERBOARD.map((row) => `
  <div class="list-card">
    <img class="avatar lg" src="${row.avatar}" alt="${row.name}">
    <div>
      <h3>${row.rank}. ${row.name}</h3>
      <p>${row.label} · ${row.games} games</p>
    </div>
    <b style="color:var(--green)">${row.points}</b>
  </div>
`).join("");
