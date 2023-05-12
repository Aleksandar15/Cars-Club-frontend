import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useVerifyRefreshTK from "../../hooks/authHooks/useVerifyRefreshTK";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";
import { authorize } from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";
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
