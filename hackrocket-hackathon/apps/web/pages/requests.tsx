import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppTopBar from "../components/app-bar";
import { interceptedAxios } from "../intrerceptors";

function Voiting() {
  const [friends, setFriends] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const call = async () => {
      try {
        const req = await interceptedAxios.get("conn/");
        const data = req.data?.data;
        console.log(data);
        setFriends(data?.profile?.friends);
        setFollowing(data?.profile?.following);
        setFriends(data?.profile?.friends);
      } catch (error) {
        console.log(error);
      }
    };
    call();
  }, []);
  return (
    <>
      <AppTopBar currentPath={"/requests"} />
      <Container>
        <Box mt={"20px"}>
          <Button onClick={() => router.push("/search_user")}>
            Search A User
          </Button>
        </Box>
        <Box mt={"20px"} ml={"10px"}>
          <Typography>Following</Typography>
          <Typography>{following?.length}</Typography>
        </Box>
        <Box mt={"20px"} ml={"10px"}>
          <Typography>Followers</Typography>
          <Typography>{followers?.length}</Typography>
        </Box>
        <Box mt={"20px"} ml={"10px"}>
          <Typography>Friends</Typography>
          <Typography>{friends?.length}</Typography>
        </Box>
      </Container>
    </>
  );
}

export default Voiting;
