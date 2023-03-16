import { allActionTypes } from "../action-types/allActionTypes";
import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../reducer/rootReducer";

interface DataIsVerify {
  isUserAuthorized: boolean;
}

interface ErrorResponse {
  message: string;
  code: number;
  isSuccessful?: boolean;
}

const verifyAction =
  (data: DataIsVerify): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch): Promise<void> => {
    try {
      dispatch({
        type: allActionTypes.USER_IS_AUTHORIZED,
        payload: { isUserAuthorized: data.isUserAuthorized },
      });
    } catch (err: any) {
      const errorResponse: ErrorResponse = err.response.data;
      dispatch({
        type: allActionTypes.USER_IS_NOT_AUTHORIZED,
        // payload: err?.response?.data,
        payload: errorResponse?.message,
      });
    }
  };

export { verifyAction };
