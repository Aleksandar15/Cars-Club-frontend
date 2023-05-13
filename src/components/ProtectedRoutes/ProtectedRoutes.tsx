import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import Loading from "../Loading/Loading";

const ProtectedRoutes = () => {
  const authUser = useVerifyRefreshTK();

  const location = useLocation();
  if (authUser === undefined) {
    return <Loading />;
  }

  return authUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
