import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { refreshAccessTokenAction } from "../../redux/slices/refreshTokenSlice";
import { axiosDefaultReq } from "../../utilities/API/axios";

export interface DataAccessToken {
  accessToken?: string;
}

const useRefreshToken = () => {
  const dispatchTyped = useDispatchTyped();

  const refreshFN = async () => {
    try {
      const { data } = await axiosDefaultReq.get(`/api/v1/auth/refreshtoken`, {
        withCredentials: true,
      });

      const dataTyped = data as DataAccessToken;

      dispatchTyped(
        refreshAccessTokenAction({ accessToken: dataTyped?.accessToken })
      );

      return dataTyped?.accessToken;
    } catch (err) {
      return `Error refreshing accessToken`;
    }
  };

  return refreshFN;
};

export default useRefreshToken;
