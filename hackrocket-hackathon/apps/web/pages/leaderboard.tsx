import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AppTopBar from "../components/app-bar";

function createData(
  name: string,
  profiles: number,
  submtions: number,
  upvotes: number,
  rank: number
) {
  return { name, profiles, submtions, upvotes, rank };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4),
  createData("Ice cream sandwich", 237, 9.0, 37, 5),
  createData("Eclair", 262, 16.0, 24, 6),
  createData("Cupcake", 305, 3.7, 67, 7),
  createData("Gingerbread", 356, 16.0, 49, 8),
];
function LeaderBoard() {
  return (
    <>
      <AppTopBar currentPath={"/leaderboard"} />
    </>
  );
}

export default LeaderBoard;
