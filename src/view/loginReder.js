window.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.querySelector("#loading");

  const adminSelect = document.querySelector("#adminlogin");

  const adminPasswordInput = document.querySelector("#admin-password");

  const adminContainer = document.querySelector(".admin-password");

  adminSelect.addEventListener("change", (e) => {
    if (e.target.checked) {
      adminContainer.classList.remove("d-none");
    } else {
      adminContainer.classList.add("d-none");
    }
  });

  let onlogin = false;
  const loginUser = () => {
    if (onlogin) {
      return;
    }

    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var adminPassword = adminPasswordInput.value;
    var adminloginCheck = document.querySelector("#adminlogin").checked;

    if (adminloginCheck) {
      if (!adminPassword) {
        window.WinAPI.SendEvent("origin-alert", {
          type: "warning",
          title: "密码！",
          message: "请输入管理员密码",
          buttons: ["确定"],
        });
        return;
      }
      password = adminPassword;
      //todo
    } else {
      if (!username || !password) {
        window.WinAPI.SendEvent("origin-alert", {
          type: "warning",
          title: "用户名和密码！",
          message: "请输入用户名和密码",
          buttons: ["确定"],
        });
        return;
      }
    }

    // Check if the user has agreed to the terms
    var agreeCheckbox = document.querySelector("#agree");
    if (!agreeCheckbox?.checked) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "用户协议",
        message: "请同意用户协议才能登录！",
        buttons: ["确定"],
      });
      return;
    }

    const rememberCheckbox = document.querySelector("#remember");
    if (!rememberCheckbox.checked) {
      //todo
    }

    // Retrieve username and password

    onlogin = true;
    loadingElement.classList.add("loading");

    window.WinAPI.SendEvent("login", username, password, adminloginCheck)
      .then((res) => {
        if (res) {
          window.WinAPI.SendEvent(
            "login-success",
            username,
            password,
            !!rememberCheckbox.checked
          );
          window.WinAPI.SendEventToRenderer("login-success");
        } else {
          window.WinAPI.SendEvent("origin-alert", {
            type: "warning",
            title: adminloginCheck ? "管理员" : "用户名和密码！",
            message: "管理员身份校验未通过",
            buttons: ["确定"],
          });
        }
      })
      .catch(() => {
        window.WinAPI.SendEvent("origin-alert", {
          type: "error",
          title: "网络故障",
          message: "网络故障，请稍后重试",
          buttons: ["确定"],
        });
      })
      .finally(() => {
        loadingElement.classList.remove("loading");
        onlogin = false;
      });
  };

  const registerUser = () => {
    if (onlogin) {
      return;
    }

    var username = document.querySelector("#username").value;
    var password = document.querySelector("#password").value;
    var adminPassword = adminPasswordInput.value;

    var adminloginCheck = adminSelect.checked;

    if (!username || !password) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "用户名和密码！",
        message: "请输入要新增的用户名和密码",
        buttons: ["确定"],
      });
      return;
    }

    if (!adminloginCheck) {
      adminSelect.checked = true;
      adminContainer.classList.remove("d-none");
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "授权",
        message: "新用户必须通过管理员授权！请输入管理员密码！",
        buttons: ["确定"],
      });
      return;
    }

    if (!adminPassword) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "密码！",
        message: "请输入管理员密码",
        buttons: ["确定"],
      });
      return;
    }

    // Check if the user has agreed to the terms
    var agreeCheckbox = document.querySelector("#agree");
    if (!agreeCheckbox?.checked) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "用户协议",
        message: "请同意用户协议才能注册！",
        buttons: ["确定"],
      });
      return;
    }

    const rememberCheckbox = document.querySelector("#remember");
    if (!rememberCheckbox.checked) {
      //todo
    }

    // Retrieve username and password

    onlogin = true;
    loadingElement.classList.add("loading");

    window.WinAPI.SendEvent("register", username, password, adminPassword)
      .then((res) => {
        if (res === "admin") {
          window.WinAPI.SendEvent("origin-alert", {
            type: "warning",
            title: "管理员授权",
            message: "管理员密码错误，不能注册！",
            buttons: ["确定"],
          });
          return;
        }
        if (res === "fail") {
          window.WinAPI.SendEvent("origin-alert", {
            type: "warning",
            title: "注册失败",
            message: "用户已存在或写入失败",
            buttons: ["确定"],
          });
          return;
        }

        adminPasswordInput.value = "";
        adminContainer.classList.add("d-none");
        adminSelect.checked = false;

        window.WinAPI.SendEvent("origin-alert", {
          type: "warning",
          title: "注册成功",
          message: "请点击登录,进入系统",
          buttons: ["确定"],
        });
      })
      .catch(() => {
        window.WinAPI.SendEvent("origin-alert", {
          type: "error",
          title: "网络故障",
          message: "网络故障，请稍后重试",
          buttons: ["确定"],
        });
      })
      .finally(() => {
        loadingElement.classList.remove("loading");
        onlogin = false;
      });
  };
  // Attach the function to the form's submit event
  const loginForm = document.querySelector("#loginform");
  const registerForm = document.querySelector("#register-user");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission
    loginUser(); // Call your login function
  });

  registerForm.addEventListener("click", () => {
    registerUser();
  });
});
