import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const classes = {
  headers : {
    color : '#ffffff'
  },
  headerRow: {
    position: 'sticky',
    top: 0,
    zIndex: 1, // Pour s'assurer que le header reste au-dessus des autres contenus
    backgroundColor: '#25525D',
  },
}

function createData(file, size, accessDate, path, algo) {
  return { file, size, accessDate, path, algo};
}

const rows = [
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),
  createData('TextFile.docx', '33.2 KB', 'February 4th 2024', 'C:\Users\hp\Desktop\react_electron', 'AES_256'),

];

export default function CustomTable() {
  return (
    <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto',}}>
      <Table sx={{ minWidth: 650 ,}} aria-label="simple table">
        <TableHead >
          <TableRow sx = {classes.headerRow} >
            <TableCell sx={classes.headers} >File</TableCell>
            <TableCell sx={classes.headers} align="center">Size</TableCell>
            <TableCell sx={classes.headers} align="center">Access Date</TableCell>
            <TableCell sx={classes.headers} align="center">Path</TableCell>
            <TableCell sx={classes.headers} align="center">Algorithm</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.file}
              </TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.accessDate}</TableCell>
              <TableCell align="right">{row.path}</TableCell>
              <TableCell align="right">{row.algo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}