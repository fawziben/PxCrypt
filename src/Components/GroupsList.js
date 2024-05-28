import React, { useState } from "react";
import { Avatar, AvatarGroup } from "@mui/material";
import AddGroup from "./AddGroup";

const GroupsList = ({ groups, setUsers, setTitle, setDescription }) => {
  const [activeIndex, setActiveIndex] = useState(null); // Ajout de l'état pour suivre le groupe sélectionné

  const handleGroupClick = (index, users, title, description) => {
    setActiveIndex(index); // Met à jour l'index du groupe sélectionné
    setUsers(users); // Met à jour les utilisateurs
    setTitle(title);
    setDescription(description);
  };

  return (
    <div className="rounded-lg w-2/5 overflow-auto border border-black">
      <div>
        {groups.map((group, index) => (
          <div
            key={index}
            className={`mt-5 mx-auto p-5 pt-2.5 rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] cursor-pointer test ${
              activeIndex === index ? "bg-[#CBD7D9]" : "bg-blue-50"
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
            <div className="font-bold">Groupe : {group.title}</div>
            <div className="mb-2.5">
              <b>Description :</b> {group.description}
            </div>
            <div className="flex justify-start">
              <AvatarGroup max={10}>
                {group.users.map((user, index) => (
                  <Avatar
                    key={index}
                    sx={{ color: "#ffffff", backgroundColor: "#29508a" }}
                  >
                    {user.first_name[0] + user.last_name[0]}
                  </Avatar>
                ))}
              </AvatarGroup>
            </div>
          </div>
        ))}
      </div>
      {/* ... Autres éléments de la liste des groupes */}
      <div
        style={{
          position: "sticky", // Utilisez "absolute" pour fixer le bouton en bas à droite du div
          bottom: "0px",
          right: "16px",
        }}
      >
        <AddGroup />
      </div>
    </div>
  );
};

export default GroupsList;
