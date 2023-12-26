window.addEventListener("DOMContentLoaded", () => {
  const settingForm = document.querySelector("#setting-form");

  const balance = document.querySelector("#balance");

  window.WinAPI.SendEventToRenderer(
    "recharge-setting-update",

    balance.value
  );

  settingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    window.WinAPI.SendEventToRenderer(
      "recharge-setting-update",

      balance.value
    );
  });
});
