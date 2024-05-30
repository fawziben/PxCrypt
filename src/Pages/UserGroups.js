import {
  Avatar,
  AvatarGroup,
  InputAdornment,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DeleteOutline, Search } from "@mui/icons-material";
import AddGroup from "../Components/AddGroup";
import GroupsList from "../Components/GroupsList";
import { axiosInstance } from "../AxiosInstance";
import GroupUsers from "../Components/GroupUsers";
import EditIcon from "@mui/icons-material/Edit";

const UserGroups = () => {
  async function getGroups() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get("/groups/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response.status === 200) {
        setGroups(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("You have no sharing lists");
      } else {
        alert("Internal Server Error 2");
      }
    }
  }

  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupIndex, setGroupIndex] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    getGroups();
  }, []);

  const handleEditClick = (field) => {
    if (field === "title") {
      setIsEditingTitle(true);
    } else if (field === "description") {
      setIsEditingDescription(true);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    // Vous pouvez également ajouter du code ici pour sauvegarder le titre modifié
  };

  const handleDescriptionBlur = () => {
    setIsEditingDescription(false);
    // Vous pouvez également ajouter du code ici pour sauvegarder la description modifiée
  };

  return (
    <div className="mt-[100px] w-full flex flex-row h-[calc(100vh-100px)] ml-5">
      <GroupsList
        groupIndex={groupIndex}
        setGroupIndex={setGroupIndex}
        groups={groups}
        setGroups={setGroups}
        setUsers={setUsers}
        setTitle={setTitle}
        setDescription={setDescription}
      ></GroupsList>
      <div className="rounded-lg w-[70%] flex flex-col pl-5 mr-5">
        <div className="w-full flex">
          <div className="h-[100px] rounded-md mr-5 bg-blue-50 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] p-5 pt-2.5 w-[40%] flex">
            <div className="grow">
              <span>
                <b>Title : </b>
              </span>
              {isEditingTitle ? (
                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleTitleBlur}
                  autoFocus
                  variant="standard"
                />
              ) : (
                <span>{title}</span>
              )}
            </div>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleEditClick("title")}
            ></EditIcon>
          </div>
          <div className="h-[100px] rounded-md mr-2.5 bg-blue-50 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] p-5 pt-2.5 w-[60%] overflow-auto flex">
            <div className="grow">
              <span>
                <b>Description : </b>
              </span>
              {isEditingDescription ? (
                <TextField
                  value={description}
                  onChange={handleDescriptionChange}
                  onBlur={handleDescriptionBlur}
                  autoFocus
                  variant="standard"
                  minRows={3}
                />
              ) : (
                <span>{description}</span>
              )}
            </div>
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => handleEditClick("description")}
            ></EditIcon>
          </div>
        </div>
        <div className="usersName flex-1 flex flex-col mt-5 overflow-auto">
          <TextField
            sx={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
            variant="filled"
            label="search for a user"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <div className="w-full bg-blue-50 flex-1 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] rounded-lg mt-2.5 overflow-auto">
            <GroupUsers
              users={users}
              setUsers={setUsers}
              groups={groups}
              setGroups={setGroups}
              groupIndex={groupIndex}
            ></GroupUsers>
          </div>
          <AddGroup />
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
