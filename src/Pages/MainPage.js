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
  };

  const removeFileData = (filePathToRemove) => {
    // Assurez-vous que filePathToRemove est une chaîne
    filePathToRemove = String(filePathToRemove);

    // Recherche de l'index de l'élément à supprimer en fonction du chemin du fichier
    const indexToRemove = fileData.findIndex(
      (item) => String(item.path) === filePathToRemove
    );
    alert(indexToRemove);

    // Vérifier si l'index a été trouvé
    if (indexToRemove === -1) {
      console.error("Le chemin du fichier n'a pas été trouvé dans fileData");
      return;
    }

    // Créer une copie de fileData sans l'élément à supprimer
    const updatedData = fileData.filter((_, index) => index !== indexToRemove);

    // Mettre à jour fileData
    setFileData(updatedData);

    // Mettre à jour sessionStorage
    sessionStorage.setItem("fileData", JSON.stringify(updatedData));
  };

  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <MainPageTabs title1="Local" title2="Uploaded">
        <LocalFilesTable fileData={fileData} removeFileData={removeFileData} />
        <FoldersTable />
      </MainPageTabs>
      <KeyFab updateFileData={updateFileData}></KeyFab>
    </div>
  );
}
