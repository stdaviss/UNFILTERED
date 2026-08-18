import { ASSETS } from "../config.js";
import { getProfile } from "../engine/storage.js";
import { $ } from "./dom.js";
import { openOverlay } from "./dom.js";

const NAV = [
  { href: "index.html", label: "Home", key: "index" },
  { href: "lobby.html", label: "Lobby", key: "lobby" },
  { href: "my-games.html", label: "My Games", key: "my-games" },
  { href: "leaderboard.html", label: "Leaderboard", key: "leaderboard" },
  { href: "how-to-play.html", label: "How to Play", key: "how-to-play" },
];

const BOTTOM = [
  { href: "index.html", label: "Lobby", icon: ASSETS.icons.users, key: "index" },
  { href: "my-games.html", label: "My Games", icon: ASSETS.icons.copy, key: "my-games" },
  { href: "leaderboard.html", label: "Leaderboard", icon: ASSETS.icons.trophy, key: "leaderboard" },
  { href: "profile.html", label: "Profile", icon: ASSETS.icons.archetype, key: "profile" },
];

export function initChrome({ active } = {}) {
  const profile = getProfile();
  const nav = $(".top-nav");
  if (nav) {
    const links = nav.querySelector(".nav-links");
    if (links) {
      links.innerHTML = NAV.map((item) => {
        const current = item.key === active ? ' aria-current="page"' : "";
        return `<a href="${item.href}"${current}>${item.label}</a>`;
      }).join("");
    }
    const name = nav.querySelector("[data-user-name]");
    const avatar = nav.querySelector("[data-user-avatar]");
    if (name) name.textContent = profile.name;
    if (avatar) {
      avatar.src = profile.avatar;
      avatar.alt = profile.name;
    }
    nav.querySelector("[data-open-settings]")?.addEventListener("click", () => {
      location.href = "profile.html";
    });
    nav.querySelector(".menu-toggle")?.addEventListener("click", () => {
      links?.classList.toggle("open");
    });
  }

  const bottom = $(".bottom-nav");
  if (bottom && !bottom.children.length) {
    bottom.innerHTML = BOTTOM.map((item) => {
      const current = item.key === active ? ' aria-current="page"' : "";
      return `<a href="${item.href}"${current}><img src="${item.icon}" alt="">${item.label}</a>`;
    }).join("");
  }

  if (!$(".app-bg")) {
    const bg = document.createElement("div");
    bg.className = "app-bg";
    bg.innerHTML = `<img src="${ASSETS.background}" alt="">`;
    document.body.prepend(bg);
  }
}

export { openOverlay };
