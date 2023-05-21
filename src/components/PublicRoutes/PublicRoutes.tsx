import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import Loading from "../Loading/Loading";

const PublicRoutes = () => {
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);

  useVerifyRefreshTK("public", isUserAuthorized);

  const location = useLocation();

  if (isUserAuthorized === undefined) {
    return <Loading />;
  }

  return isUserAuthorized ? (
    <Navigate to={location.state?.from || "/"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoutes;
