import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IsUserAuthorized } from "../../utilities/Types/verifyUserTypes";
import { RootState } from "../store";

interface VerifyStateProp {
  userStatus: {
    isUserAuthorized: IsUserAuthorized;
    codeStatus?: number;
    user_id?: string; // Be optional for Logouts
    user_name?: string;
    user_email?: string;
    user_role?: string;
  };
}

const initialState: VerifyStateProp = {
  userStatus: {
    isUserAuthorized: undefined,
    user_id: "loading",
    user_email: "loading",
    user_name: "loading",
    user_role: "loading",
  },
};

export const verifySlice = createSlice({
  name: "verifyUser",
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<VerifyStateProp>) => {
      // state.userStatus = {
      //   isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      // }; // UPDATED this into below -> FOR including USER INFO
      state.userStatus = action.payload.userStatus;
    },
    unauthorized: (state, action: PayloadAction<VerifyStateProp>) => {
      // state.userStatus = {
      //   isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      // };
      state.userStatus = action.payload.userStatus;
    },
  },
});

export const { authorize, unauthorized } = verifySlice.actions;

export const selectVerifyUser = (state: RootState) =>
  state.verifySlice.userStatus;
