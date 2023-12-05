const { ipcMain, app, dialog, BrowserWindow } = require("electron");
const {
  loginUser,
  validateAdminPassword,
  registerUser,
} = require("./prelogin/generateUniqueValue");

ipcMain.handle("close-process", async () => {
  const signal = await dialog.showMessageBoxSync(
    BrowserWindow.getFocusedWindow(),
    {
      type: "info",
      title: "退出",
      message: "确定要退出吗？",
      buttons: ["取消", "确定"],
    }
  );

  if (signal === 1) {
    app.quit();
  }
});

ipcMain.handle("close-quit", async () => {
  app.quit();
});

ipcMain.handle("login", async (e, username, password, adminLogin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (adminLogin) {
        resolve(validateAdminPassword(password));
        return;
      }
      resolve(loginUser(username, password));
    }, 3000);
  });
});

ipcMain.handle(
  "register",
  async (e, username, password, adminLoginPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pass = validateAdminPassword(adminLoginPassword);
        if (!pass) {
          return resolve("admin");
        }
        const success = registerUser(username, password);
        if (!success) {
          return resolve("fail");
        }
        resolve("");
      }, 3000);
    });
  }
);

ipcMain.handle("origin-alert", async (e, options) => {
  const {
    type = "info",
    title = "提示",
    message = "提示",
    buttons = ["确定"],
  } = options;
  const signal = await dialog.showMessageBoxSync(
    BrowserWindow.getFocusedWindow(),
    {
      type,
      title,
      message,
      buttons,
    }
  );
});

const registerClose = (mainWindow, windowName) => {
  if (mainWindow && windowName) {
    const handleClose = () => {
      mainWindow.close();
    };
    ipcMain.handle(`close-${windowName}`, handleClose);
    mainWindow.on("closed", () => {
      ipcMain.removeListener(`close-${windowName}`, handleClose);
    });
  } else {
    console.log("Arguments error during create register event!");
  }
};

module.exports = {
  registerClose,
};
