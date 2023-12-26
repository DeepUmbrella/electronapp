window.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.querySelector("#loading");
  const rechargeSuccessElement = document.querySelector(".recharge-success");

  const rechargeNumberNumberElement =
    document.querySelector("#recharge-number");

  //

  window?.WinAPI?.HandleEvent("recharge-setting-update", (gold) => {
    rechargeNumberNumberElement.innerHTML = gold;
  });

  async function addUserToSelect() {
    // 获取用户名输入框的值
    var usernameInput = document.getElementById("username");
    var username = usernameInput.value;

    if (!username) {
      return false;
    }
    loadingElement.classList.add("loading");

    await new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
    // 获取角色选择框
    var selectElement = document.getElementById("inputGroupSelect04");

    // 创建一个新的选项元素
    var optionElement = document.createElement("option");
    optionElement.text = username;
    optionElement.value = username;

    // 将新的选项添加到选择框
    selectElement.add(optionElement);

    // 清空用户名输入框
    usernameInput.value = "";

    loadingElement.classList.remove("loading");

    rechargeSuccessElement.classList.add("show");
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });
    rechargeSuccessElement.classList.remove("show");
  }
  const loginForm = document.querySelector("#recharge-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the loading indicator
    addUserToSelect();

    // Call your login function
  });
});
