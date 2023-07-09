import { Navigate } from "react-router";

const AuthorizedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user && !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default AuthorizedRoute;
