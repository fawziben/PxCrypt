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
    alert(file_id);
    const response = await axiosInstance.post(
      `files/share/${file_id.toString()}`,
      users_id,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Vérifiez si la réponse est valide et contient des données
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

    alert(selectedRecipientIds[0]);
    ShareFile(selectedRecipientIds, file_id);

    // Utilisez selectedRecipientIds dans votre requête
    // Par exemple :
    // axios.post('/share', { recipientIds: selectedRecipientIds });
  };
  return (
    <div>
      <ShareOutlined onClick={handleShareClick} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Users List</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <UsersList
            recipients={recipients}
            setRecipients={setRecipients}
          ></UsersList>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={Share}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareDialog;
