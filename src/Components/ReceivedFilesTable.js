import * as React from "react";
import "./CustomTable.css";
import ShareDialog from "./ShareDialog";
import UploadButton from "./UploadButton";
import DecryptIcon from "./DecryptButton";
import DecryptButton from "./DecryptButton";
import { formatDate } from "../utilities/utilisties";
import Message from "./Message";

export default function SharedFilesTable({ sharedFiles }) {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);

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
                          <UploadButton />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <ShareDialog />
                        </div>
                        <div
                          style={{ flex: 1 }}
                          align="center"
                          className="cursor-pointer hover:text-blue-500"
                        >
                          <DecryptButton></DecryptButton>
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
