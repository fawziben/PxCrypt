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

const UsersList = ({ recipients, setRecipients, file_id }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleRecipientToggle = (index) => {
    setRecipients((prevState) => {
      return prevState.map((recipient, i) => {
        // Si l'index correspond à l'ID du destinataire, basculer son état
        if (recipient.id === index) {
          return { ...recipient, state: !recipient.state };
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
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <List sx={{ maxHeight: 150, overflow: "auto" }}>
        {filteredRecipients.map((recipient, index) => (
          <ListItem key={recipient.id}>
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
            <Switch
              checked={recipient.state}
              onChange={() => handleRecipientToggle(recipient.id)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersList;
