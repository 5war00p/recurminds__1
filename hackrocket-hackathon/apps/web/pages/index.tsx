import AppTopBar from "../components/app-bar";
import Login from "./login";
import Register from "./register";
export default function Web() {
  return (
    <div>
      <AppTopBar/>
      <Login />
      <Register />
    </div>
  );
}
