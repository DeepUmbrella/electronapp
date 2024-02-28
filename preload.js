const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
});

contextBridge.exposeInMainWorld("WinAPI", {
  TriggerSetting: () => ipcRenderer.invoke("open-setting"),
  SendEvent: (eventName, ...args) => ipcRenderer.invoke(eventName, ...args),
  // we can also expose variables, not just functions
  HandleEvent: (eventName, callback) =>
    ipcRenderer.on(eventName, (event, ...args) => callback(...args)),

  SendEventToRenderer: (eventName, ...args) =>
    ipcRenderer.send(eventName, ...args),
});

window.addEventListener("DOMContentLoaded", () => {
  const closeProcessElements = document.querySelectorAll("[data-close]");

  for (const closeProcessElement of closeProcessElements) {
    closeProcessElement.addEventListener("click", (e) => {
      const target = closeProcessElement.dataset.close;
      console.log(11111);
      try {
        ipcRenderer.invoke(`close-${target}`);
      } catch (e) {
        console.log(e, "ipcRenderer.invoke in preload js");
      }
    });
  }
});
