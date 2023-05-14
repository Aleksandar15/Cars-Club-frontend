import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface VerifyStateProp {
  userStatus: {
    isUserAuthorized: boolean | undefined | "loading";
    codeStatus?: number;
  };
}

const initialState: VerifyStateProp = {
  userStatus: {
    isUserAuthorized: undefined,
  },
};

export const verifySlice = createSlice({
  name: "verifyUser",
  initialState,
  reducers: {
    authorize: (state, action: PayloadAction<VerifyStateProp>) => {
      state.userStatus = {
        isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      };
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
