import { Navigate } from "react-router";
import Navbar from "./components/Navbar";
import jwtDecode from "jwt-decode";

const AuthorizedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const { exp } = jwtDecode(user.token);
    console.log(exp);
    if (exp * 1000 < Date.now()) {
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
};
export default AuthorizedRoute;
