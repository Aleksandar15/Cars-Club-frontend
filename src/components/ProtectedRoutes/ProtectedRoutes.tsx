import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";
import { axiosCredentials } from "../../utilities/API/axios";
import Loading from "../Loading/Loading";

interface ErrorDataAxios {
  isSuccessful: boolean;
  message: string;
}
interface SuccessDataAxios extends ErrorDataAxios {
  user_role: string;
}

const ProtectedRoutes = () => {
  const [authUser, setAuthUser] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // GET /verifyrefreshtoken
        const { data } = await axiosCredentials.get(
          `/api/v1/auth/verifyrefreshtoken`
        );

        const dataTyped = data as SuccessDataAxios;
        console.log("dataTyped verifyRefreshToken:", dataTyped?.message);
        if (data?.isSuccessful) {
          setAuthUser(true);
        }
        // Error is handled in the Catch block
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errDataTyped = err?.response?.data as ErrorDataAxios;
          console.log("err:", err?.response);
          if (errDataTyped?.isSuccessful === false) {
            setAuthUser(false);
            dispatchTyped(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Login please!`,
              })
            );
          }
        }
      }
    };

    verifyRefreshToken();
  }, []);

  const location = useLocation();

  const dispatchTyped = useDispatchTyped();
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);

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
