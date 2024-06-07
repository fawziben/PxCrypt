import React from "react";
import { Avatar, AvatarGroup, Box } from "@mui/material";
import AddGroup from "./AddGroup";
import { DeleteOutline } from "@mui/icons-material";
import { axiosInstance } from "../AxiosInstance";

async function deleteGroup(group_id) {
  try {
    let accessToken = localStorage.getItem("token");

    await axiosInstance.delete(`groups/delete/${group_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (e) {
    alert(e);
  }
}

const GroupsList = ({
  groupIndex,
  setGroupIndex,
  groups,
  setUsers,
  setTitle,
  setDescription,
  setGroups,
}) => {
  const handleGroupClick = (index, users, title, description) => {
    setUsers(users);
    setTitle(title);
    setDescription(description);
    setGroupIndex(index);
  };

  const handleGroupDelete = (id) => {
    deleteGroup(id);
    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
    setUsers([]);
    setGroupIndex(null); // Reset groupIndex after deletion
  };

  return (
    <div className="rounded-lg w-2/5 overflow-auto border border-black relative">
      <div>
        <div>
          {groups.length > 0 &&
            groups.map((group, index) => (
              <div
                key={index}
                className={`mt-5 mx-auto p-5 pt-2.5 rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] cursor-pointer ${
                  groupIndex === index ? "bg-[#CBD7D9]" : "bg-blue-50"
                }`}
                onClick={() =>
                  handleGroupClick(
                    index,
                    group.users,
                    group.title,
                    group.description
                  )
                }
              >
                <div className="max-w-full break-words flex">
                  <div className="grow">
                    <div className="font-bold">Groupe : {group.title}</div>
                    <div className="mb-2.5">
                      <b>Description :</b> {group.description}
                    </div>
                    <div className="flex justify-start">
                      <AvatarGroup max={10}>
                        {group.users.map((user, index) => (
                          <Avatar
                            key={index}
                            sx={{
                              color: "#ffffff",
                              backgroundColor: "#29508a",
                            }}
                          >
                            {user.first_name[0] + user.last_name[0]}
                          </Avatar>
                        ))}
                      </AvatarGroup>
                    </div>
                  </div>
                  <div>
                    <DeleteOutline
                      onClick={() => handleGroupDelete(group.id)}
                      sx={{
                        cursor: "pointer",
                        color: "inherit",
                        transition: "color 0.3s",
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    ></DeleteOutline>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Box sx={{ position: "sticky", bottom: "10px", right: "10px" }}>
        <AddGroup setGroups={setGroups} groups={groups} />
      </Box>
    </div>
  );
};

export default GroupsList;
