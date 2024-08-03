import React, { useState, useEffect } from "react";
import path from "path-browserify";

const LocalFileViewer = ({ file_path }) => {
  const [fileUrl, setFileUrl] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [unsupported, setUnsupported] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    const fileNameWithoutExtension = file_path.replace(/\.[^/.]+$/, "");

    const fetchFileData = async () => {
      try {
        const result = await window.electronAPI.viewData(
          file_path,
          accessToken
        );

        const supportedTypes = [
          "pdf",
          "jpg",
          "jpeg",
          "png",
          "gif",
          "txt",
          "docx",
          "xlsx",
        ];
        const getValidExtension = (filePath) => {
          const parts = filePath.split(".");
          for (let i = parts.length - 1; i >= 0; i--) {
            const ext = parts[i].toLowerCase();
            if (supportedTypes.includes(ext)) {
              setType(ext);
              return ext;
            }
          }
          return "";
        };

        const ext = getValidExtension(file_path);
        console.log(ext);
        setType(ext);
        setName(fileNameWithoutExtension);

        if (supportedTypes.includes(ext)) {
          const blob = new Blob([result.data], { type: result.mimeType });
          const fileUrl = URL.createObjectURL(blob);
          setFileUrl(fileUrl);
        } else {
          setUnsupported(true);
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchFileData();
  }, [file_path]);

  if (!fileUrl) {
    return <div>Chargement en cours...</div>;
  }

  if (unsupported) {
    return (
      <div>
        <p>Type de fichier non pris en charge pour l'affichage.</p>
        <a href={fileUrl} download={file_path}>
          Télécharger le fichier
        </a>
      </div>
    );
  }

  const mimeType =
    {
      pdf: "application/pdf",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      txt: "text/plain",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }[type] || "application/octet-stream";

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mimeType.startsWith("image/") ? (
        <img
          src={fileUrl}
          alt={name}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
        />
      ) : mimeType === "application/pdf" || mimeType === "text/plain" ? (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title={name}
        />
      ) : (
        <div>
          <p>
            Affichage non pris en charge pour ce type de fichier. Vous pouvez le
            télécharger ci-dessous :
          </p>
          <a href={fileUrl} download={file_path}>
            Télécharger {name}
          </a>
        </div>
      )}
    </div>
  );
};

export default LocalFileViewer;
