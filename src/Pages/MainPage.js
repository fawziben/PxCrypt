import React, { useState, useEffect } from "react";
import MainPageTabs from "../Components/MainPageTabs";
import LocalFilesTable from "../Components/LocalFilesTable";
import FoldersTable from "../Components/FoldersTable";
import KeyFab from "../Components/KeyFab";

export default function MainPage() {
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    // Vérifiez si les données sont déjà stockées dans le localStorage
    const storedData = sessionStorage.getItem("fileData");
    if (storedData) {
      // Si les données sont présentes, initialisez fileData avec ces données
      setFileData(JSON.parse(storedData));
    } else {
      // Sinon, récupérez les données de l'API Electron
      window.electronAPI.filePaths().then((result) => {
        setFileData(result);
        sessionStorage.setItem("fileData", JSON.stringify(result));
      });
    }
  }, []); // Passer un tableau vide en deuxième argument pour que cet effet ne se déclenche qu'une fois

  const updateFileData = (newFileData) => {
    const updatedData = [...fileData, newFileData];
    setFileData(updatedData);
    sessionStorage.setItem("fileData", JSON.stringify(updatedData)); // Use updatedData here
    alert(sessionStorage.getItem("fileData")); // Add this line
  };
  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <MainPageTabs title1="Files" title2="Folders">
        <LocalFilesTable fileData={fileData} />
        <FoldersTable />
      </MainPageTabs>
      <KeyFab updateFileData={updateFileData}></KeyFab>
    </div>
  );
}
