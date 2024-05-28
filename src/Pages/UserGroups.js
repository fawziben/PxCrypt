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

  useEffect(() => {
    getGroups();
  }, []);

  const exemples = ["test", "test", "test", "test", "test", "test"];
  return (
    <div className="mt-[100px] w-full flex flex-row h-[calc(100vh-100px)] ml-5">
      <GroupsList groups={groups} setUsers={setUsers}></GroupsList>
      <div className="rounded-lg w-[70%] flex flex-col pl-5 mr-5">
        <div className="w-full flex">
          <div className="h-[100px] rounded-md mr-5 bg-blue-50 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] p-5 pt-2.5 w-[40%]">
            <b>Title : </b> Informatique
          </div>
          <div className="h-[100px] rounded-md mr-2.5 bg-blue-50 shadow-[5px_5px_15px_rgba(0,0,0,0.3)] p-5 pt-2.5 w-[60%] overflow-auto">
            <b>Description : </b> Groupe contenant tout les employes du
            departemant informatique
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
            <GroupUsers users={users}></GroupUsers>
          </div>
          <AddGroup />
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
