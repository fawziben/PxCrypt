import { DeleteOutline } from "@mui/icons-material";
import React from "react";
import { axiosInstance } from "../AxiosInstance";

export default function DeleteButton({ file_id, handleDelete, code }) {
  async function deleteFile(file_id) {
    try {
      let accessToken = localStorage.getItem("token");
      alert(file_id);

      let endpoint;
      if (code === 1) {
        endpoint = `files/uploaded/delete/${file_id}`;
      } else if (code === 2) {
        endpoint = `files/shared/delete/${file_id}`;
      } else {
        // Gérer d'autres valeurs de code si nécessaire
        throw new Error("Invalid code value");
      }

      const response = await axiosInstance.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response.status === 200) alert("deleted successfully");
      handleDelete(file_id);
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div onClick={() => deleteFile(file_id)}>
      <DeleteOutline></DeleteOutline>
    </div>
  );
}
