import { UploadFileOutlined } from "@mui/icons-material";
import React from "react";

const UploadButton = ({ file_path }) => {
  async function uploadFile(filepath) {
    try {
      let accessToken = localStorage.getItem("token");
      alert("done");
      await window.electronAPI.uploadData(filepath, "AES_256", accessToken);
      alert("done");
    } catch (error) {
      console.error("Erreur lors du upload du fichier :", error);
      // Gérez ici les erreurs de déchiffrement
    }
  }
  return (
    <div onClick={() => uploadFile(file_path)}>
      <UploadFileOutlined />
    </div>
  );
};

export default UploadButton;
