import React, { useState, useEffect } from "react";
import MainPageTabs from "../Components/MainPageTabs";
import LocalFilesTable from "../Components/LocalFilesTable";
import UploadeFilesTable from "../Components/UploadedFilesTable";
import KeyFab from "../Components/KeyFab";

export default function MainPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false); // État pour suivre si les données sont chargées ou non
  const [fileData, setFileData] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("fileData");
    // localStorage.setItem("fileData", JSON.stringify(""));

    if (storedData) {
      setFileData(JSON.parse(storedData));
    } else {
      localStorage.setItem("fileData", JSON.stringify(""));

      //   // Sinon, récupérez les données de l'API Electron
      //   window.electronAPI.filePaths().then((result) => {
      //     setFileData(result);
      //     setIsDataLoaded(true);
      //     localStorage.setItem("fileData", JSON.stringify(result));
      //   });
    }
  }, []); // Passer un tableau vide en deuxième argument pour que cet effet ne se déclenche qu'une fois

  const updateFileData = (newFileData) => {
    setFileData((prevFileData) => {
      const updatedData = [...prevFileData, newFileData];
      localStorage.setItem("fileData", JSON.stringify(updatedData));
      return updatedData;
    });
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

    localStorage.setItem("fileData", JSON.stringify(updatedData));
  };
  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <MainPageTabs title1="Local" title2="Uploaded">
        <LocalFilesTable
          fileData={fileData}
          removeFileData={removeFileData}
          isDataLoaded={isDataLoaded}
        />
        <UploadeFilesTable />
      </MainPageTabs>
      <KeyFab updateFileData={updateFileData}></KeyFab>
    </div>
  );
}
