import * as React from 'react';
import './CustomTable.css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import KeyOffOutlinedIcon from '@mui/icons-material/KeyOffOutlined';

const classes = {

}

function createData(folder, size, accessDate, path, algo) {
  return { folder, size, accessDate, path, algo };
}

const rows = [
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('Videos', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  // Ajoutez d'autres données ici...
];

export default function FoldersTable() {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [actions, setActions] = React.useState({});
  const [selectedRow, setSelectedRow] = React.useState(null);

  // Fonction pour recalculer la hauteur du conteneur
  const updateContainerHeight = () => {
    if (tableRef.current) {
      const windowHeight = window.innerHeight;
      const containerTop = tableRef.current.getBoundingClientRect().top;
      const containerHeight = windowHeight - containerTop ; // 20 est une marge fixe pour la barre de défilement
      setContainerHeight(containerHeight);
    }
  };

  // Mettre à jour la hauteur du conteneur lorsque le composant est monté ou lorsque la fenêtre est redimensionnée
  React.useEffect(() => {
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    return () => {
      window.removeEventListener('resize', updateContainerHeight);
    };
  }, []);

  const toggleActions = (index) => {
    setActions(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const handleRowClick = (index) => {
    // Ferme la ligne précédemment ouverte
    if (selectedRow !== null && selectedRow !== index) {
      setActions(prevState => ({
        ...prevState,
        [selectedRow]: false
      }));
    }
    // Ouvre la ligne sélectionnée
    toggleActions(index);
    setSelectedRow(index);
  };

  return (
    <div className="w-full h-full overflow-y-auto" style={{ maxHeight: '100%', }}>
      <div ref={tableRef} style={{ maxHeight: `${containerHeight}px`, overflowY: 'auto',}}>
        <table className="w-full">
          <thead className="text-white h-14">
            <tr className="sticky top-0" style={{ backgroundColor: '#25525D' }}>
              <th className="px-4">Folder</th>
              <th className="px-4">Size</th>
              <th className="px-4">Access Date</th>
              <th className="px-4">Path</th>
              <th className="px-4">Algorithm</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white h-14 row-b-bottom" onClick={() => handleRowClick(index)}>
                  <td align='center'>{row.folder}</td>
                  <td className="px-4" align="center">{row.size}</td>
                  <td className="px-4" align="center">{row.accessDate}</td>
                  <td className="px-4" align="center">{row.path}</td>
                  <td className="px-4" align="center">{row.algo}</td>
                </tr>
                {actions[index] && (
                <tr className="h-14 row-b-bottom slide-down actions-row">
                <td colSpan="5">
                  <div style={{display : 'flex',}}>
                    <div style={{flex : 1}} align ="center"><DeleteOutlineOutlinedIcon /></div>
                    <div style={{flex : 1}} align ="center"><KeyOffOutlinedIcon /></div>
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
