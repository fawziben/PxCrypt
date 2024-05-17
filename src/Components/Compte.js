import { useState } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";

// ----------------------------------------------------------------------

export default function Compte() {
  // Définir un compte statique pour les tests
  const account = {
    username: "testuser",
    email: "testuser@example.com",
    image: "/path/to/static/image.jpg",
    type: "chercheur",
  };

  const [url] = useState(""); // URL statique ou vide
  const [open, setOpen] = useState(null);

  const MENU_OPTIONS = [
    {
      label: "Accueil",
      icon: "eva:person-fill",
      url: "/" + account.type,
    },
    {
      label: "Profil",
      icon: "eva:person-fill",
      url: "/" + account.type + "/profile",
    },
  ];

  if (account.type === "chercheur") {
    MENU_OPTIONS.push({
      label: "Enregistrements",
      icon: "eva:settings-2-fill",
      url: "/chercheur/enregistrements",
    });
    MENU_OPTIONS.push({
      label: "Favoris",
      icon: "eva:settings-2-fill",
      url: "/chercheur/favoris",
    });
  }

  MENU_OPTIONS.push({
    label: "Paramètres",
    icon: "eva:settings-2-fill",
    url: "/" + account.type + "/paramètres",
  });

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleItemClick = (item) => {
    window.location.href = item.url;
  };

  const deconnexion = () => {
    window.location.href = "/";
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
        <Avatar sx={{ backgroundColor: "#C27821" }}>FB</Avatar>
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
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleItemClick(option)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={deconnexion} sx={{ m: 1 }}>
          Déconnexion
        </MenuItem>
      </Popover>
    </>
  );
}
