import * as React from "react";
import "./CustomTable.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { DownloadingOutlined } from "@mui/icons-material";
import ShareDialog from "./ShareDialog";
import { axiosInstance } from "../AxiosInstance";
import { formatDate } from "../utilities/utilisties";
import DeleteButton from "./DeleteButton";
import Message from "./Message";

export default function UploadeFilesTable() {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [uploadedData, setUploadedData] = React.useState([]);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  async function getUFiles() {
    try {
      let accessToken = localStorage.getItem("token");

      const response = await axiosInstance.get("/files/uploaded", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Vérifiez si la réponse est valide et contient des données
      if (response && response.data && response.data.length > 0) {
        const uploadedFiles = response.data;
        setUploadedData(uploadedFiles);
      }
    } catch (e) {
      // Dans votre gestionnaire d'erreur 404
      if (e.response.status === 404) {
        setSnackbarOpen(true);
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

  const handleDelete = (id) => {
    // Filtrer les éléments pour exclure celui avec l'ID spécifié
    const updatedData = uploadedData.filter((item) => item.id !== id);

    // Mettre à jour uploadedData avec la nouvelle liste filtrée
    setUploadedData(updatedData);
    alert(uploadedData);
  };

  // Mettre à jour la hauteur du conteneur lorsque le composant est monté ou lorsque la fenêtre est redimensionnée
  React.useEffect(() => {
    getUFiles();
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

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ maxHeight: "100%" }}
    >
      <div
        ref={tableRef}
        style={{ maxHeight: `${containerHeight}px`, overflowY: "auto" }}
      >
        <table className="w-full">
          <thead className="text-white h-14">
            <tr className="sticky top-0" style={{ backgroundColor: "#25525D" }}>
              <th className="px-4">File</th>
              <th className="px-4">Size</th>
              <th className="px-4">Upload Date</th>
              <th className="px-4">Algorithm</th>
            </tr>
          </thead>
          <tbody>
            {uploadedData.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white h-14 row-b-bottom cursor_pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td align="center">{row.name}</td>
                  <td className="px-4" align="center">
                    {row.size}
                  </td>
                  <td className="px-4" align="center">
                    {formatDate(row.upload_at)}
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
                          />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          {" "}
                          <DownloadingOutlined />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <ShareDialog file_id={row.id} />
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
        message="No uploaded files"
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
