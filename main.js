// Import des modules Electron nécessaires
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const dialog = electron.dialog;
const path = require("path"); // Import du module path pour gérer les chemins de fichiers
const isDev = app.isPackaged ? false : require("electron-is-dev");
const fs = require("fs");
const { exec } = require("child_process");
const axios = require("axios");
const FormData = require("form-data");

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
axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

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

          return { path, size: size, accessDate: formattedAccessDate }; // Créer un objet avec les clés "path", "size" et "accessDate"
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
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.on("closed", () => (win = null));
}

// ipcMain.handle("file-paths", (event) => {
//   return paths;
// });
// Écouteur d'événement pour l'événement 'logged-successfully'
ipcMain.on("logged-successfully", (event) => {
  // Redimensionnement de la fenêtre et centrage
  win.setSize(1000, 600);
  win.center();
});

ipcMain.on("replace-data", (event, data, filePath) => {
  const newFilePath = `${filePath}.pxc`;

  fs.rename(filePath, newFilePath, (err) => {
    if (err) {
      console.log("Error renaming file:", err);
      return;
    }

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

ipcMain.handle("decrypt-data", async (event, filePath, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axiosInstance.post("/decrypt", formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "arraybuffer",
      responseEncoding: "binary",
    });
    const newFilePath = filePath.replace(/\.pxc$/, "");
    fs.rename(filePath, newFilePath, (err) => {
      if (err) {
        console.log("Error renaming file:", err);
        return;
      }
      const bufferData = Buffer.from(response.data);
      fs.writeFile(newFilePath, bufferData, "binary", (writeErr) => {
        if (writeErr) {
          console.log("Error writing file:", writeErr);
        } else {
          console.log("File written successfully.");
        }
      });
    });
    return response.data;
  } catch (error) {
    // Gérer les erreurs
    console.error("Erreur lors de l'envoi du fichier à l'API :", error);
    throw error;
  }
});

ipcMain.handle(
  "upload-data",
  async (event, filePath, algorithm, accessToken) => {
    try {
      const formData = new FormData();
      console.log(filePath);

      formData.append("file", fs.createReadStream(filePath));

      const response = await axiosInstance.post("/files/upload", formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
        responseEncoding: "binary",
      });
      return response.data;
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors de l'envoi du fichier à l'API :", error);
      throw error;
    }
  }
);
ipcMain.handle(
  "download-data",
  async (event, fileId, fileName, accessToken) => {
    try {
      // Faites une requête GET pour récupérer le fichier du serveur
      const formData = new FormData();
      const response = await axiosInstance.get(`/files/${fileId}`, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${accessToken}`,
        },
        responseType: "arraybuffer",
        responseEncoding: "binary",
      });

      // Extrayez le nom de fichier sans l'extension
      const defaultFileName = path.basename(fileName, path.extname(fileName));

      // Afficher une boîte de dialogue pour choisir l'emplacement de téléchargement
      const { filePath } = await dialog.showSaveDialog({
        defaultPath: defaultFileName, // Nom par défaut du fichier à télécharger sans l'extension
      });

      if (!filePath) {
        console.log("Téléchargement annulé par l'utilisateur.");
        return; // Arrêter le téléchargement si l'utilisateur annule
      }

      // Enregistrer le fichier au chemin choisi par l'utilisateur
      fs.writeFile(
        filePath,
        Buffer.from(response.data),
        "binary",
        (writeErr) => {
          if (writeErr) {
            console.log("Erreur lors de l'écriture du fichier :", writeErr);
          } else {
            console.log("Fichier écrit avec succès :", filePath);
          }
        }
      );

      // Retournez le chemin de téléchargement si nécessaire
      return {
        filePath: filePath,
      };
    } catch (error) {
      // Gérer les erreurs
      console.error("Erreur lors du téléchargement du fichier :", error);
      throw error;
    }
  }
);
// Surveiller les événements de lancement de fichiers
app.on("open-file", (event, filePath) => {
  console.log(filePath);
});

ipcMain.handle("view-data", async (event, filePath, accessToken) => {
  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));
    const response = await axiosInstance.post("/view", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      responseType: "arraybuffer",
    });

    const mimeType = response.headers["content-type"];
    return { data: response.data, mimeType };
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    throw error;
  }
});
app.whenReady().then(() => {
  // Création d'une promesse pour exécuter runInBackground
  // const runInBackgroundPromise = new Promise((resolve, reject) => {
  //   // Exécution de runInBackground avec une fonction de rappel pour obtenir les données
  //   runInBackground((fileData) => {
  //     paths = fileData;
  //     console.log(fileData);
  //     resolve(); // Résoudre la promesse une fois runInBackground terminé
  //   });
  // });

  // Attente de la résolution de la promesse avant de créer la fenêtre principale
  // runInBackgroundPromise.then(() => {
  createWindow();
  // });

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

//--------------------------------------------------------------------------------------------//
