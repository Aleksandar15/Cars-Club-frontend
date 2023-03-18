import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface VerifyStateProp {
  userStatus: {
    isUserAuthorized: boolean;
    codeStatus?: number;
  };
}

const initialState: VerifyStateProp = {
  userStatus: {
    isUserAuthorized: false,
  },
};

export const verifySlice = createSlice({
  name: "verifyUser",
  initialState,
  reducers: {
    authorized: (state, action: PayloadAction<VerifyStateProp>) => {
      state.userStatus = {
        isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      };
    },
    unauthorized: (state, action: PayloadAction<VerifyStateProp>) => {
      state.userStatus = {
        isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      };
    },
  },
});

export const { authorized, unauthorized } = verifySlice.actions;

export const selectVerifyUser = (state: RootState) =>
  state.verifySlice.userStatus;
