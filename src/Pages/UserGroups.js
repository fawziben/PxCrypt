import { Avatar, AvatarGroup, InputAdornment, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Search } from "@mui/icons-material";

const UserGroups = () => {
  const exemples = ["test", "test", "test", "test", "test", "test"];
  return (
    <div className="mt-[100px] w-full flex flex-row h-[calc(100vh-100px)] ml-5">
      <div className="rounded-lg w-2/5 overflow-auto border border-black">
        {exemples.map((exemple, index) => (
          <div
            key={index}
            className="mt-5 mx-auto p-5 pt-2.5 bg-blue-50 rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]"
          >
            <div className="font-bold">Groupe : Informatique</div>
            <div className="mb-2.5">
              <b>Description :</b> Groupe contenant tout les employes du
              departemant informatique
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
        ))}
        <div className="mt-5 mx-auto p-5 pt-2.5 bg-[#CBD7D9] rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]">
          <div className="mb-2.5 font-bold">Groupe : Informatique</div>
          <div className="mb-2.5">
            <b>Description :</b> Groupe contenant tout les employes du
            departemant informatique
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
      </div>
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
            {exemples.map((exemple, index) => (
              <div
                key={index}
                className="mt-5 mx-auto p-5 pt-2.5 bg-blue-50 rounded-lg w-[95%] shadow-[5px_5px_15px_rgba(0,0,0,0.3)]"
              >
                <div className="font-bold">Groupe : Informatique</div>
                <div className="mb-2.5">
                  <b>Description :</b> Groupe contenant tout les employes du
                  departemant informatique
                </div>
                <div className="flex justify-start">
                  <AvatarGroup max={10}>
                    <Avatar
                      sx={{ color: "#ffffff", backgroundColor: "#29508a" }}
                    >
                      F
                    </Avatar>
                    <Avatar
                      sx={{ color: "#ffffff", backgroundColor: "#29508a" }}
                    >
                      F
                    </Avatar>
                  </AvatarGroup>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroups;
