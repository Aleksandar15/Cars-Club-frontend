import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import useVerifyRefreshTK_FN from "../../hooks/authHooks/useVerifyRefreshTK_FN";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import Loading from "../Loading/Loading";

const PublicRoutes = () => {
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);

  // useVerifyRefreshTK("public", isUserAuthorized);
  const verifyRefreshTokenFN = useVerifyRefreshTK_FN();

  // By having it in Effect it only runs on HARD REFRESH:)
  // fixed: double-running useVerifyRefreshTK by Login.tsx
  useEffect(() => {
    console.count("PublicRoutes EFFECT RUNS");
    if (isUserAuthorized === undefined) {
      verifyRefreshTokenFN();
    }
  }, []);

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
