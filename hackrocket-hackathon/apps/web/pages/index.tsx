import { useRouter } from "next/router";
import { useEffect } from "react";
import AppTopBar from "../components/app-bar";
import { useUserContext } from "../context/userContext";
import Login from "./login";
import Register from "./register";
export default function Web() {
  const router = useRouter();
  const { isLoggedIn } = useUserContext();
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/home");
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
}
