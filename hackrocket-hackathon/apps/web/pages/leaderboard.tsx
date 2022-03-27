import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  profiles: number,
  submtions: number,
  upvotes: number,
  rank: number,
) {
  return { name, profiles, submtions, upvotes, rank };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4),
  createData('Ice cream sandwich', 237, 9.0, 37, 5),
  createData('Eclair', 262, 16.0, 24, 6),
  createData('Cupcake', 305, 3.7, 67, 7),
  createData('Gingerbread', 356, 16.0, 49, 8),
];
function LeaderBoard() {
  return (
    <div>
                <h4 >Leaderboard</h4>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">No.of Profiles</TableCell>
            <TableCell align="right">Total submtions</TableCell>
            <TableCell align="right">Up votes</TableCell>
            <TableCell align="right">Dev rank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.profiles}</TableCell>
              <TableCell align="right">{row.submtions}</TableCell>
              <TableCell align="right">{row.rank}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

  )
}

export default LeaderBoard