import { DeleteOutline } from "@mui/icons-material";
import { Avatar, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { axiosInstance } from "../AxiosInstance";

const GroupUsers = ({ groupIndex, users, setUsers, groups, setGroups }) => {
  async function deleteUser(id) {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.delete(`/groups/user_group/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response.status === 204) {
        alert("user deleted successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("You have no sharing lists");
      } else {
        alert("Internal Server Error 2");
      }
    }
  }
  const handleDelete = (index, user_group) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    deleteUser(user_group);
    const updatedGroups = [...groups];

    updatedGroups[groupIndex].users = updatedUsers;

    setGroups(updatedGroups);
  };

  return (
    <div>
      {users.map((user, index) => (
        <div
          key={index}
          className="mt-5 mx-auto p-5 pt-2.5 bg-blue-50 rounded-lg w-[80%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]"
        >
          <ListItem>
            <Avatar
              sx={{
                color: "#ffffff",
                backgroundColor: "#29508a",
                marginRight: "20px",
              }}
            >
              {user.first_name[0] + user.last_name[0]}
            </Avatar>
            <ListItemText>
              {user.first_name +
                " " +
                user.last_name +
                " (" +
                user.email +
                " )"}
            </ListItemText>
            <DeleteOutline
              sx={{
                cursor: "pointer",
                color: "inherit",
                transition: "color 0.3s",
                "&:hover": {
                  color: "red",
                },
              }}
              onClick={() => handleDelete(index, user.user_group)}
            ></DeleteOutline>
          </ListItem>
        </div>
      ))}
    </div>
  );
};

export default GroupUsers;
