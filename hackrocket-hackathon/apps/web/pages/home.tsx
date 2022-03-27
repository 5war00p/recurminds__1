import { CircularProgress, Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppTopBar from "../components/app-bar";
import { interceptedAxios } from "../intrerceptors";

function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      const username = window && localStorage.getItem("username");
      try {
        const req = await interceptedAxios.get(`profile/`, {
          withCredentials: true,
        });
        if (req.status === 200) {
          const { platform_profiles } = req.data?.data;
          if (platform_profiles.length < 1) {
            router.push("/profile?edit=true");
          }
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    call();
  }, []);
  return (
    <>
      <AppTopBar currentPath={"/home"} />
      <Container
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        {isLoading ? <CircularProgress /> : null}
      </Container>
    </>
  );
}

export default Home;
