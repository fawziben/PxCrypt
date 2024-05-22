import * as React from "react";
import "./CustomTable.css";
import UploadButton from "./UploadButton";
import DecryptButton from "./DecryptButton";
import LocalShowFileIcon from "./LocalShowFileIcon";
import { convertSize } from "../utilities/utilisties";

const getFileName = (filePath) => {
  // Séparer le chemin en parties en utilisant le séparateur '\'
  let parts = filePath.split("\\");

  // Extraire le dernier élément qui représente le nom du fichier
  let fileNameWithExtension = parts[parts.length - 1];

  // Enlever l'extension '.pxc' du nom du fichier en utilisant une expression régulière
  let fileNameWithoutExtension = fileNameWithExtension.replace(/\.pxc$/, "");

  return fileNameWithoutExtension;
};

export default function LocalFilesTable({ fileData, removeFileData }) {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);

  // Fonction pour recalculer la hauteur du conteneur
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
        <table className="w-full">
          <thead className="text-white h-14">
            <tr className="sticky top-0" style={{ backgroundColor: "#25525D" }}>
              <th className="px-4">File</th>
              <th className="px-4">Size</th>
              <th className="px-4">Access Date</th>
              <th className="px-4">Path</th>
              <th className="px-4">Algorithm</th>
            </tr>
          </thead>
          <tbody>
            {fileData.map((row, index) => (
              <React.Fragment key={index}>
                <tr
                  className="bg-white h-14 row-b-bottom cursor-pointer"
                  onClick={() => handleRowClick(index)}
                >
                  <td align="center">{getFileName(row.path)}</td>
                  <td className="px-4" align="center">
                    {convertSize(row.size)}
                  </td>
                  <td className="px-4" align="center">
                    {row.accessDate}
                  </td>
                  <td className="px-4" align="center">
                    {row.path}
                  </td>
                  <td className="px-4" align="center">
                    AES_256
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
                          <UploadButton file_path={row.path} />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <LocalShowFileIcon file_path={row.path} />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <DecryptButton
                            file_path={row.path}
                            removeFileData={removeFileData}
                          ></DecryptButton>
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
    </div>
  );
}
