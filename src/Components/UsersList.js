import React, { useState } from "react";
import { TextField, Switch, List, ListItem, ListItemText } from "@mui/material";
import { axiosInstance } from "../AxiosInstance";

const UsersList = () => {
  const [recipients, setRecipients] = useState([]);

  const [recipientStates, setRecipientStates] = useState(
    Array(recipients.length).fill(false)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleRecipientToggle = (index) => {
    // Toggle the recipient's selection
    setRecipientStates((prevState) => {
      const newStates = [...prevState];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleShare = () => {
    // Handle sharing logic here
    const selectedRecipients = recipients.filter(
      (_, index) => recipientStates[index]
    );
    console.log("Shared with recipients:", selectedRecipients);
  };

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get("/users/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response && response.data && response.data.length > 0) {
        const usersData = response.data;

        // Concaténer les first_name et last_name de chaque utilisateur
        const newRecipients = usersData.map((user) => {
          return `${user.first_name} ${user.last_name}`;
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
          <ListItem key={recipient}>
            <ListItemText primary={recipient} />
            <Switch
              checked={recipientStates[index]}
              onChange={() => handleRecipientToggle(index)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UsersList;
