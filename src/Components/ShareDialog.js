import React, { useState } from "react";
import { ShareOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ShareTabs from "./ShareTabs";
import { axiosInstance } from "../AxiosInstance";

const ShareDialog = ({ file_id }) => {
  const [recipients, setRecipients] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [group, setGroup] = useState();

  async function ShareFile(recipientsData, file_id) {
    try {
      console.log(recipientsData);
      console.log(file_id);
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

      if (response.status === 200) alert("File shared successfully");
      setOpenDialog(false);
    } catch (e) {
      alert(`Error sharing file: ${e.response?.data?.detail || e.message}`);
    }
  }

  async function multipleFileShare(recipientsData, file_id) {
    try {
      let accessToken = localStorage.getItem("token");
      console.log("Recipients Data:", recipientsData); // Debug log
      console.log("File ID:", file_id); // Debug log

      const response = await axiosInstance.post(
        `files/group_share/${file_id.toString()}`,
        recipientsData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) alert("File shared successfully");
      setOpenDialog(false);
    } catch (e) {
      alert(`Error sharing file: ${e.response?.data?.detail || e.message}`);
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

    console.log("Selected Recipients:", selectedRecipients); // Debug log

    !group
      ? ShareFile(selectedRecipients, file_id)
      : multipleFileShare(selectedRecipients, file_id);
  };

  return (
    <div>
      <ShareOutlined onClick={handleShareClick} style={{ cursor: "pointer" }} />
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <ShareTabs
          file_id={file_id}
          recipients={recipients}
          setRecipients={setRecipients}
          setGroup={setGroup}
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
