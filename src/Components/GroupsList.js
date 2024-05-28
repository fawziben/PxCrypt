import React, { useEffect, useState } from "react";
import { axiosInstance } from "../AxiosInstance";
import { Avatar, AvatarGroup } from "@mui/material";
import AddGroup from "./AddGroup";

const GroupsList = ({ groups, setUsers }) => {
  return (
    <div className="rounded-lg w-2/5 overflow-auto border border-black">
      <div>
        {groups.map((group, index) => (
          <div
            key={index}
            className="mt-5 mx-auto p-5 pt-2.5 bg-blue-50 rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)] cursor-pointer"
            onClick={() => setUsers(group.users)}
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
      <div className="mt-5 mx-auto p-5 pt-2.5 bg-[#CBD7D9] rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]">
        <div className="mb-2.5 font-bold">Groupe : Informatique</div>
        <div className="mb-2.5">
          <b>Description :</b> Groupe contenant tout les employes du departemant
          informatique
        </div>
        <div className="flex justify-start">
          <AvatarGroup max={10}>
            <Avatar sx={{ color: "#ffffff", backgroundColor: "#29508a" }}>
              F
            </Avatar>
            <Avatar sx={{ color: "#ffffff", backgroundColor: "#29508a" }}>
              F
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
      <div className="mt-5 mx-auto p-5 pt-2.5 bg-[#CBD7D9] rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]">
        <div className="mb-2.5 font-bold">Groupe : Informatique</div>
        <div className="mb-2.5">
          <b>Description :</b> Groupe contenant tout les employes du departemant
          informatique
        </div>
        <div className="flex justify-start">
          <AvatarGroup max={10}>
            <Avatar sx={{ color: "#ffffff", backgroundColor: "#29508a" }}>
              F
            </Avatar>
            <Avatar sx={{ color: "#ffffff", backgroundColor: "#29508a" }}>
              F
            </Avatar>
          </AvatarGroup>
        </div>
      </div>
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
