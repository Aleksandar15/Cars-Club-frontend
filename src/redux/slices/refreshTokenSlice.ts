import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  accessToken?: string;
}

const initialState: InitialState = {
  accessToken: undefined,
};

const refreshTokenSlice = createSlice({
  name: "refreshAccessToken",
  initialState,
  reducers: {
    refreshAccessTokenAction: (state, action: PayloadAction<InitialState>) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export default refreshTokenSlice.reducer;

export const { refreshAccessTokenAction } = refreshTokenSlice.actions;

// export const selectorAccessToken = (state: {
//   refreshTokenSlice: InitialState;
// }) => state.refreshTokenSlice; // Works
// // Alternatively shorter:
export const selectorAccessToken = (state: RootState) =>
  state.refreshTokenSlice;
// NOTE this can be: state.refreshTokenSlice.accessToken
// BUT: inside useAxiosInterceptor I'd have to modify expected data to <string>
// INSTEAD: I'll just destructure the {accessToken} inside useAxiosInterceptor.
