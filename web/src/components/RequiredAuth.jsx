import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../Hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={"/unauthorised"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequiredAuth;
