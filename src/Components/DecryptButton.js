import { KeyOffOutlined } from "@mui/icons-material";
import React from "react";

const DecryptButton = ({ file_path, removeFileData }) => {
  async function decrypt(filepath) {
    try {
      let accessToken = localStorage.getItem("token");
      await window.electronAPI.decryptData(filepath, accessToken);
      removeFileData(filepath); // Supprimez la ligne après le déchiffrement réussi
    } catch (error) {
      console.error("Erreur lors du déchiffrement du fichier :", error);
      // Gérez ici les erreurs de déchiffrement
    }
  }
  return (
    <div onClick={() => decrypt(file_path)}>
      {" "}
      <KeyOffOutlined />
    </div>
  );
};

export default DecryptButton;
