import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { interceptedAxios } from "../intrerceptors";

function SearcUser() {
  const [searchName, setSearchName] = useState("");
  const [users, setUsers] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const router = useRouter();
  const doSearchUser = async () => {
    setIsSearched(true);
    try {
      const req = await interceptedAxios.get(`conn/search?user=${searchName}`, {
        withCredentials: true,
      });
      const data = req?.data.data;
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Box mt={"30px"}>
        <TextField
          fullWidth
          style={{ borderRadius: "5px !important" }}
          label={"Search User"}
          placeholder={"Search User"}
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={doSearchUser}
      >
        Search
      </Button>
      {isSearched && (
        <Box style={{ marginTop: "20px" }}>
          <Typography>Results: </Typography>
          {users.map((user: any, index) => {
            return (
              <Box
                display={"flex"}
                alignItems={"center"}
                marginBottom={"10px"}
                component={"div"}
                onClick={() => router.push(`/user/${user.username}`)}
              >
                <Typography>{user.username}</Typography>
                <Button style={{ marginLeft: 10 }} variant="outlined">
                  See User
                </Button>
              </Box>
            );
          })}
        </Box>
      )}
    </Container>
  );
}

export default SearcUser;
