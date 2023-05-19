import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IsUserAuthorized } from "../../utilities/Types/verifyUserTypes";
import { RootState } from "../store";

interface UserInfo {
  user_id: string;
  user_name: string;
  user_email: string;
}

const initialState: UserInfo = {
  user_id: "loading",
  user_email: "loading",
  user_name: "loading",
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    userInfoAction: (state, action: PayloadAction<UserInfo>) => {
      // state.userStatus = {
      //   isUserAuthorized: action.payload.userStatus.isUserAuthorized,
      // };
      state = action?.payload;
    },
  },
});

export const { userInfoAction } = userInfoSlice.actions;

export const selectorUserInfo = (state: RootState) => state;
