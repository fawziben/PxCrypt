import React from "react";
import PropTypes from "prop-types";
import { FaBell, FaCheck, FaClock, FaTag, FaTrash } from "react-icons/fa"; // Ajout de FaTrash pour l'icône de suppression
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

function NotificationItem({ notification, onMarkAsRead }) {
  const { avatar, title } = renderContent(notification);

  const handleNotificationClick = () => {
    onMarkAsRead(notification.id);
    if (notification.lien) {
      window.location.href = notification.lien;
    }
  };

  return (
    <ListItemButton
      onClick={handleNotificationClick}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.unread && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <FaClock className="mr-1" />
            {new Date(notification.date).toLocaleDateString()}{" "}
            <Typography variant="caption" sx={{ ml: 1 }}>
              {notification.notifier_email}
            </Typography>
          </Typography>
        }
      />
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.number.isRequired,
    notifier_email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    unread: PropTypes.bool.isRequired,
    date: PropTypes.string.isRequired,
    lien: PropTypes.string,
    file_name: PropTypes.string, // Ajout de file_name
  }).isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
};

function renderContent(notification) {
  let avatar;
  let title;

  switch (notification.type) {
    case "share":
      avatar = <FaTag />;
      title = `You have received a new file: ${notification.file_name}`;
      break;
    case "delete":
      avatar = <FaTrash />; // Utilisation de l'icône de poubelle pour les suppressions
      title = `The file "${notification.file_name}" has been deleted from the server.`;
      break;
    default:
      avatar = <FaBell />;
      title = notification.contenu || "Notification";
  }

  return { avatar, title };
}

export default NotificationItem;
