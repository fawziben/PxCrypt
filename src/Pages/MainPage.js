import React, { useState, useEffect } from "react";
import MainPageTabs from "../Components/MainPageTabs";
import LocalFilesTable from "../Components/LocalFilesTable";
import UploadeFilesTable from "../Components/UploadedFilesTable";
import KeyFab from "../Components/KeyFab";

export default function MainPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(sessionStorage.getItem("id")); // Replace with actual user ID from your authentication system
    const storedData = localStorage.getItem(`fileData_${userId}`);
    alert(userId);
    if (storedData) {
      setFileData(JSON.parse(storedData));
    } else {
      localStorage.setItem(`fileData_${userId}`, JSON.stringify([]));

      // Uncomment and adjust if retrieving from API
      // window.electronAPI.filePaths().then((result) => {
      //   setFileData(result);
      //   setIsDataLoaded(true);
      //   localStorage.setItem(`fileData_${userId}`, JSON.stringify(result));
      // });
    }
  }, [userId]);

  const updateFileData = (newFileData) => {
    setFileData((prevFileData) => {
      const updatedData = [...prevFileData, newFileData];
      localStorage.setItem(`fileData_${userId}`, JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const removeFileData = (filePathToRemove) => {
    filePathToRemove = String(filePathToRemove);
    const indexToRemove = fileData.findIndex(
      (item) => String(item.path) === filePathToRemove
    );

    if (indexToRemove === -1) {
      console.error("Le chemin du fichier n'a pas été trouvé dans fileData");
      return;
    }

    const updatedData = fileData.filter((_, index) => index !== indexToRemove);
    setFileData(updatedData);
    localStorage.setItem(`fileData_${userId}`, JSON.stringify(updatedData));
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
      <KeyFab updateFileData={updateFileData} />
    </div>
  );
}
