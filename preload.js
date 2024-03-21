const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  loginSuccess: () => ipcRenderer.send("logged-successfully"),
  saveNewData: (encryptedData, fileName) =>
    ipcRenderer.send("replace-data", encryptedData, fileName),
});
