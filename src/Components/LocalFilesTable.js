import * as React from "react";
import "./CustomTable.css";
import UploadButton from "./UploadButton";
import DecryptButton from "./DecryptButton";
import LocalShowFileIcon from "./LocalShowFileIcon";
import { convertSize } from "../utilities/utilisties";

const getFileName = (filePath) => {
  let parts = filePath.split("\\");
  let fileNameWithExtension = parts[parts.length - 1];
  let fileNameWithoutExtension = fileNameWithExtension.replace(/\.pxc$/, "");
  return fileNameWithoutExtension;
};

export default function LocalFilesTable({
  searchVal,
  fileData,
  removeFileData,
}) {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);

  const updateContainerHeight = () => {
    if (tableRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop = tableRef.current.getBoundingClientRect().top;
      const containerHeight = windowHeight - containerTop;
      setContainerHeight(containerHeight);
    }
  };

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
    if (selectedRow !== null && selectedRow !== index) {
      setActions((prevState) => ({
        ...prevState,
        [selectedRow]: false,
      }));
    }
    toggleActions(index);
    setSelectedRow(index);
  };

  // Filtrer les données selon le terme de recherche
  const filteredData = fileData.filter((row) => {
    const fileName = getFileName(row.path).toLowerCase();
    const searchTerm = searchVal.toLowerCase();
    return (
      fileName.includes(searchTerm) ||
      row.path.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div
      className="w-full h-full overflow-y-auto"
      style={{ maxHeight: "100%" }}
    >
      {filteredData.length > 0 ? (
        <div
          ref={tableRef}
          style={{ maxHeight: `${containerHeight}px`, overflowY: "auto" }}
        >
          <table className="w-full">
            <thead className="text-white h-14">
              <tr
                className="sticky top-0"
                style={{ backgroundColor: "#25525D" }}
              >
                <th className="px-4">File</th>
                <th className="px-4">Size</th>
                <th className="px-4">Path</th>
                <th className="px-4">Algorithm</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
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
      ) : (
        <h1>No crypted files</h1>
      )}
    </div>
  );
}
