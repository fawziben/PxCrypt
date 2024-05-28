import { DeleteOutline } from "@mui/icons-material";
import { Avatar, ListItem, ListItemText } from "@mui/material";
import React from "react";

const GroupUsers = ({ users }) => {
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
            <DeleteOutline></DeleteOutline>
          </ListItem>
        </div>
      ))}
    </div>
  );
};

export default GroupUsers;
