import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { axiosInstance } from "../AxiosInstance";
import { convertSize } from "../utilities/utilisties";
import UsersList from "./UsersList";

export default function CryptOptions({ updateFileData }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [shareEnabled, setShareEnabled] = useState(false);

  async function crypt() {
    try {
      let accessToken = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", selectedFile); // Ajoutez votre fichier à FormData

      const response = await axiosInstance.post("/encrypt", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Spécifiez le type de contenu comme multipart/form-data pour les envois de fichier
        },
        responseType: "arraybuffer",
        responseEncoding: "binary",
      });

      const { path, size } = selectedFile;
      const file = {
        path: `${path}.pxc`,
        accessDate: "March 28, 2024",
        size: convertSize(size),
      };

      if (response.status === 200) {
        window.electronAPI.saveNewData(response.data, selectedFile.path); // Appel d'une fonction depuis l'API Electron
        updateFileData(file);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleShareToggle = () => {
    setShareEnabled(!shareEnabled);
  };

  return (
    <div>
      <DialogContent>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <input type="file" onChange={handleFileChange} />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select Algorithm</InputLabel>
          <Select value={algorithm} onChange={handleAlgorithmChange}>
            <MenuItem value="AES-256">AES 256</MenuItem>
            <MenuItem value="AES-128">AES 128</MenuItem>
            <MenuItem value="Blowfish">Blowfish</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch checked={shareEnabled} onChange={handleShareToggle} />
          }
          label="Share"
        />
        <br></br>
        {shareEnabled && <UsersList />}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={crypt}>
          Encrypt
        </Button>
      </DialogActions>
    </div>
  );
}
