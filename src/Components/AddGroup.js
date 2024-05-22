import React from "react";
import { FaUsers } from "react-icons/fa";
import { Button } from "@mui/material";

export default function AddGroup() {
  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className=" w-1/3 h-fit bg-white p-4 rounded-md space-y-8">
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <p className="text-lg font-bold text-bleuF text-center">
              Nouveau Groupe
            </p>
            <FaUsers size={30} className="text-bleuF" />
          </div>
          <div>
            <p className="text-sm text-bleuF font-semibold">Nom du groupe</p>
            <textarea
              className="w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500"
              rows="1"
            ></textarea>
          </div>
          <div>
            <p className="text-sm text-bleuF font-semibold">Description</p>
            <textarea
              className="w-full bg-violet border text-bleuF border-gray-400 rounded-md p-1 focus:outline-none focus:border-blue-500"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button>Annuler</Button>
          <Button>Créer</Button>
        </div>
      </div>
    </div>
  );
}
