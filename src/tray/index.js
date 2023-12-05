const { Tray, Menu, app, dialog } = require("electron");
const path = require("node:path");

const createTray = () => {
  try {
    const appIcon = new Tray(path.join(__dirname, "../resource/icon/icon.png"));
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "设置",
        click: () => {
          // 打开设置窗口
        },
      },
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
    ]);
    appIcon.setToolTip("YL application.");

    appIcon.setContextMenu(contextMenu);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTray,
};
