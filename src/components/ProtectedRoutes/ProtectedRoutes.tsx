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
import { authorize } from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";
import Loading from "../Loading/Loading";

const ProtectedRoutes = () => {
  const [authUser, setAuthUser] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // GET /verifyrefreshtoken
        const { data } = await axiosCredentials.get(
          `/api/v1/auth/verifyrefreshtoken`
        );

        const dataTyped = data as SuccessUserAuth;
        console.log("dataTyped verifyRefreshToken:", dataTyped?.message);
        if (data?.isSuccessful) {
          setAuthUser(true);

          // Also on success update the isUserAuthorized state for NavBar
          dispatchTyped(
            authorize({
              userStatus: {
                isUserAuthorized: true,
              },
            })
          );
        }
        // Error is handled in the Catch block
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errDataTyped = err?.response?.data as ErrorUserAuth;
          console.log("err:", err?.response);
          if (errDataTyped?.isSuccessful === false) {
            setAuthUser(false);
            dispatchTyped(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Login please!`,
              })
            );
            // IMPORTANT NOTE ~ the reason why <ModalText/> is showing
            // up is because it is already rendered inside Login.tsx
            // (where I'm navigating at in case userAuth is false)
            // so I don't need to render it twice in here, indeed.
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
