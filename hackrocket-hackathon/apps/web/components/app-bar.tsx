import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { styled, colors, ButtonProps } from "@mui/material";
import Link from "next/link";

interface HeaderButton extends ButtonProps {
  isactive?: string;
}

const HeaderButton = styled(Typography)<HeaderButton>`
  padding: 10px 12px;
  background-color: ${(props) =>
    props?.isactive === "true" ? colors.blueGrey[400] : colors.blueGrey[50]};
  border-radius: 12px;
  font-weight: ${(props) => (props?.isactive === "true" ? "600" : "400")};
  cursor: pointer;
  user-select: none;
  margin-right: 20px;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  :hover {
    background-color: ${colors.blueGrey[400]};
    color: white;
    transform: scale(1.1);
  }
`;

export default function AppTopBar({ currentPath }: any) {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      mt={"20px"}
      display={"flex"}
      flexDirection="row"
      alignItems={"center"}
    >
      <Box ml={"20px"} display={"flex"} alignItems={"center"}>
        {/* <IconButton>
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" ml={"10px"}>
          Social Coding Expereince
        </Typography>
      </Box>
      <Box ml="auto" mr={"20px"} display={"flex"} alignItems={"center"}>
        <Link href={"/home"} passHref>
          <HeaderButton isactive={(currentPath === "/home").toString()}>
            Dashboard
          </HeaderButton>
        </Link>
        <Link href={"/leaderboard"} passHref>
          <HeaderButton isactive={(currentPath === "/leaderboard").toString()}>
            Leaderboard
          </HeaderButton>
        </Link>
        <Link href={"/profile"} passHref>
          <HeaderButton isactive={(currentPath === "/profile").toString()}>
            My Account
          </HeaderButton>
        </Link>
        <Link href={"/requests"} passHref>
          <HeaderButton isactive={(currentPath === "/requests").toString()}>
            My Requests
          </HeaderButton>
        </Link>
      </Box>
    </Box>
  );
}
