import React, { useState } from "react";
import CryptOptions from "./CryptOptions";
import { ShareOutlined } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UsersList from "./UsersList";

const ShareDialog = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleShareClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <ShareOutlined onClick={handleShareClick} />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent sx={{ width: "400px" }}>
          <UsersList></UsersList>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined">Share</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ShareDialog;
