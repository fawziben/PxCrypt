const { app, BrowserWindow, ipcMain } = require("electron"); // Import des modules Electron nécessaires
const path = require("path"); // Import du module path pour gérer les chemins de fichiers
const isDev = require("electron-is-dev"); // Import du module electron-is-dev pour détecter le mode de développement
const fs = require("fs");

let win; // Déclaration de la variable pour stocker la fenêtre de l'application

// Fonction pour créer une nouvelle fenêtre de navigateur
function createWindow() {
  win = new BrowserWindow({
    width: 800, // Largeur initiale de la fenêtre
    height: 600, // Hauteur initiale de la fenêtre
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Chargement du script de pré-chargement
    },
  });

  // Chargement de l'URL de l'application React
  win.loadURL(
    isDev
      ? "http://127.0.0.1:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
}

// Écouteur d'événement pour l'événement 'logged-successfully'
ipcMain.on("logged-successfully", (event) => {
  // Redimensionnement de la fenêtre et centrage
  win.setSize(1000, 600);
  win.center();
});

ipcMain.on("replace-data", (event, data, filePath) => {
  // Write the data to the file
  const bufferData = Buffer.from(data);

  fs.writeFile(filePath, bufferData, "binary", (err) => {
    if (err) {
      console.log("Error writing file:", err);
    } else {
      console.log("File written successfully.");
    }
  });
});
// Événement lorsque Electron est prêt
app.whenReady().then(() => {
  // Création de la fenêtre principale de l'application
  createWindow();

  // Gestion de l'événement 'activate' pour recréer la fenêtre si toutes les fenêtres sont fermées
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Gestion de l'événement 'window-all-closed' pour quitter l'application lorsque toutes les fenêtres sont fermées, sauf sur macOS
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
