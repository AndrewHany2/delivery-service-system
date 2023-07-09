import { Navigate } from "react-router";
import Navbar from "./components/Navbar";

const AuthorizedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user && !user?.token) {
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
