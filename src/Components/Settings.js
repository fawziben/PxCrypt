import PropTypes from "prop-types";
import { useState } from "react";
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

const STATIC_SETTINGS = [
  {
    _id: "1",
    label: "Double authentification",
    checked: false,
  },
];

export default function Settings() {
  const [settings, setSettings] = useState(STATIC_SETTINGS);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleToggle = (id) => {
    setSettings(
      settings.map((setting) =>
        setting._id === id ? { ...setting, checked: !setting.checked } : setting
      )
    );
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
          {settings.map((setting) => (
            <SettingItem
              key={setting._id}
              setting={setting}
              onToggle={handleToggle}
            />
          ))}
        </List>
      </Popover>
    </>
  );
}

SettingItem.propTypes = {
  setting: PropTypes.shape({
    _id: PropTypes.string,
    label: PropTypes.string,
    checked: PropTypes.bool,
  }),
  onToggle: PropTypes.func,
};

function SettingItem({ setting, onToggle }) {
  return (
    <ListItem>
      <ListItemText primary={setting.label} />
      <ListItemSecondaryAction>
        <Switch
          edge="end"
          onChange={() => onToggle(setting._id)}
          checked={setting.checked}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
}
