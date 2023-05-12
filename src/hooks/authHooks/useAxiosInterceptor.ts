import { useEffect } from "react";
import { useSelectorTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorAccessToken } from "../../redux/slices/refreshTokenSlice";
import { axiosCredentials } from "../../utilities/API/axios";
import useRefreshToken, { DataAccessToken } from "./useRefreshToken";

// NOTE using 'axiosCredentials' custom instance of axios
// so that I can add my own headers as per needed.

const useAxiosInterceptor = () => {
  const refreshFN = useRefreshToken();
  const accessToken = useSelectorTyped<DataAccessToken>(selectorAccessToken);

  useEffect(() => {
    const requestIntercept = axiosCredentials.interceptors.request.use(
      (config) => {
        // Check if header 'Authorization' is not set, then I'll know
        // it's NOT a retry; meaning: this will be the first attempt.
        // Otherwise if it's set, I know it's a retry, and has already been handled/set by
        // the responseIntercept's 403 Error; meaning: the previous request has failed once.
        if (!config.headers["Authorization"]) {
          // Now that this is the initial request let's pass in the accessToken.
          // accessToken either comes from the initial login or by refreshing it (later on).
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceppt = axiosCredentials.interceptors.response.use(
      // If response is good -> just return the response
      (response) => response,
      // Otherwise if accessToken (short lifespan) has expired handle the error
      async (error) => {
        // Grab prevRequest by accessing the .config property
        const prevRequest = error?.config;
        // Expired accessToken's error 403 status code by the backend
        // && check custom property .sent -> if it doesn't exist, which
        // means: retry ONLY once & avoid endless loop of 403's.
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // That's why I set .sent to true
          prevRequest.sent = true;

          const newAccessToken = await refreshFN();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // Now that the request is updated with newAccessToken,
          // call axiosCredentials again; meaning: make new request with newAccessToken.
          return axiosCredentials(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Interceptors don't remove themselves, remove them in same way as Event Listeners
    return () => {
      axiosCredentials.interceptors.request.eject(requestIntercept);
      axiosCredentials.interceptors.response.eject(responseInterceppt);
    };
  }, [accessToken]);

  // Returning the axiosCredentials instance with the interceptors attached to the req & res.
  return axiosCredentials;
};

export default useAxiosInterceptor;
