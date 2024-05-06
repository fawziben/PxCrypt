import React, { useState, useEffect } from "react";
import axios from "axios";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { axiosInstance } from "../AxiosInstance";

const FileViewer = ({ file_id }) => {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer le fichier depuis votre API
    let accessToken = localStorage.getItem("token");

    const fetchFileFromAPI = async () => {
      try {
        const response = await axiosInstance.get(`files/${file_id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: "blob", // Spécifiez le type de réponse comme blob
        });
        setFileData(response.data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchFileFromAPI();
  }, []);

  if (!fileData) {
    return <div>Chargement en cours...</div>;
  }

  const docs = [
    {
      uri: URL.createObjectURL(fileData), // Utilisez l'URI généré pour le fichier
      fileType: "pdf", // Remplacez par le type de fichier approprié
      fileName: "CV.pdf", // Remplacez par le nom du fichier
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default FileViewer;
