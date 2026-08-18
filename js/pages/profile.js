import { getProfile, getSettings, saveProfile, saveSettings } from "../engine/storage.js";
import { initChrome } from "../ui/nav.js";
import { $, toast } from "../ui/dom.js";

initChrome({ active: "profile" });

const profile = getProfile();
const settings = getSettings();
$("#name").value = profile.name;
$("#avatar").value = profile.avatar;
$("#scoring").value = settings.scoringEnabled === false ? "off" : "on";
$("#rounds").value = String(settings.totalRounds || 10);
$("#preview-name").textContent = profile.name;
$("#preview-avatar").src = profile.avatar;

$("#avatar").addEventListener("change", () => {
  $("#preview-avatar").src = $("#avatar").value;
});
$("#name").addEventListener("input", () => {
  $("#preview-name").textContent = $("#name").value || "Player";
});

$("#save").addEventListener("click", () => {
  saveProfile({
    ...getProfile(),
    name: $("#name").value.trim() || "Dave",
    avatar: $("#avatar").value,
  });
  saveSettings({
    scoringEnabled: $("#scoring").value === "on",
    totalRounds: Number($("#rounds").value),
  });
  toast("Saved");
  initChrome({ active: "profile" });
});
