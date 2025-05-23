import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { axiosInstance } from "../AxiosInstance";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomSnackbar from "./CustomSnackbar";

export default function CryptOptions({
  updateFileData,
  setOpenDialog,
  setSnackbarOpen,
  setSnackbarMessage,
  setSnackbarSeverity,
}) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [algorithm, setAlgorithm] = useState("");

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);
  };

  const handleDirectoryChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const removeFile = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  async function crypt() {
    try {
      let accessToken = localStorage.getItem("token");
      for (const file of selectedFiles) {
        const fileExtension = file.name.split(".").pop(); // Extract the file extension

        // Check if the extension is allowed
        const verifyResponse = await axiosInstance.put(
          "/settings/verify_extensions",
          {},
          {
            params: { ext: fileExtension },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (verifyResponse.status == 403) {
          setSnackbarMessage(
            `The extension .${fileExtension} is not allowed to be encrypted.`
          );
          setSnackbarSeverity("error");
          setOpenDialog(false);
          setSnackbarOpen(true); // Open the Snackbar

          continue; // Skip the current file if the extension is not allowed
        }

        const formData = new FormData();
        formData.append("file", file); // Add your file to FormData

        const response = await axiosInstance.post("/encrypt", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Specify content type as multipart/form-data for file uploads
          },
          responseType: "arraybuffer",
          responseEncoding: "binary",
        });

        const absolutePath = file.path; // Get the absolute path of the file
        const { name, size } = file;
        const encryptedFile = {
          path: `${absolutePath}.pxc`, // Use the absolute path here
          accessDate: new Date().toLocaleDateString(),
          size: size,
        };

        if (response.status === 200) {
          window.electronAPI.saveNewData(response.data, absolutePath); // Pass the absolute path to Electron API
          updateFileData(encryptedFile);
          setSnackbarMessage("file encrypted successfully");
          setSnackbarSeverity("success");
          setSnackbarOpen(true); // Open the Snackbar
          setOpenDialog(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div>
      <DialogContent>
        <Box display="grid">
          <input
            id="file-input"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <input
            id="directory-input"
            type="file"
            webkitdirectory=""
            directory=""
            multiple
            style={{ display: "none" }}
            onChange={handleDirectoryChange}
          />
          <label htmlFor="file-input">
            <Button
              variant="outlined"
              color="primary"
              component="span"
              startIcon={<InsertDriveFileIcon />}
            >
              Single File Encryption
            </Button>
          </label>
          <br />
          <label htmlFor="directory-input">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<FolderOpenIcon />}
            >
              Multiple File Encryption
            </Button>
          </label>
        </Box>

        {selectedFiles.length > 0 && (
          <Grid container spacing={2} mt={2}>
            {selectedFiles.map((file, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" component="p">
                      {file.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      color="secondary"
                      onClick={() => removeFile(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={crypt}
          disabled={selectedFiles.length === 0}
        >
          Encrypt
        </Button>
      </DialogActions>
    </div>
  );
}
