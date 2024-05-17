import React, { useState } from "react";
import {
  TextField,
  Switch,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { axiosInstance } from "../AxiosInstance";
import { Download, Message } from "@mui/icons-material";

const UsersList = ({ recipients, setRecipients, file_id }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleRecipientToggle = (index) => {
    setRecipients((prevState) => {
      return prevState.map((recipient) => {
        // Si l'index correspond à l'ID du destinataire, basculer son état
        if (recipient.id === index) {
          return { ...recipient, state: !recipient.state, moreState: false };
        } else {
          // Sinon, retourner le destinataire inchangé
          return recipient;
        }
      });
    });
  };

  const handleRecipientDownload = (index) => {
    setRecipients((prevState) => {
      return prevState.map((recipient) => {
        // Si l'index correspond à l'ID du destinataire, basculer son état
        if (recipient.id === index) {
          return {
            ...recipient,
            download: !recipient.download,
            color: !recipient.download ? "#25525D" : "",
          };
        } else {
          // Sinon, retourner le destinataire inchangé
          return recipient;
        }
      });
    });
  };

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    getUsers();
  }, []);

  const handleMessage = (id) => {
    const recipient = recipients.find((recipient) => recipient.id === id);
    if (recipient) {
      setRecipients((prevState) =>
        prevState.map((r) =>
          r.id === id
            ? { ...r, moreState: !r.moreState }
            : { ...r, moreState: false }
        )
      );
    }
  };

  const handleMessageWrite = (id, message) => {
    setRecipients((prevState) =>
      prevState.map((recipient) =>
        recipient.id === id ? { ...recipient, message } : recipient
      )
    );
  };

  async function getUsers() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get(`users/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response && response.data && response.data.length > 0) {
        const usersData = response.data;

        // Concaténer les first_name et last_name de chaque utilisateur
        const newRecipients = usersData.map((user) => {
          return {
            id: user.id,
            name: `${user.first_name} ${user.last_name}`,
            state: false,
            avatar: `${user.last_name[0].toUpperCase()}${user.first_name[0].toUpperCase()}`,
            moreState: false,
            download: false,
            color: "",
            message: "",
          };
        });

        // Mettre à jour la liste des destinataires
        setRecipients(newRecipients);
      }
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div>
      <TextField
        label="User Name"
        variant="filled"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <List sx={{ height: 205, overflow: "auto" }}>
        {filteredRecipients.map((recipient) => (
          <div key={recipient.id}>
            <ListItem>
              <Avatar
                sx={{
                  color: "#ffffff",
                  backgroundColor: "#29508a",
                  marginRight: "20px",
                }}
              >
                {recipient.avatar}
              </Avatar>
              <ListItemText primary={recipient.name} />
              {recipient.state && (
                <div>
                  <Message
                    sx={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => handleMessage(recipient.id)}
                  ></Message>
                  <Download
                    sx={{ cursor: "pointer", color: recipient.color }}
                    onClick={() => handleRecipientDownload(recipient.id)}
                  ></Download>
                </div>
              )}
              <Switch
                checked={recipient.state}
                onChange={() => handleRecipientToggle(recipient.id)}
              />
            </ListItem>
            <ListItem>
              {recipient.moreState && recipient.state && (
                <div style={{ width: "100%" }}>
                  <TextField
                    sx={{ width: "100%" }}
                    placeholder="Add a message"
                    variant="filled"
                    value={recipient.message}
                    onChange={(e) =>
                      handleMessageWrite(recipient.id, e.target.value)
                    }
                  ></TextField>
                </div>
              )}
            </ListItem>
          </div>
        ))}
      </List>
    </div>
  );
};

export default UsersList;
