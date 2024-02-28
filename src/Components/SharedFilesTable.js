import * as React from 'react';
import './CustomTable.css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function createData(file, size, date, algo) {
  return { file, size, date, algo};
}

const rows = [
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.2docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile3.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),

  // Ajoutez d'autres données ici...
];

export default function SharedFilesTable() {
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

  return (
    <div className="w-full h-full overflow-y-auto" style={{ maxHeight: '100%', }}>
      <div ref={tableRef} style={{ maxHeight: `${containerHeight}px`, overflowY: 'auto',}}>
        <table className="w-full">
          <thead className="text-white h-14">
            <tr className="sticky top-0" style={{ backgroundColor: '#25525D' }}>
              <th className="px-4">File</th>
              <th className="px-4">Size</th>
              <th className="px-4">Receiving date</th>
              <th className="px-4">Algorithm</th>
              <th className="px-4">Action</th>

            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white h-14 row-b-bottom">
                  <td align='center'>{row.file}</td>
                  <td className="px-4" align="center">{row.size}</td>
                  <td className="px-4" align="center">{row.date}</td>
                  <td className="px-4" align="center">{row.algo}</td>
                  <td align ="center"><DeleteOutlineOutlinedIcon /></td>

                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
