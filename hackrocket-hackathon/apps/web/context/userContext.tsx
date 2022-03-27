import { CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

interface UserContext {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userData: UserData | [];
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
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    if (isLoggedIn) {
      if (["/register", "/login"].includes(router.pathname))
        router.replace("/home");
    }
    setLoading(false);
  }, []);
  const login = () => {
    return;
  };
  const logout = () => {
    return;
  };
  const values = { login, logout, isLoggedIn, userData };
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
