import { useRouter } from "next/router";
import { useEffect } from "react";
import AppTopBar from "../components/app-bar";
import Login from "./login";
import Register from "./register";
export default function Web() {
  const router = useRouter();
  useEffect(() => {
    if (window) {
      const isLogged = localStorage.getItem("isLogged");
      if (isLogged) {
        router.replace("/home", {}, {});
      }
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
}
