import React, { useState } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import CryptOptions from "./CryptOptions";

export default function KeyFab({
  updateFileData,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
}) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleFabClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <div>
      <Fab
        sx={{
          position: "fixed",
          bottom: "16px", // Ajustez la position verticale en fonction de vos besoins
          right: "16px", // Ajustez la position horizontale en fonction de vos besoins
        }}
        color="primary"
        aria-label="add"
        onClick={handleFabClick}
      >
        <KeyOutlinedIcon />
      </Fab>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Options</DialogTitle>
        <DialogContent>
          <CryptOptions
            updateFileData={updateFileData}
            setOpenDialog={setOpenDialog}
            setSnackbarMessage={setSnackbarMessage}
            setSnackbarSeverity={setSnackbarSeverity}
            setSnackbarOpen={setSnackbarOpen}
          ></CryptOptions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
