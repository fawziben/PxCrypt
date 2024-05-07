import * as React from "react";
import "./CustomTable.css";
import ShareDialog from "./ShareDialog";
import UploadButton from "./UploadButton";
import DecryptIcon from "./DecryptButton";
import DecryptButton from "./DecryptButton";
import { formatDate } from "../utilities/utilisties";
import Message from "./Message";
import ShowFileIcon from "./ShowFileIcon";
import { axiosInstance } from "../AxiosInstance";
import DeleteButton from "./DeleteButton";
import {
  DeleteOutline,
  DownloadOutlined,
  DownloadingOutlined,
} from "@mui/icons-material";

export default function SharedFilesTable() {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [sharedFiles, setSharedFiles] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  async function getSharedFiles() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get("/files/shared", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response.status === 200) {
        setSharedFiles(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setSnackbarOpen(true);
      } else {
        alert("Internal Server Error");
      }
    }
  }

  const updateContainerHeight = () => {
    if (tableRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop = tableRef.current.getBoundingClientRect().top;
      const containerHeight = windowHeight - containerTop; // 20 est une marge fixe pour la barre de défilement
      setContainerHeight(containerHeight);
    }
  };

  // Mettre à jour la hauteur du conteneur lorsque le composant est monté ou lorsque la fenêtre est redimensionnée
  React.useEffect(() => {
    getSharedFiles();
    updateContainerHeight();
    window.addEventListener("resize", updateContainerHeight);
    return () => {
      window.removeEventListener("resize", updateContainerHeight);
    };
  }, []);

  const toggleActions = (index) => {
    setActions((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const handleDelete = (id) => {
    // Filtrer les éléments pour exclure celui avec l'ID spécifié
    const updatedData = sharedFiles.filter((item) => item.id !== id);

    // Mettre à jour uploadedData avec la nouvelle liste filtrée
    setSharedFiles(updatedData);
  };
  const handleRowClick = (index) => {
    // Ferme la ligne précédemment ouverte
    if (selectedRow !== null && selectedRow !== index) {
      setActions((prevState) => ({
        ...prevState,
        [selectedRow]: false,
      }));
    }
    // Ouvre la ligne sélectionnée
    toggleActions(index);
    setSelectedRow(index);
  };
  // Fonction pour envoyer le chemin du fichier au processus principal et récupérer la réponse de l'API

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ maxHeight: "100%" }}
    >
      <div
        ref={tableRef}
        style={{ maxHeight: `${containerHeight}px`, overflowY: "auto" }}
      >
        <table className="w-full" style={{ width: "100%" }}>
          <thead className="text-white h-14">
            <tr className="sticky top-0" style={{ backgroundColor: "#25525D" }}>
              <th className="px-4">File</th>
              <th className="px-4">Size</th>
              <th className="px-4">Sending date</th>
              <th className="px-4">Owner</th>
              <th className="px-4">Algorithm</th>
            </tr>
          </thead>
          <tbody>
            {sharedFiles.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white h-14 row-b-bottom"
                  onClick={() => handleRowClick(index)}
                >
                  <td align="center">{row.name}</td>
                  <td className="px-4" align="center">
                    {row.size}
                  </td>
                  <td className="px-4" align="center">
                    {formatDate(row.date)}
                  </td>
                  <td className="px-4" align="center">
                    {row.sender}
                  </td>
                  <td className="px-4" align="center">
                    {row.algorithm}
                  </td>
                </tr>
                {actions[index] && (
                  <tr className="h-14 row-b-bottom slide-down actions-row">
                    <td colSpan="5">
                      <div style={{ display: "flex" }}>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          {" "}
                          <DeleteButton
                            file_id={row.id}
                            handleDelete={handleDelete}
                            code={2}
                          />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <ShowFileIcon
                            file_id={row.file_id}
                            file_name={row.name}
                          />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <DownloadingOutlined></DownloadingOutlined>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <Message
        open={snackbarOpen}
        message="No Shared files with you"
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
