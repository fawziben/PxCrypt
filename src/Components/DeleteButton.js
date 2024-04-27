import { DeleteOutline } from "@mui/icons-material";
import React from "react";
import { axiosInstance } from "../AxiosInstance";

export default function DeleteButton({ file_id, handleDelete }) {
  async function deleteFile(file_id) {
    try {
      let accessToken = localStorage.getItem("token");
      alert(file_id);
      const response = await axiosInstance.delete(`files/delete/${file_id}`, {
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
