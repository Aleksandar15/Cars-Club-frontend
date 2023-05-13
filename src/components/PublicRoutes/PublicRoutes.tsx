import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import Loading from "../Loading/Loading";

const PublicRoutes = () => {
  const authUser = useVerifyRefreshTK();
  const location = useLocation();

  if (authUser === undefined) {
    return <Loading />;
  }

  return authUser ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
