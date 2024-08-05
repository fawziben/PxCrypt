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
import { blue } from "@mui/material/colors";
import PasswordDialog from "./PasswordDialog";

async function updateImage(file, setEditImage, setParentImage) {
  try {
    let accessToken = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("image", file);

    const response = await axiosInstance.put(`users/current/image/`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      console.log("Image updated successfully");
      setEditImage(true);
      setParentImage(file);
    } else {
      console.log("Internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

async function updateFirstName(firstName, setEditName) {
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
    if (response.status === 200) {
      console.log("Name updated successfully");
      setEditName(true);
    } else {
      console.log("Internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

async function updateLastName(lastName, setEditLName) {
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
    if (response.status === 200) {
      console.log("Name updated successfully");
      setEditLName(true);
    } else {
      console.log("Internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

async function updateEmail(email, setEditEmail) {
  try {
    let accessToken = localStorage.getItem("token");

    const response = await axiosInstance.put(
      `users/current/email/`,
      { email: email },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Email updated successfully");
      setEditEmail(true);
    } else {
      console.log("Internal server error");
    }
  } catch (e) {
    alert(e);
  }
}

const UserProfile = ({ account, onClose, setParentImg, parentimg }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState(parentimg);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(account.email);
  const [editName, setEditName] = useState(true);
  const [editLName, setEditLName] = useState(true);
  const [editEmail, setEditEmail] = useState(true);
  const [editImage, setEditImage] = useState(true);

  async function getCurrentUser() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`users/current/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setEmail(response.data.email);
        setImage(response.data.img_src); // Update the local state with the latest image
      }
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    getCurrentUser(); // Fetch user data when the component mounts
  }, []);

  useEffect(() => {
    setImage(parentimg); // Update local image state when parentimg changes
  }, [parentimg]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setParentImg(reader.result);
        setEditImage(false); // Activer le bouton Done
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpdate = async () => {
    try {
      let accessToken = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", image);

      const response = await axiosInstance.put(
        `users/current/image/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Image updated successfully");
        setEditImage(true);
        // setImage(image);
        setParentImg(image); // Update parent image
      } else {
        console.log("Internal server error");
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Stack spacing={2} alignItems="center">
        <Box sx={{ position: "relative" }}>
          {parentimg ? (
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={parentimg}
              alt="Profile"
            />
          ) : (
            <Avatar
              sx={{ width: 100, height: 100, backgroundColor: blue[200] }}
            >
              <Typography sx={{ fontSize: "40px" }}>
                {firstName[0] + " " + lastName[0]}
              </Typography>
            </Avatar>
          )}
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
              {editImage ? (
                <Edit />
              ) : (
                <Done
                  onClick={handleImageUpdate} // Use the new function here
                />
              )}
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
                    height: "50px",
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
                    onClick={() => updateFirstName(firstName, setEditName)}
                  />
                )}
              </IconButton>
            </div>
            <div className="flex" style={{ alignItems: "center" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px",
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
                  <Done
                    onClick={() => updateLastName(lastName, setEditLName)}
                  />
                )}
              </IconButton>
            </div>
            <div className="flex" style={{ alignItems: "center" }}>
              <TextField
                sx={{
                  "& .MuiInputBase-root": {
                    height: "50px",
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
                  <Done onClick={() => updateEmail(email, setEditEmail)} />
                )}
              </IconButton>
            </div>

            <Button variant="contained" onClick={handleAddClick}>
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
      <PasswordDialog open={open} setOpen={setOpen} />
    </Box>
  );
};

export default UserProfile;
