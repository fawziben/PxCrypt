import { DeleteOutline } from "@mui/icons-material";
import React from "react";
import { axiosInstance } from "../AxiosInstance";

export default function DeleteButton({
  file_id,
  handleDelete,
  code,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
}) {
  async function deleteFile(file_id) {
    try {
      let accessToken = localStorage.getItem("token");

      let endpoint;
      if (code === 1) {
        endpoint = `files/uploaded/delete/${file_id}`;
      } else if (code === 2) {
        endpoint = `files/shared/delete/${file_id}`;
      } else {
        throw new Error("Invalid code value");
      }

      const response = await axiosInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 204) {
        // Mettre à jour l'UI pour supprimer le fichier
        handleDelete(file_id);

        // Afficher un message de succès dans le Snackbar
        setSnackbarMessage("File deleted successfully");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }
    } catch (e) {
      // Afficher un message d'erreur dans le Snackbar
      setSnackbarMessage("Error deleting file");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  return (
    <div onClick={() => deleteFile(file_id)}>
      <DeleteOutline />
    </div>
  );
}
