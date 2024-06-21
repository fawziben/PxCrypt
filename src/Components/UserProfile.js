import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  TextField,
  Stack,
  IconButton,
} from "@mui/material";

import { Done, Edit } from "@mui/icons-material";
import { axiosInstance } from "../AxiosInstance";

async function UpdateFName(firstName, setEditName) {
  try {
    let accessToken = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `users/current/name/`,
      { name: firstName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      console.log("name updated successfully");
      setEditName(true);
    } else {
      console.log("internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

async function UpdateLName(lastName, setEditLName) {
  try {
    let accessToken = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `users/current/lastname/`,
      { name: lastName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      console.log("name updated successfully");
      setEditLName(true);
    } else {
      console.log("internal server error");
    }
  } catch (e) {
    alert(e);
  }
}
async function UpdateEmail(mail, setEditEmail) {
  try {
    let accessToken = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `users/current/email/`,
      { email: mail },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status == 200) {
      console.log("name updated successfully");
      setEditEmail(true);
    } else {
      console.log("internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

const UserProfile = ({ account, onClose }) => {
  async function getCurrentUser() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`users/current/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status == 200) {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
      }
    } catch (e) {
      alert(e);
    }
  }
  useEffect(() => {
    getCurrentUser();
  }, []);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(account.image);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState(account.email);
  const [editName, setEditName] = useState(true);
  const [editLName, setEditLName] = useState(true);
  const [editEmail, setEditEmail] = useState(true);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Add save logic here
    setEditMode(false);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Stack spacing={2} alignItems="center">
        <Box sx={{ position: "relative" }}>
          <Avatar sx={{ width: 100, height: 100 }} src={image} alt="Profile" />
          {editMode && (
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                bgcolor: "background.paper",
                "&:hover": {
                  bgcolor: "grey.300",
                },
              }}
            >
              <Edit />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </IconButton>
          )}
        </Box>
        <Typography variant="h6">{firstName}</Typography>
        <Typography variant="body2">{email}</Typography>
        {editMode ? (
          <>
            <div className="flex" style={{ alignItems: "center" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px", // Set your desired height here
                  },
                }}
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                disabled={editName}
              />
              <IconButton
                component="label"
                sx={{
                  marginLeft: "20px",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "grey.300",
                  },
                }}
              >
                {editName ? (
                  <Edit onClick={() => setEditName(false)} />
                ) : (
                  <Done
                    onClick={() => {
                      UpdateFName(firstName, setEditName);
                    }}
                  />
                )}
              </IconButton>{" "}
            </div>
            <div className="flex" style={{ alignItems: "center" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px", // Set your desired height here
                  },
                }}
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                disabled={editLName}
              />
              <IconButton
                component="label"
                sx={{
                  marginLeft: "20px",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "grey.300",
                  },
                }}
              >
                {editLName ? (
                  <Edit onClick={() => setEditLName(false)} />
                ) : (
                  <Done onClick={() => UpdateLName(lastName, setEditLName)} />
                )}
              </IconButton>{" "}
            </div>
            <div className="flex" style={{ alignItems: "center" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px", // Set your desired height here
                  },
                }}
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                disabled={editEmail}
              />
              <IconButton
                component="label"
                sx={{
                  marginLeft: "20px",
                  bgcolor: "background.paper",
                  "&:hover": {
                    bgcolor: "grey.300",
                  },
                }}
              >
                {editEmail ? (
                  <Edit onClick={() => setEditEmail(false)} />
                ) : (
                  <Done onClick={() => UpdateEmail(email, setEditEmail)} />
                )}
              </IconButton>{" "}
            </div>

            <Button variant="contained" onClick={handleSaveClick}>
              Reset Password
            </Button>
            <Button variant="outlined" onClick={handleCancelClick}>
              Cancel
            </Button>
          </>
        ) : (
          <Button variant="outlined" onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default UserProfile;
