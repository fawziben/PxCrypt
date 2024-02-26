import * as React from 'react';
import './CustomTable.css'
import { Container } from '@mui/material';

const classes = {
  headers : {
    color : '#ffffff'
  },
  headerRow: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: '#25525D',
  },
}

function createData(file, size, accessDate, path, algo) {
  return { file, size, accessDate, path, algo };
}

const rows = [
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\\Users\\hp\\Desktop\\react_electron', 'AES_256'),

  // Ajoutez d'autres données ici...
];

export default function CustomTable() {
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
    <div className="w-full h-full overflow-y-auto" style={{ maxHeight: '100%' }}>
      <div ref={tableRef} style={{ maxHeight: `${containerHeight}px`, overflowY: 'auto' }}>
        <table className="w-full">
          <thead className="text-white h-12">
            <tr className="sticky top-0" style={{ backgroundColor: '#25525D' }}>
              <th className="px-4">File</th>
              <th className="px-4">Size</th>
              <th className="px-4">Access Date</th>
              <th className="px-4">Path</th>
              <th className="px-4">Algorithm</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="bg-white h-12">
                <td align='center'>{row.file}</td>
                <td className="px-4" align="center">{row.size}</td>
                <td className="px-4" align="center">{row.accessDate}</td>
                <td className="px-4" align="center">{row.path}</td>
                <td className="px-4" align="center">{row.algo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
