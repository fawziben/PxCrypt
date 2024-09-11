import { KeyOffOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import CustomSnackbar from "./CustomSnackbar"; // Importez votre composant CustomSnackbar

const DecryptButton = ({
  file_path,
  removeFileData,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
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
    </div>
  );
};

export default DecryptButton;
