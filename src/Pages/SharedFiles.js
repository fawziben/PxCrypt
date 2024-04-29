import React, { useEffect, useState } from "react";
import ReceivedFilesTable from "../Components/ReceivedFilesTable";
import SingleTab from "../Components/SingleTab";
import { axiosInstance } from "../AxiosInstance";
import Message from "../Components/Message";

export default function SharedFiles() {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  async function getSharedFiles() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get("/files/shared", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response.status === 200) {
        setSharedFiles(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setSnackbarOpen(true);
      } else {
        alert("Internal Server Error");
      }
    }
  }

  useEffect(() => {
    getSharedFiles();
  }, []);

  return (
    <div
      style={{ marginTop: "100px", padding: 0, width: "100%" }}
      className="overflow-y-hidden"
    >
      <SingleTab title="Received">
        <ReceivedFilesTable sharedFiles={sharedFiles} />
      </SingleTab>
      <Message
        open={snackbarOpen}
        message="No Shared files with you"
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
