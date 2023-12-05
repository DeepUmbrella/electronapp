window.addEventListener("DOMContentLoaded", () => {
  const registerMac = document.querySelector('[data-register="mac"]');
  const passwordInput = document.querySelector("#password");

  registerMac.addEventListener("click", () => {
    if (!passwordInput.value) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "未通过",
        message: "必须输入管理员密码",
        buttons: ["确定"],
      });
      return;
    }
    window.WinAPI.SendEvent("register-mac", passwordInput.value).then((res) => {
      console.log(123);
    });
  });
});
