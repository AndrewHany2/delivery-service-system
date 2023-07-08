import { Navigate } from "react-router";

const AuthorizedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default AuthorizedRoute;
