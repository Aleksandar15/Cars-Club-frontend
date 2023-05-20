// NOTE
// NOT using this userInfoSlice because I've moved it all
// in a single verifySlice.ts state.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      // state = action?.payload; // Issues: No errors but doesn't work
      // console.log("state userInfoActioN11111:", state);
      // ^ gets updated in here BUT NOT in selectorUserInfo

      state.user_email = action?.payload?.user_email;
      state.user_id = action?.payload?.user_id;
      state.user_name = action?.payload?.user_name;
      // console.log("state userInfoActioN22222:", state);
    },
  },
});

export default userInfoSlice?.reducer;

export const { userInfoAction } = userInfoSlice.actions;

export const selectorUserInfo = (state: RootState) => state?.userInfoSlice;
