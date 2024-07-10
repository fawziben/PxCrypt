import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Box,
  List,
  Switch,
  Button,
  Typography,
  Divider,
  Popover,
  IconButton,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { FaCog } from "react-icons/fa";
import { axiosInstance } from "../AxiosInstance";
import TFADialog from "./TFADialog";

const STATIC_SETTINGS = [
  {
    _id: "1",
    label: "Double authentification",
    checked: false,
  },
];

export default function Settings() {
  useEffect(() => {
    getCurrentUser();
  }, []);

  const [TFA, setTFA] = useState();

  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function getCurrentUser() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`users/current/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setTFA(response.data.TFA);
      }
    } catch (e) {
      alert(e);
    }
  }

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleToggle = () => {
    setTFA(!TFA);
    setOpenDialog(true);
  };

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <FaCog />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Settings</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              Général
            </ListSubheader>
          }
        >
          <ListItem>
            <ListItemText primary="Double authentification" />
            <ListItemSecondaryAction>
              <Switch edge="end" onChange={handleToggle} checked={TFA} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Popover>
      <TFADialog
        open={openDialog}
        setOpen={setOpenDialog}
        TFA={TFA}
        setTFA={setTFA}
      ></TFADialog>
    </>
  );
}
