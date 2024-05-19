import React, { useState } from "react";
import { ShareOutlined } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UsersList from "./UsersList";
import { axiosInstance } from "../AxiosInstance";

const ShareDialog = ({ file_id }) => {
  const [recipients, setRecipients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  async function ShareFile(recipientsData, file_id) {
    try {
      let accessToken = localStorage.getItem("token");
      const response = await axiosInstance.post(
        `files/share/${file_id.toString()}`,
        recipientsData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) alert("file shared successfully");
      setOpenDialog(false);
    } catch (e) {
      alert(e);
    }
  }

  const handleShareClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const Share = () => {
    const selectedRecipients = recipients
      .filter((recipient) => recipient.state)
      .map((recipient) => ({
        id: recipient.id,
        download: recipient.download,
        message: recipient.message,
      }));

    ShareFile(selectedRecipients, file_id);
  };

  return (
    <div>
      <ShareOutlined onClick={handleShareClick} style={{ cursor: "pointer" }} />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <DialogTitle sx={{ marginLeft: "auto", marginRight: "auto" }}>
          Partager le fichier
        </DialogTitle>
        <UsersList
          file_id={file_id}
          recipients={recipients}
          setRecipients={setRecipients}
        />
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
