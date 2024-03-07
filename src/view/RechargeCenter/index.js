window.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.querySelector("#loading");
  const confirmloadingElement = document.querySelector("#payment-loading-mask");
  const titleElement = document.querySelector("#title");
  const payTipsElement = document.querySelector("#pay-tips");
  const qrconfirmElement = document.querySelector("#qr-confirm");
  const aliqrContainerElement = document.querySelector("#ali-pay-qrcode");
  const qrloadingElement = document.querySelector("#qr-loading");
  const qrdcodeElement = document.querySelector("#qr-code");
  const qrScanSuccessElement = document.querySelector("#qr-scan-success");
  const rechargeSuccessElement = document.querySelector(
    "#payment-loading-success"
  );
  const lastLoadingElement = document.querySelector("#payment-last-loading");
  const loginForm = document.querySelector("#recharge-form");
  const rechargeNumberNumberElement =
    document.querySelector("#recharge-number");
  const rechargeDoneElement = document.querySelector("#recharge-done");

  window?.WinAPI?.HandleEvent("recharge-setting-update", (gold) => {
    rechargeNumberNumberElement.innerHTML = gold;
  });

  rechargeDoneElement.addEventListener("click", () => {
    rechargeSuccessElement.classList.remove("show-loading");
    lastLoadingElement.classList.remove("d-none");
    loginForm.classList.remove("d-none");
    titleElement.innerHTML = "充值中心";
  });

  async function qrConfirm() {
    titleElement.innerHTML = "支付";
    payTipsElement.classList.add("d-none");
    aliqrContainerElement.classList.remove("d-none");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    qrloadingElement.classList.add("d-none");
    qrdcodeElement.classList.remove("d-none");

    await new Promise((resolve) => setTimeout(resolve, 4000));
    qrScanSuccessElement.classList.remove("d-none");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    confirmloadingElement.classList.add("show-loading");
    titleElement.innerHTML = "";
    aliqrContainerElement.classList.add("d-none");
    qrloadingElement.classList.remove("d-none");
    qrdcodeElement.classList.add("d-none");
    qrScanSuccessElement.classList.add("d-none");

    await new Promise((resolve) => setTimeout(resolve, 2000));
    confirmloadingElement.classList.remove("show-loading");
    rechargeSuccessElement.classList.add("show-loading");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    lastLoadingElement.classList.add("d-none");
  }

  async function addUserToSelect() {
    // 获取用户名输入框的值
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;

    if (!username) {
      return false;
    }
    confirmloadingElement.classList.add("show-loading");

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    // 获取角色选择框
    // 清空用户名输入框
    usernameInput.value = "";
    confirmloadingElement.classList.remove("show-loading");
    loginForm.classList.add("d-none");
    payTipsElement.classList.remove("d-none");
    titleElement.innerHTML = "提示";
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the loading indicator
    addUserToSelect();

    // Call your login function
  });

  qrconfirmElement.addEventListener("click", () => qrConfirm());
});
