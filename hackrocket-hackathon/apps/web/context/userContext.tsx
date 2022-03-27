import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { interceptedAxios } from "../intrerceptors";

interface UserContext {
  isLoggedIn: boolean;
  login: (data: UserDataInput) => void;
  logout: () => void;
  userData: UserData | [];
  RequestError?: string;
}

interface UserData {
  username: string;
  email: string;
  platformData: Platform[];
}

interface Platform {
  username: string;
  provider: string;
}

export const UserContext = React.createContext<UserContext | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<UserData | []>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [RequestError, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (window) {
      const AccessToken = localStorage.getItem("access_token");
      if (AccessToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        if (["/register", "/login"].includes(router.pathname))
          router.replace("/home");
      } else {
        if (!["/register", "/login"].includes(router.pathname)) {
          router.replace("/login");
        }
      }
    }
  }, [isLoggedIn, router, isLoading]);

  const login = async (data: UserDataInput) => {
    if (data?.username && data?.password) {
      try {
        const req = await interceptedAxios.post(
          "/auth/login",
          { ...data },
          { withCredentials: true }
        );
        if (req.status === 200) {
          const { access_token } = req?.data;
          if (access_token) {
            window && localStorage.setItem("access_token", access_token);
            localStorage.setItem("username", req?.data?.data.username);
            setIsLoggedIn(true);
            setTimeout(() => {
              router.push("/home");
            }, 3000);
          }
        }
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Error");
      }
    }
  };
  const logout = () => {
    return;
  };
  const values = { login, logout, isLoggedIn, userData, RequestError };
  return (
    <UserContext.Provider value={values}>
      {isLoading ? (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{ height: "100vh" }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("Please wrap the Provider with the root of app.");
  }
  return context;
};
