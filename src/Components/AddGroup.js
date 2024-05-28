import { AddOutlined, AddReactionOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import AddGroupDialog from "./AddGroupDialog";
import { Fab } from "@mui/material";

const AddGroup = () => {
  const [open, setOpen] = useState(false);
  const handleAddClick = () => {
    setOpen(true);
  };

  return (
    <div style={{ position: "relative" }}>
      <Fab
        sx={{
          position: "absolute", // Utilisez "absolute" pour fixer le bouton en bas à droite du div
          bottom: "16px",
          right: "16px",
        }}
        color="primary"
        aria-label="add"
        onClick={handleAddClick}
      >
        <AddOutlined />
      </Fab>
      {open && <AddGroupDialog></AddGroupDialog>}
    </div>
  );
};

export default AddGroup;
