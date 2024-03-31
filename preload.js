const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  loginSuccess: () => ipcRenderer.send("logged-successfully"),
  saveNewData: (encryptedData, fileName, operation) =>
    ipcRenderer.send("replace-data", encryptedData, fileName, operation),
  filePaths: () => ipcRenderer.invoke("file-paths").then((result) => result),
});
