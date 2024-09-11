import { KeyOffOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import CustomSnackbar from "./CustomSnackbar"; // Importez votre composant CustomSnackbar

const DecryptButton = ({ file_path, removeFileData }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false); // État pour gérer l'ouverture du Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // État pour gérer le message du Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // État pour gérer la sévérité du Snackbar

  async function decrypt(filepath) {
    try {
      let accessToken = localStorage.getItem("token");
      await window.electronAPI.decryptData(filepath, accessToken);
      removeFileData(filepath); // Supprimez la ligne après le déchiffrement réussi

      // Afficher un message de succès
      setSnackbarMessage("File decrypted successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erreur lors du déchiffrement du fichier :", error);

      // Afficher un message d'erreur
      setSnackbarMessage("Error decrypting file. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false); // Fermer le Snackbar
  };

  return (
    <div>
      <div onClick={() => decrypt(file_path)}>
        <KeyOffOutlined />
      </div>
      {/* Utilisation du composant CustomSnackbar */}
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positionnez le Snackbar à gauche
      />
    </div>
  );
};

export default DecryptButton;
