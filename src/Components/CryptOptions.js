import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { AES, enc } from "crypto-js";
import { axiosInstance } from "../AxiosInstance";

export default function CryptOptions() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("");
  const [shareEnabled, setShareEnabled] = useState(false);
  const [recipients, setRecipients] = useState([
    "Recipient 1",
    "Recipient 2",
    "Recipient 3",
    "Recipient 4",
    "Recipient 5",
    "Recipient 6",
    "Recipient 7",
    "Recipient 8",
    "Recipient 9",
    "Recipient 10",
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipientStates, setRecipientStates] = useState(
    Array(recipients.length).fill(false)
  );

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

      alert(selectedFile.path);
      alert(selectedFile.toString());

      alert(response.data);

      if (response.status === 200) {
        window.electronAPI.saveNewData(response.data, selectedFile.path); // Appel d'une fonction depuis l'API Electron
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function decrypt() {
    try {
      let accessToken = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", selectedFile); // Ajoutez votre fichier à FormData

      const response = await axiosInstance.post("/decrypt", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data", // Spécifiez le type de contenu comme multipart/form-data pour les envois de fichier
        },
        responseType: "arraybuffer",
        responseEncoding: "binary",
      });
      alert(selectedFile.path);

      alert(response.data);

      if (response.status === 200) {
        window.electronAPI.saveNewData(response.data, selectedFile.path); // Appel d'une fonction depuis l'API Electron
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

  const handleRecipientToggle = (index) => {
    // Toggle the recipient's selection
    setRecipientStates((prevState) => {
      const newStates = [...prevState];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  const handleShare = () => {
    // Handle sharing logic here
    const selectedRecipients = recipients.filter(
      (_, index) => recipientStates[index]
    );
    console.log("Shared with recipients:", selectedRecipients);
  };

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCrypt = () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;

      // Convertir le contenu du fichier en UTF-8
      const utf8Content = new TextDecoder().decode(fileContent);

      // Encrypter le contenu du fichier en utilisant AES-256
      const encryptedContent = AES.encrypt(
        utf8Content,
        "3469b1136da1b88c11b5c47169dab4fd894ea5566cd48dc746693f17cb7a9590"
      ).toString();

      // Créer un nouveau Blob avec le contenu crypté
      const encryptedBlob = new Blob([encryptedContent], {
        type: "application/octet-stream",
      });

      // Créer un objet URL pour le Blob crypté
      const url = URL.createObjectURL(encryptedBlob);

      // Créer un lien de téléchargement pour le fichier crypté
      const link = document.createElement("a");
      link.href = url;
      link.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".px"; // Remplacer l'extension par .px
      document.body.appendChild(link);
      link.click();

      // Libérer l'URL de l'objet Blob
      URL.revokeObjectURL(url);

      alert("File encrypted successfully!");
    };
    reader.readAsArrayBuffer(selectedFile);
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
        {shareEnabled && (
          <div>
            <TextField
              label="Search Recipients"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <List sx={{ maxHeight: 150, overflow: "auto" }}>
              {filteredRecipients.map((recipient, index) => (
                <ListItem key={recipient}>
                  <ListItemText primary={recipient} />
                  <Switch
                    checked={recipientStates[index]}
                    onChange={() => handleRecipientToggle(index)}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={crypt}>
          Encrypt
        </Button>
        <Button color="primary" onClick={decrypt}>
          Decrypt
        </Button>
      </DialogActions>
    </div>
  );
}
