const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("electronAPI", {
  loginSuccess: () => ipcRenderer.send("logged-successfully"),
  saveNewData: (encryptedData, fileName, operation) =>
    ipcRenderer.send("replace-data", encryptedData, fileName),
  filePaths: () => ipcRenderer.invoke("file-paths").then((result) => result),
  decryptData: (file, accessToken) =>
    new Promise((resolve, reject) => {
      ipcRenderer
        .invoke("decrypt-data", file, accessToken)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }),
});
