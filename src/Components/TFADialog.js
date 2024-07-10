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

export default function TFADialog({ open, setOpen, TFA, setTFA }) {
  const [oPassword, setOPassword] = useState("");

  const handleCloseDialog = () => {
    setOpen(false);
  };

  async function handleChange(oPassword) {
    try {
      let accessToken = localStorage.getItem("token");
      const response = await axiosInstance.put(
        `users/current/TFA/`,
        { name: oPassword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status == 200) {
        setTFA(TFA);
        alert("success");
        setOpen(false);
      } else {
        console.log("internal server error");
      }
    } catch (e) {
      alert(e);
    }
  }

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
            Unable Two Factor Authentification{" "}
          </DialogTitle>
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></DialogTitle>
          <DialogContent>
            <TextField
              sx={{ width: "100%" }}
              label="Enter Your Password"
              type="password"
              onChange={(e) => setOPassword(e.target.value)}
              minRows={3}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => handleChange(oPassword)}>
              Reset
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
