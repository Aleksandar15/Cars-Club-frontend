import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import Loading from "../Loading/Loading";

const ProtectedRoutes = () => {
  const { isUserAuthorized } = useSelectorTyped(selectVerifyUser);

  useVerifyRefreshTK("private", isUserAuthorized);

  const location = useLocation();
  if (isUserAuthorized === undefined) {
    return <Loading />;
  }

  return isUserAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
