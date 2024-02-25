const { DEVICE_PIXEL } = require("./src/config/device");

// Modules to control application life and create native browser window
const { app, BrowserWindow, screen, ipcMain, dialog } = require("electron");
const { createTray } = require("./src/tray");
const { registerClose } = require("./src/event");
const path = require("node:path");
const { registerMac, checkMac } = require("./src/prelogin/generateUniqueValue");

const SettingWindow = (dependWindow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  let SettingWindow = new BrowserWindow({
    ...DEVICE_PIXEL.SETTING,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      hardwareAcceleration: true,
    },
    x: width - DEVICE_PIXEL.SETTING.width, // 设置左下角 x 坐标
    y: height - DEVICE_PIXEL.SETTING.height,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  SettingWindow.loadFile("./src/view/setting.html");

  dependWindow.on("closed", () => {
    SettingWindow?.close();
  });

  dependWindow.on("show", () => {
    SettingWindow.show();
  });

  dependWindow.on("hide", () => {
    SettingWindow.hide();
  });
  SettingWindow.on("closed", () => {
    SettingWindow = null;
  });
};

const LoginWindow = (pass, updateTray) => {
  let LoginWindow = new BrowserWindow({
    ...DEVICE_PIXEL.LOGIN,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      hardwareAcceleration: true,
    },
    resizable: false,
    frame: false,
    show: pass,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  MachineErrorWindow(LoginWindow);

  LoginWindow.loadFile("./src/view/login.html");
  ipcMain.handle("login-success", async (e, username, password, save) => {
    // 保存账号密码
    // 更新用户账户名
    // 打开主窗口

    let m = MainWindow(() => {
      LoginWindow.close();
    });
    let r = RechargeWindow();

    updateTray([
      {
        label: "主页",
        click: async () => {
          r.hide();
          m.show();
        },
      },
      {
        label: "登记",
        click: async () => {
          m.hide();
          r.show();
        },
      },
    ]);

    // 关闭登录窗口
  });

  LoginWindow.on("closed", () => {
    LoginWindow = null;
  });
};

const MachineErrorWindow = (LoginWindow) => {
  let window_instance = new BrowserWindow({
    ...DEVICE_PIXEL.MACHINE_ERROR,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      hardwareAcceleration: true,
    },
    resizable: false,
    frame: false,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  ipcMain.handle("check-mac", async (e) => {
    const { register, mac_id } = await checkMac();
    if (register) {
      LoginWindow.show();
      window_instance.close();
      return;
    }
    return mac_id;
  });

  ipcMain.handle("register-mac", async (e) => {
    const result = await registerMac();
    return result;
  });

  window_instance.loadFile("./src/view/machineError.html");

  window_instance.on("closed", () => {
    window_instance = null;
  });
};

const MainWindow = (callback) => {
  let mainWindow = new BrowserWindow({
    ...DEVICE_PIXEL.iphone_12_pro,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },

    resizable: false,
    frame: false,
    transparent: false,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  // and load the index.html of the app.
  mainWindow.loadFile("./src/view/main.html");

  ipcMain.on("setting-update", (e, ...args) => {
    mainWindow.webContents.send("setting-update", ...args);
  });

  mainWindow.on("ready-to-show", callback);

  SettingWindow(mainWindow);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  return mainWindow;
};

const RechargeWindow = (callback) => {
  let rechargeWindow = new BrowserWindow({
    ...DEVICE_PIXEL.RECHARGE,
    name: 100,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    resizable: false,
    frame: false,
    transparent: false,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  ipcMain.on("recharge-setting-update", (e, ...args) => {
    rechargeWindow.webContents.send("recharge-setting-update", ...args);
  });

  RechargeSettingWindow(rechargeWindow);

  rechargeWindow.loadFile("./src/view/RechargeRegistration/index.html");
  rechargeWindow.on("closed", () => {
    rechargeWindow = null;
    app.quit();
  });
  return rechargeWindow;
};

const RechargeSettingWindow = (dependWindow) => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  let rechargeSettingWindow = new BrowserWindow({
    ...DEVICE_PIXEL.SETTING,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    show: false,
    x: width - DEVICE_PIXEL.SETTING.width, // 设置左下角 x 坐标
    y: height - DEVICE_PIXEL.SETTING.height,
    resizable: false,
    frame: false,
    transparent: false,
    icon: path.join(__dirname, "./src/resource/icon/icon.png"),
  });

  rechargeSettingWindow.loadFile(
    "./src/view/RechargeRegistration/setting.html"
  );

  dependWindow.on("closed", () => {
    rechargeSettingWindow?.close();
  });

  dependWindow.on("show", () => {
    rechargeSettingWindow.show();
  });

  dependWindow.on("hide", () => {
    rechargeSettingWindow.hide();
  });
  rechargeSettingWindow.on("closed", () => {
    rechargeSettingWindow = null;
    app.quit();
  });
};

function createWindow(pass) {
  updateTray = createTray(app);
  LoginWindow(pass, updateTray);

  // Create the browser window.
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  createWindow();
  //
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("before-quit", (event) => {
  BrowserWindow.getAllWindows().forEach((window) => window.destroy());
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on("quit", () => {});
