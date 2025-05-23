import * as React from "react";
import "./CustomTable.css";
import ShareDialog from "./ShareDialog";
import { axiosInstance } from "../AxiosInstance";
import { formatDate } from "../utilities/utilisties";
import DeleteButton from "./DeleteButton";
import Message from "./Message";
import DownloadButton from "./DownloadButton";
import ShowFileIcon from "./ShowFileIcon";
import { convertSize } from "../utilities/utilisties";
import CustomSnackbar from "./CustomSnackbar";

export default function UploadeFilesTable({ searchVal }) {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [uploadedData, setUploadedData] = React.useState([]);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");

  const handleCloseSnackbar = () => {
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
      }
    }
  }

  const updateContainerHeight = () => {
    if (tableRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop = tableRef.current.getBoundingClientRect().top;
      const containerHeight = windowHeight - containerTop;
      setContainerHeight(containerHeight);
    }
  };

  const handleDelete = (id) => {
    const updatedData = uploadedData.filter((item) => item.id !== id);
    setUploadedData(updatedData);
  };

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
    if (selectedRow !== null && selectedRow !== index) {
      setActions((prevState) => ({
        ...prevState,
        [selectedRow]: false,
      }));
    }
    toggleActions(index);
    setSelectedRow(index);
  };

  // Fonction pour filtrer les fichiers téléchargés
  const filteredData = uploadedData.filter((file) =>
    file.name.toLowerCase().includes(searchVal.toLowerCase())
  );

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
            {filteredData.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white h-14 row-b-bottom cursor_pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td align="center">{row.name}</td>
                  <td className="px-4" align="center">
                    {convertSize(row.size)}
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
                          <DeleteButton
                            file_id={row.id}
                            handleDelete={handleDelete}
                            code={1}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarSeverity={setSnackbarSeverity}
                            setSnackbarOpen={setSnackbarOpen}
                          />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <DownloadButton
                            file_id={row.id}
                            file_name={row.name}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarSeverity={setSnackbarSeverity}
                            setSnackbarOpen={setSnackbarOpen}
                          />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <ShowFileIcon file_id={row.id} file_name={row.name} />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <ShareDialog
                            file_id={row.id}
                            setSnackbarMessage={setSnackbarMessage}
                            setSnackbarSeverity={setSnackbarSeverity}
                            setSnackbarOpen={setSnackbarOpen}
                          />
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
      <CustomSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Positionnez le Snackbar à gauche
      />
    </div>
  );
}
