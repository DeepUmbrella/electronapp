window.addEventListener("DOMContentLoaded", () => {
  const settingForm = document.querySelector("#setting-form");

  const game_name = document.querySelector("#game_name");
  const game_bi = document.querySelector("#game_bi");
  const game_bl = document.querySelector("#game_bl");
  const server_name = document.querySelector("#server_name");
  const server_num = document.querySelector("#server_num");
  const server_suffix = document.querySelector("#server_suffix");
  const user_name = document.querySelector("#user_name");

  window.WinAPI.HandleEvent("tanwan-page-update", (...props) => {
    window.WinAPI.SendEventToRenderer(
      "tanwan-setting-update",
      game_name.value,
      game_bi.value,
      game_bl.value,
      server_name.value,
      server_num.value,
      server_suffix.value,
      user_name.value
    );
  });
});
