import { DownloadingOutlined } from "@mui/icons-material";
import React from "react";

const DownloadButton = ({ file_id, file_name }) => {
  async function downloadFile(fileId, fileName) {
    try {
      let accessToken = localStorage.getItem("token");
      alert("done");
      await window.electronAPI.downloadData(fileId, fileName, accessToken);
      alert("done");
    } catch (error) {
      console.error("Erreur lors du upload du fichier :", error);
      // Gérez ici les erreurs de déchiffrement
    }
  }
  return (
    <div onClick={() => downloadFile(file_id, file_name)}>
      <DownloadingOutlined />
    </div>
  );
};

export default DownloadButton;
