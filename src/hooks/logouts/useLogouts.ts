import axios from "axios";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { unauthorized } from "../../redux/slices/verifySlice";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  ErrorUserAuth,
  LogoutSuccess,
} from "../../utilities/Types/userAuthTypes";
import useMyNavigate from "../useMyNavigate/useMyNavigate";

const useLogouts = () => {
  const dispatchTyped = useDispatchTyped();
  const navigatePage = useMyNavigate();

  const clickLogout = async () => {
    try {
      const { data } = await axiosCredentials.delete(`/api/v1/auth/logout`);
      const dataTyped = data as LogoutSuccess;

      if (dataTyped?.isSuccessful) {
        // NOTE: If operation isSuccessful then isUserAuthorized: false
        dispatchTyped(
          unauthorized({ userStatus: { isUserAuthorized: false } })
        );
        navigatePage("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Fix TSC error: 'Object (.response) is possibly 'undefined''
        // by using optional chaining (`?.`)
        const errDataTyped = err?.response?.data as ErrorUserAuth;

        if (errDataTyped?.isSuccessful === false) {
          switch (errDataTyped?.message) {
            case "Failed to logout - missing refreshToken cookie":
              // This case means user is virtually logged out // Status 400
              return dispatchTyped(
                unauthorized({
                  userStatus: {
                    isUserAuthorized: errDataTyped?.isSuccessful,
                    codeStatus: 400,
                  },
                })
              );
            case "Failed to logout - user already logged out":
              // User's refreshToken cookie is not found in Database
              // In multi-device scenario: somebody clicked 'logoutAll'.
              // (or has hacker used the refreshToken? ~ Alert empathy msg)
              // Still, the user is practically logged out.
              return dispatchTyped(
                unauthorized({
                  userStatus: {
                    isUserAuthorized: errDataTyped?.isSuccessful,
                    codeStatus: 401,
                  },
                })
              );
            default:
              // Server error: a frontend user/hacker shouldn't know about
              return;
          }
        }
      }
    }
  };

  const clickLogoutAll = async () => {
    try {
      const { data } = await axiosCredentials.delete(
        `/api/v1/auth/logoutallsessions`
      );
      const dataTyped = data as LogoutSuccess;

      if (dataTyped?.isSuccessful) {
        // NOTE: If operation isSuccessful then isUserAuthorized: false
        dispatchTyped(
          unauthorized({ userStatus: { isUserAuthorized: false } })
        );
        navigatePage("/");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Fix TSC error: 'Object (.response) is possibly 'undefined''
        // by using optional chaining (`?.`)
        const errDataTyped = err?.response?.data as ErrorUserAuth;

        if (errDataTyped?.isSuccessful === false) {
          switch (errDataTyped?.message) {
            case "Failed to logout - missing refreshToken cookie":
              // This case means user is virtually logged out // Status 400
              return dispatchTyped(
                unauthorized({
                  userStatus: {
                    isUserAuthorized: errDataTyped?.isSuccessful,
                    codeStatus: 400,
                  },
                })
              );
            case "Failed to logout - user already logged out":
              // User's refreshToken cookie is not found in Database
              // In multi-device scenario: somebody clicked 'logoutAll'.
              // (or has hacker used the refreshToken? ~ Alert empathy msg)
              // Still, the user is practically logged out.
              return dispatchTyped(
                unauthorized({
                  userStatus: {
                    isUserAuthorized: errDataTyped?.isSuccessful,
                    codeStatus: 401,
                  },
                })
              );
            default:
              // Server error: a frontend user/hacker shouldn't know about
              return;
          }
        }
      }
    }
  };

  return { clickLogout, clickLogoutAll };
};

export default useLogouts;
