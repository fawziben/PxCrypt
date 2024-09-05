import * as React from "react";
import "./CustomTable.css";
import ShareDialog from "./ShareDialog";
import UploadButton from "./UploadButton";
import DecryptIcon from "./DecryptButton";
import DecryptButton from "./DecryptButton";
import { convertSize, formatDate } from "../utilities/utilisties";
import Message from "./Message";
import ShowFileIcon from "./ShowFileIcon";
import { axiosInstance } from "../AxiosInstance";
import DeleteButton from "./DeleteButton";
import {
  DeleteOutline,
  DownloadOutlined,
  DownloadingOutlined,
} from "@mui/icons-material";
import DownloadButton from "./DownloadButton";

export default function SharedFilesTable({ searchVal }) {
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

      if (response.status === 200) {
        setSharedFiles(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
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
      const containerHeight = windowHeight - containerTop;
      setContainerHeight(containerHeight);
    }
  };

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
    const updatedData = sharedFiles.filter((item) => item.id !== id);
    setSharedFiles(updatedData);
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

  // Filtrer les fichiers partagés en fonction de la valeur de recherche
  const filteredFiles = sharedFiles.filter((file) => {
    // Assurez-vous que chaque propriété de file existe avant d'appeler toLowerCase
    const fileName = file.name ? file.name.toLowerCase() : "";
    const searchTerm = searchVal ? searchVal.toLowerCase() : "";

    return fileName.includes(searchTerm);
  });

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
            {filteredFiles.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white h-14 row-b-bottom"
                  onClick={() => handleRowClick(index)}
                >
                  <td align="center">{row.name}</td>
                  <td className="px-4" align="center">
                    {convertSize(row.size)}
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
                          <DownloadButton
                            file_id={row.file_id}
                            file_name={row.name}
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
      <Message
        open={snackbarOpen}
        message="No Shared files with you"
        handleClose={handleSnackbarClose}
      />
    </div>
  );
}
