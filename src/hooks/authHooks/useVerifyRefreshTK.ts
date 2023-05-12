import axios from "axios";
import { useEffect, useState } from "react";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";
import { authorize, unauthorized } from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";

const useVerifyRefreshTK = () => {
  const [authUser, setAuthUser] = useState<boolean | undefined>(undefined);
  const { isModalOpen } = useSelectorTyped(selectorOpenModalText);
  const dispatchTyped = useDispatchTyped();
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
          if (errDataTyped?.isSuccessful === false) {
            setAuthUser(false);
            dispatchTyped(
              unauthorized({
                userStatus: {
                  isUserAuthorized: false,
                  codeStatus: err?.response?.status,
                },
              })
            );
            dispatchTyped(
              openModalAction({
                isModalOpen: !isModalOpen,
                text: `Login please!`,
              })
            );
            // IMPORTANT NOTE ~ the reason why <ModalText/> is showing
            // up (ONLY in ProtectedRoutes) is because it is already
            // rendered inside Login.tsx
            // (where I'm navigating at in case: userAuth === false),
            // so I don't need to render it twice inside ProtectedRoutes.
            // NOTE AS WELL ~ for non-protected AKA Public Routes like
            // HomePage.tsx will not trigger the Modal, it's all safe:)
          }
        }
      }
    };

    verifyRefreshToken();
  }, []);

  return authUser;
};
export default useVerifyRefreshTK;
