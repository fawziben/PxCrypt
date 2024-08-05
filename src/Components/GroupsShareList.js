import React, { useState, useEffect } from "react";
import {
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Switch,
  DialogContent,
} from "@mui/material";
import { Search, Download, Message } from "@mui/icons-material";
import { axiosInstance } from "../AxiosInstance";
import AvatarGroup from "@mui/material/AvatarGroup";

const GroupsShareList = () => {
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupIndex, setGroupIndex] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const refresh = (users) => {
    setUsers((prevUsers) => [...prevUsers, ...users]);
  };

  const getGroups = async () => {
    try {
      let accessToken = localStorage.getItem("token");
      const response = await axiosInstance.get("/groups/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        const fetchedgroups = response.data;
        setGroups(response.data);
        const newRecipients = fetchedgroups.map((group) => {
          return {
            id: group.id,
            title: group.title,
            state: false,
            moreState: false,
            download: false,
            color: "",
            message: "",
            users: group.users,
            initials: `${group.title[0].toUpperCase()}`,
            name: group.title || "", // Assurez-vous que `name` est défini
          };
        });

        setRecipients(newRecipients);
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleRecipientToggle = (index) => {
    setRecipients((prevState) => {
      const updatedRecipients = prevState.map((recipient) => {
        if (recipient.id === index) {
          if (!recipient.state) {
            setSelectedRecipients((prevSelected) => [
              ...prevSelected,
              recipient,
            ]);
          } else {
            setSelectedRecipients((prevSelected) =>
              prevSelected.filter((r) => r.id !== index)
            );
          }
          return { ...recipient, state: !recipient.state, moreState: false };
        } else {
          return recipient;
        }
      });
      return updatedRecipients;
    });
  };

  const handleRecipientDownload = (index) => {
    setRecipients((prevState) => {
      return prevState.map((recipient) => {
        if (recipient.id === index) {
          return {
            ...recipient,
            download: !recipient.download,
            color: !recipient.download ? "#25525D" : "",
          };
        } else {
          return recipient;
        }
      });
    });
  };

  const filteredRecipients = recipients.filter(
    (recipient) =>
      recipient.name?.toLowerCase().includes(searchTerm.toLowerCase()) // Utilisez l'opérateur de chaîne facultatif
  );

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

  return (
    <div>
      <DialogContent
        sx={{ width: "500px", maxHeight: "300px", overflow: "hidden" }}
      >
        <TextField
          label="User Name"
          variant="filled"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginBottom: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
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
                  {recipient.initials}
                </Avatar>
                <ListItemText primary={recipient.name} />
                {recipient.state && (
                  <div>
                    <Message
                      sx={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => handleMessage(recipient.id)}
                    />
                    <Download
                      sx={{ cursor: "pointer", color: recipient.color }}
                      onClick={() => handleRecipientDownload(recipient.id)}
                    />
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
                    />
                  </div>
                )}
              </ListItem>
            </div>
          ))}
        </List>
      </DialogContent>
      {selectedRecipients.length > 0 && (
        <div
          style={{
            width: "450px",
            marginTop: "20px",
            marginRight: "auto",
            padding: "20px",
            paddingTop: "10px",
            marginLeft: "auto",
            backgroundColor: "#CBD7D9",
            borderRadius: "10px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            Liste des utilisateur sélectionnés :
          </div>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <AvatarGroup max={10}>
              {selectedRecipients.map((recipient) => (
                <Avatar
                  key={recipient.id}
                  sx={{ color: "#ffffff", backgroundColor: "#29508a" }}
                >
                  {recipient.initials}
                </Avatar>
              ))}
            </AvatarGroup>
          </div>
        </div>
      )}
    </div>
  );
};
export default GroupsShareList;
