import * as React from 'react';
import './CustomTable.css'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Download } from '@mui/icons-material';
import { IconButton } from '@mui/material';
function createData(file, size, date, owner) {
  return { file, size, date, owner};
}

const rows = [
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),
  createData('TextFile1.docx', '33.2 KB', 'February 4th 2024', 'if_benmoumen@esi.dz'),


  // Ajoutez d'autres données ici...
];

export default function ReceivedFilesTable() {
  const tableRef = React.useRef(null);
  const [containerHeight, setContainerHeight] = React.useState(0);

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
              <th className="px-4">Owner</th>
              <th className="px-4">Actions</th>

            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white h-14 row-b-bottom">
                  <td align='center'>{row.file}</td>
                  <td className="px-4" align="center">{row.size}</td>
                  <td className="px-4" align="center">{row.date}</td>
                  <td className="px-4" align="center">{row.owner}</td>
                  <div align = 'center'>
                   <td ><IconButton><DeleteOutlineOutlinedIcon /></IconButton></td>
                   <td ><IconButton><Download /></IconButton></td> 
                   </div>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
