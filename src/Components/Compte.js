import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Avatar, IconButton, Popover } from "@mui/material";
import myImg from "../Components/IMG_7271.jpg";
import UserProfile from "./UserProfile"; // Import the UserProfile component

// ----------------------------------------------------------------------

export default function Compte() {
  // Définir un compte statique pour les tests
  const account = {
    username: "Fawzi Ben",
    email: "admin@gmail.com",
    image: myImg,
    type: "chercheur",
  };

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar sx={{ backgroundColor: "#C27821" }}>
          <img src={myImg} alt="Profile" />
        </Avatar>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 300, // Adjusted width to fit content
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <UserProfile account={account} onClose={handleClose} />
      </Popover>
    </>
  );
}
