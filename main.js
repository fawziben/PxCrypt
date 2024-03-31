const { app, BrowserWindow, ipcMain } = require("electron"); // Import des modules Electron nécessaires
const path = require("path"); // Import du module path pour gérer les chemins de fichiers
const isDev = require("electron-is-dev"); // Import du module electron-is-dev pour détecter le mode de développement
const fs = require("fs");
const { exec } = require("child_process");

let win; // Déclaration de la variable pour stocker la fenêtre de l'application
let paths = null;
//-------------------------------------------------------------------------------------------------//

function convertSize(sizeInBytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function runInBackground(callback) {
  exec(
    "cmd /c for /R C:\\ %i in (*.pxc) do @echo %~fi %~zi %~ti",
    (error, stdout, stderr) => {
      if (error) {
        console.error("Erreur lors de l'exécution de la commande:", error);
        return;
      }
      if (stderr) {
        console.error("Erreur de sortie de la commande:", stderr);
        return;
      }

      // Séparer les lignes de sortie en un tableau de lignes
      const lines = stdout.trim().split("\n");

      // Créer un tableau pour stocker les objets de données des fichiers
      const fileData = lines
        .map((line) => {
          // Utiliser une expression régulière pour extraire les valeurs
          const matches = line.match(
            /^(.+?)\s+(\d+)\s+(\d+\/\d+\/\d+\s+\d+:\d+\s+[AP]M)\s*$/
          );
          if (!matches) {
            console.error("Format de ligne invalide:", line);
            return null;
          }

          // Extraire les valeurs du groupe de correspondance
          const path = matches[1];
          const size = matches[2];
          const accessDate = matches[3];

          // Formater la date dans le format requis ("March 28th 2024")
          const formattedAccessDate = new Date(accessDate).toLocaleDateString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              year: "numeric",
            }
          );

          // Convertir la taille en Ko, Mo ou Go
          const formattedSize = convertSize(parseInt(size));

          return { path, size: formattedSize, accessDate: formattedAccessDate }; // Créer un objet avec les clés "path", "size" et "accessDate"
        })
        .filter(Boolean); // Filtrer les éléments nuls

      // Appeler la fonction de rappel avec le tableau de données des fichiers
      callback(fileData);
    }
  );
}

// Appeler la fonction pour exécuter la commande en arrière-plan
//-------------------------------------------------------------------------------------------------//

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

ipcMain.handle("file-paths", (event) => {
  return paths;
});
// Écouteur d'événement pour l'événement 'logged-successfully'
ipcMain.on("logged-successfully", (event) => {
  // Redimensionnement de la fenêtre et centrage
  win.setSize(1000, 600);
  win.center();
});

ipcMain.on("replace-data", (event, data, filePath, operation) => {
  // Ajouter l'extension ".pxc" au nom du fichier
  const newFilePath =
    operation == "encrypt" ? `${filePath}.pxc` : filePath.replace(/\.pxc$/, "");

  // Renommer le fichier avec l'extension ".pxc"
  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      console.log("Error renaming file:", err);
      return;
    }

    // Write the data to the renamed file
    const bufferData = Buffer.from(data);
    fs.writeFile(newFilePath, bufferData, "binary", (writeErr) => {
      if (writeErr) {
        console.log("Error writing file:", writeErr);
      } else {
        console.log("File written successfully.");
      }
    });
  });
});

// Événement lorsque Electron est prêt
app.whenReady().then(() => {
  // Création de la fenêtre principale de l'application
  runInBackground((fileData) => {
    paths = fileData;
    console.log(fileData);
  });
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
