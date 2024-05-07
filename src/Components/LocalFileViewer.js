import React, { useState, useEffect } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import path from "path-browserify";

const LocalFileViewer = ({ file_path }) => {
  const [fileData, setFileData] = useState(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    let accessToken = localStorage.getItem("token");
    const fileNameWithoutExtension = file_path.replace(/\.[^/.]+$/, ""); // Supprimer l'extension
    const ext = path.extname(fileNameWithoutExtension).slice(1);
    setType(ext);
    setName(fileNameWithoutExtension);
    window.electronAPI.viewData(file_path, accessToken).then((result) => {
      let blob = new Blob([result]); // Adjust the MIME type as needed
      setFileData(blob);
    });
  }, []);
  if (!fileData) {
    return <div>Chargement en cours...</div>;
  }

  const docs = [
    {
      uri: URL.createObjectURL(fileData), // Utilisez l'URI généré pour le fichier
      fileType: type, // Remplacez par le type de fichier approprié
      fileName: name, // Remplacez par le nom du fichier
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />
    </div>
  );
};

export default LocalFileViewer;
