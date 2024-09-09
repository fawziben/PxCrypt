import { UploadFileOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import { axiosInstance } from "../AxiosInstance";

const UploadButton = ({ file_path }) => {
  const [storage, setStorage] = useState(0);

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
      alert(e);
      return 0; // Return 0 or any default value in case of error
    }
  }

  async function uploadFile(filepath) {
    try {
      const remainingStorage = await getRemainingStorage(); // Ensure storage is updated
      alert(`Remaining storage: ${remainingStorage}`); // Verify the storage value

      let accessToken = localStorage.getItem("token");
      alert("Uploading file...");

      const res = await window.electronAPI.uploadData(
        filepath,
        "AES_256",
        accessToken,
        remainingStorage
      );

      alert(res);
      if (!res) {
        alert("Stockage insuffisant");
      } else {
        alert("Upload réussi");
      }
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
