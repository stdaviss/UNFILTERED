import { ASSETS } from "../config.js";
import { MODE_LIST } from "../data/content.js";
import { getProfile, saveProfile } from "../engine/storage.js";
import { createSession, joinSession } from "../engine/game.js";
import { initChrome } from "../ui/nav.js";
import { bindOverlayDismiss, openOverlay, closeOverlay, $ } from "../ui/dom.js";

initChrome({ active: "index" });
bindOverlayDismiss();

const profile = getProfile();
$("#create-name").value = profile.name;
$("#join-name").value = profile.name;

$("#card-fan").innerHTML = `
  <div class="fan-card truth"><span class="fan-label">TRUTH</span><img class="art" src="${ASSETS.characters.nova}" alt=""></div>
  <div class="fan-card dare"><span class="fan-label">DARE</span><img class="art" src="${ASSETS.characters.pulse}" alt=""></div>
  <div class="fan-card scenario"><span class="fan-label">SCENARIO</span><img class="art" src="${ASSETS.characters.logic}" alt=""></div>
  <div class="fan-card archetype"><span class="fan-label">ARCHETYPE</span><img class="art" src="${ASSETS.characters.rise}" alt=""></div>
  <div class="fan-card safety"><img class="stop" src="${ASSETS.safetyStop}" alt="Safety stop card"></div>
`;

$("#mode-grid").innerHTML = MODE_LIST.map((mode) => `
  <button class="mode-card ${mode.locked ? "locked" : ""}" data-mode="${mode.id}" style="--mode:${mode.color}">
    ${mode.locked ? `<span class="lock-badge"><img src="${ASSETS.icons.lock}" alt="Locked"></span>` : ""}
    <span class="mode-icon"><img src="${mode.icon}" alt=""></span>
    <h3>${mode.name}</h3>
    <p>${mode.description}</p>
    <footer>${mode.players}</footer>
  </button>
`).join("");

$("#create-mode").innerHTML = MODE_LIST.filter((m) => !m.locked)
  .map((m) => `<option value="${m.id}">${m.name}</option>`).join("");

$("#create-btn").addEventListener("click", () => openOverlay("create-modal"));
$("#join-btn").addEventListener("click", () => openOverlay("join-modal"));

document.querySelectorAll("[data-close]").forEach((btn) => {
  btn.addEventListener("click", () => closeOverlay(btn.dataset.close));
});

$("#mode-grid").addEventListener("click", (e) => {
  const card = e.target.closest("[data-mode]");
  if (!card) return;
  if (card.dataset.mode === "extreme") {
    openOverlay("locked-modal");
    return;
  }
  $("#create-mode").value = card.dataset.mode;
  openOverlay("create-modal");
});

$("#create-confirm").addEventListener("click", () => {
  const name = $("#create-name").value.trim() || "Dave";
  saveProfile({ ...getProfile(), name });
  createSession({
    mode: $("#create-mode").value,
    totalRounds: Number($("#create-rounds").value),
    hostName: name,
  });
  location.href = "lobby.html";
});

$("#join-confirm").addEventListener("click", () => {
  const name = $("#join-name").value.trim() || "Dave";
  const code = ($("#join-code").value.trim() || "OU-4827").toUpperCase();
  saveProfile({ ...getProfile(), name });
  joinSession(code, name);
  location.href = "lobby.html";
});
