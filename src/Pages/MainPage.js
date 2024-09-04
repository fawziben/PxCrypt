import React, { useState, useEffect } from "react";
import MainPageTabs from "../Components/MainPageTabs";
import LocalFilesTable from "../Components/LocalFilesTable";
import UploadeFilesTable from "../Components/UploadedFilesTable";
import KeyFab from "../Components/KeyFab";

export default function MainPage({ searchVal }) {
  const [search, setSearch] = useState("");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Set the user ID from session storage
    const id = sessionStorage.getItem("id"); // Replace with actual user ID from your authentication system
    setUserId(id);
  }, []); // Run only once when the component mounts

  useEffect(() => {
    if (userId) {
      // Load file data if user ID is available
      const storedData = localStorage.getItem(`fileData_${userId}`);
      if (storedData) {
        setFileData(JSON.parse(storedData));
      } else {
        localStorage.setItem(`fileData_${userId}`, JSON.stringify([]));
      }
      setIsDataLoaded(true);
    }
  }, [userId]); // Run whenever userId changes

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
        {isDataLoaded ? (
          <LocalFilesTable
            searchVal={searchVal}
            fileData={fileData}
            removeFileData={removeFileData}
            isDataLoaded={isDataLoaded}
          />
        ) : (
          <h1>Loading...</h1>
        )}
        <UploadeFilesTable searchVal={searchVal} />
      </MainPageTabs>
      <KeyFab updateFileData={updateFileData} />
    </div>
  );
}
