window.addEventListener("DOMContentLoaded", () => {
  const settingForm = document.querySelector("#setting-form");

  const nickname = document.querySelector("#user-nick-name");
  const id = document.querySelector("#user-id");
  const balance = document.querySelector("#balance");
  const reachMsg = document.querySelector("#reach-msg");

  window.WinAPI.SendEventToRenderer(
    "setting-update",
    nickname.value,
    id.value,
    balance.value,
    reachMsg.value
  );

  settingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    window.WinAPI.SendEventToRenderer(
      "setting-update",
      nickname.value,
      id.value,
      balance.value,
      reachMsg.value
    );
  });
});
