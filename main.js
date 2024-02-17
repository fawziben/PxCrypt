const { app, BrowserWindow, ipcMain } = require('electron');
const path = require ('path')
const isDev = require ('electron-is-dev')


let win;

function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    })
  
    win.loadURL(isDev ? "http://127.0.0.1:3000" : `file://${path.join(__dirname,'../build/index.html')}`);
}

  ipcMain.on('logged-successfully', (event) => {
    win.setSize(1000, 600);
    win.center()

  })

  
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })