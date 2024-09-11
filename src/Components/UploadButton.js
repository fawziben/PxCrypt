import React, { useState } from "react";
import { UploadFileOutlined } from "@mui/icons-material";
import { axiosInstance } from "../AxiosInstance";
import CustomSnackbar from "./CustomSnackbar"; // Importez le composant CustomSnackbar

const UploadButton = ({ file_path }) => {
  const [storage, setStorage] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  async function getRemainingStorage() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`users/storage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        const remainingStorage =
          response.data.total_storage - response.data.total_used;
        setStorage(remainingStorage);
        return remainingStorage;
      }
    } catch (e) {
      setSnackbarMessage("Error retrieving storage information");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return 0; // Return 0 or any default value in case of error
    }
  }

  async function uploadFile(filepath) {
    try {
      const remainingStorage = await getRemainingStorage(); // Ensure storage is updated
      setSnackbarMessage(`Remaining storage: ${remainingStorage}`);
      setSnackbarSeverity("info");
      setSnackbarOpen(true);

      let accessToken = localStorage.getItem("token");

      const res = await window.electronAPI.uploadData(
        filepath,
        "AES_256",
        accessToken,
        remainingStorage
      );
      console.log(res.data);
      if (!res) {
        setSnackbarMessage("Insufficient storage");
        setSnackbarSeverity("error");
      } else if (res == 400) {
        setSnackbarMessage("File Already uploaded");
        setSnackbarSeverity("error");
      } else if (res == 200) {
        setSnackbarMessage("Upload successful");
        setSnackbarSeverity("success");
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Error during file upload");
      setSnackbarSeverity("error");
      console.error("Error during file upload:", error);
      setSnackbarOpen(true);
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div onClick={() => uploadFile(file_path)}>
        <UploadFileOutlined />
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};

export default UploadButton;
