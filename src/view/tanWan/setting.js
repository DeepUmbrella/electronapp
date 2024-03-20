window.addEventListener("DOMContentLoaded", () => {
  const settingForm = document.querySelector("#setting-form");

  const nickname = document.querySelector("#user-nick-name");
  const id = document.querySelector("#user-id");
  const balance = document.querySelector("#balance");

  window.WinAPI.SendEventToRenderer(
    "tanwan-setting-update",
    nickname.value,
    id.value,
    balance.value
  );

  settingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    window.WinAPI.SendEventToRenderer(
      "tanwan-setting-update",
      nickname.value,
      id.value,
      balance.value
    );
  });
});
