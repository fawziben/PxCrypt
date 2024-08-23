import React, { useState, useEffect } from "react";
import { renderAsync } from "docx-preview"; // For DOCX rendering
import * as XLSX from "xlsx"; // For XLSX rendering

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

  useEffect(() => {
    if (type === "docx") {
      const fetchDocxFile = async () => {
        try {
          const response = await fetch(fileUrl);
          const buffer = await response.arrayBuffer();
          const container = document.getElementById("docx-container");
          await renderAsync(buffer, container);
        } catch (error) {
          console.error("Erreur lors du rendu du fichier DOCX:", error);
        }
      };
      fetchDocxFile();
    } else if (type === "xlsx") {
      const fetchXlsxFile = async () => {
        try {
          const response = await fetch(fileUrl);
          const buffer = await response.arrayBuffer();
          const workbook = XLSX.read(buffer, { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const htmlString = XLSX.utils.sheet_to_html(worksheet);
          document.getElementById("xlsx-container").innerHTML = htmlString;

          // Apply styles for borders
          const tableElement = document.querySelector("#xlsx-container table");
          if (tableElement) {
            tableElement.style.borderCollapse = "collapse";
            const allCells = tableElement.querySelectorAll("td, th");
            allCells.forEach((cell) => {
              cell.style.border = "1px solid black"; // Add border to all cells
              cell.style.padding = "5px"; // Add some padding for better readability
            });
          }
        } catch (error) {
          console.error("Erreur lors du rendu du fichier XLSX:", error);
        }
      };
      fetchXlsxFile();
    }
  }, [fileUrl, type]);

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
      ) : mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
        <div
          id="docx-container"
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto", // Enable scrolling
            border: "1px solid #ccc", // Optional styling
            padding: "10px", // Optional padding for better readability
          }}
        />
      ) : mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? (
        <div
          id="xlsx-container"
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto", // Enable scrolling for large spreadsheets
            border: "1px solid #ccc", // Optional styling
            padding: "10px", // Optional padding for better readability
          }}
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
