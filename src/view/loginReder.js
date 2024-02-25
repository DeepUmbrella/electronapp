window.addEventListener("DOMContentLoaded", () => {
  const loadingElement = document.querySelector("#loading");

  let onlogin = false;
  const loginUser = () => {
    if (onlogin) {
      return;
    }
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    if (!username || !password) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "用户名和密码！",
        message: "请输入用户名和密码",
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

    window.WinAPI.SendEvent("login", username, password)
      .then((res) => {
        if (res) {
          window.WinAPI.SendEvent("login-success");
          window.WinAPI.SendEventToRenderer("login-success");
        } else {
          window.WinAPI.SendEvent("origin-alert", {
            type: "warning",
            title: "用户名和密码！",
            message: "用户名或密码错误！",
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

    if (!username || !password) {
      window.WinAPI.SendEvent("origin-alert", {
        type: "warning",
        title: "用户名和密码！",
        message: "请输入要新增的用户名和密码",
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

    window.WinAPI.SendEvent("register", username, password)
      .then((res) => {
        const { register, message } = res;

        if (!register) {
          window.WinAPI.SendEvent("origin-alert", {
            type: "warning",
            title: "注册失败",
            message,
            buttons: ["确定"],
          });
          return;
        }

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
