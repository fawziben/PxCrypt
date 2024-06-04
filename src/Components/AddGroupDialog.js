import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { axiosInstance } from "../AxiosInstance";

const createNewGroup = async (title, description) => {
  try {
    const accessToken = localStorage.getItem("token");
    const response = await axiosInstance.post(
      `/groups/create`,
      { title: title, description: description },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Assurez-vous d'ajouter cet en-tête
        },
      }
    );
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la description du groupe :",
      error
    );
  }
};

export default function AddGroupDialog({ open, setOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCreateGroup = () => {
    createNewGroup(title, description);
    handleCloseDialog();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleCloseDialog}>
        <div className="w-[400px]">
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Add a new group
          </DialogTitle>
          <DialogContent>
            <TextField
              sx={{ width: "100%" }}
              label="Group Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              minRows={3}
            />
            <br />
            <br />
            <TextField
              sx={{ width: "100%" }}
              label="Group Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateGroup} variant="contained">
              Create
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
