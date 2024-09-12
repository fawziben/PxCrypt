import { DownloadingOutlined } from "@mui/icons-material";
import React from "react";

const DownloadButton = ({
  file_id,
  file_name,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
}) => {
  async function downloadFile(fileId, fileName) {
    try {
      let accessToken = localStorage.getItem("token");
      await window.electronAPI.downloadData(fileId, fileName, accessToken);
      setSnackbarMessage("File downloaded successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("An error occured while downloading the file");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Erreur lors du upload du fichier :", error);
    }
  }
  return (
    <div onClick={() => downloadFile(file_id, file_name)}>
      <DownloadingOutlined />
    </div>
  );
};

export default DownloadButton;
