export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export function toast(message) {
  let node = document.querySelector(".toast");
  if (!node) {
    node = el(`<div class="toast" role="status"></div>`);
    document.body.appendChild(node);
  }
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => node.classList.remove("show"), 1800);
}

export function copyText(value) {
  navigator.clipboard?.writeText(value).then(
    () => toast("Copied"),
    () => toast(value)
  );
}

export function openOverlay(id) {
  const node = document.getElementById(id);
  if (node) {
    node.classList.add("open");
    node.setAttribute("aria-hidden", "false");
    const focusable = node.querySelector("button, input, [href]");
    focusable?.focus();
  }
}

export function closeOverlay(id) {
  const node = document.getElementById(id);
  if (node) {
    node.classList.remove("open");
    node.setAttribute("aria-hidden", "true");
  }
}

export function bindOverlayDismiss() {
  document.querySelectorAll(".overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("open");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".overlay.open").forEach((overlay) => overlay.classList.remove("open"));
    }
  });
}

export function pageName() {
  const file = location.pathname.split("/").pop() || "index.html";
  return file.replace(".html", "") || "index";
}
