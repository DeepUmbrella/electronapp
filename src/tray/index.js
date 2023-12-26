const { Tray, Menu, app, dialog, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");

const initialMenu = [
  {
    label: "退出",
    click: async () => {
      const signal = await dialog.showMessageBoxSync({
        type: "info",
        title: "退出",
        message: "确定要退出吗？",
        buttons: ["确定", "取消"],
      });
      if (signal === 0) {
        app.quit();
      }
    },
  },
];

const createTray = () => {
  try {
    const appIcon = new Tray(path.join(__dirname, "../resource/icon/icon.png"));
    const contextMenu = Menu.buildFromTemplate(initialMenu);
    appIcon.setToolTip("YL application.");

    appIcon.setContextMenu(contextMenu);

    return (config) =>
      appIcon.setContextMenu(
        Menu.buildFromTemplate([...config, ...initialMenu])
      );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTray,
};
