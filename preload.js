const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronAPI', {
  loginSuccess: () => ipcRenderer.send('logged-successfully')
})