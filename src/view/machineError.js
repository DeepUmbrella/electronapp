window.addEventListener("DOMContentLoaded", () => {
  const registerMac = document.querySelector('[data-register="mac"]');
  const checkMac = document.querySelector('[data-check="mac"]');
  const loadingElement = document.querySelector("#loading");
  const mac_idElement = document.querySelector("#mac-id");

  const checkMacFn = () => {
    loadingElement.classList.add("loading");

    window.WinAPI.SendEvent("check-mac")
      .then((mac_id) => {
        if (mac_id) {
          mac_idElement.innerText = `识别码：${mac_id}`;
        } else {
          mac_idElement.innerText = "";
        }
      })
      .finally(() => {
        loadingElement.classList.remove("loading");
      });
  };

  const registerMacFn = () => {
    loadingElement.classList.add("loading");

    window.WinAPI.SendEvent("register-mac")
      .then((mac_id) => {
        window.WinAPI.SendEvent("origin-alert", {
          type: mac_id ? "info" : "error",
          title: mac_id ? "申请成功" : "申请失败",
          message: mac_id ? "等待审核中" : "申请失败",
          buttons: ["确定"],
        });
      })
      .finally(() => {
        loadingElement.classList.remove("loading");
      });
  };

  checkMac.addEventListener("click", checkMacFn);
  registerMac.addEventListener("click", registerMacFn);
  checkMacFn();
});
