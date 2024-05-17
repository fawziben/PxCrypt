import React, { useState } from "react";
import { ShareOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UsersList from "./UsersList";
import { axiosInstance } from "../AxiosInstance";

async function ShareFile(users_id, file_id) {
  try {
    let accessToken = localStorage.getItem("token");
    const response = await axiosInstance.post(
      `files/share/${file_id.toString()}`,
      users_id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200) alert("file shared successfully");
  } catch (e) {
    alert(e);
  }
}

const ShareDialog = ({ file_id }) => {
  const [recipients, setRecipients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleShareClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Share = () => {
    const selectedRecipientIds = recipients
      .filter((recipient) => recipient.state)
      .map((recipient) => recipient.id);

    ShareFile(selectedRecipientIds, file_id);
  };

  return (
    <div>
      <ShareOutlined onClick={handleShareClick} style={{ cursor: "pointer" }} />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle>Partager le fichier</DialogTitle>
        <DialogContent sx={{ width: "500px", height: "300px" }}>
          <UsersList
            file_id={file_id}
            recipients={recipients}
            setRecipients={setRecipients}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={Share}>
            Partager
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareDialog;
