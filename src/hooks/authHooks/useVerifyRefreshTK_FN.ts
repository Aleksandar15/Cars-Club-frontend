import axios from "axios";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { authorize, unauthorized } from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  SuccessUserAuth,
} from "../../utilities/Types/userAuthTypes";

const useVerifyRefreshTK_FN = () => {
  const dispatchTyped = useDispatchTyped();

  const verifyRefreshToken = async () => {
    try {
      // GET /verifyrefreshtoken
      const { data } = await axiosCredentials.get(
        `/api/v1/auth/verifyrefreshtoken`
      );

      const dataTyped = data as SuccessUserAuth;
      if (dataTyped?.isSuccessful) {
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
          dispatchTyped(
            unauthorized({
              userStatus: {
                isUserAuthorized: false,
                codeStatus: err?.response?.status,
              },
            })
          );
        }
      }
    }
  };

  return verifyRefreshToken;
};
export default useVerifyRefreshTK_FN;
