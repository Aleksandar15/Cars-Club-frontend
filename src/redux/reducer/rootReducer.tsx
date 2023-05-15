import { combineReducers } from "@reduxjs/toolkit";
import { verifySlice } from "../slices/verifySlice";
// import searchBar from "./appReducers/searchBar";
import openModalTextSlice from "../slices/openModalTextSlice";
import refreshTokenSlice from "../slices/refreshTokenSlice";
import openModalPostSlice from "../slices/openModalPostSlice";

const rootReducer = combineReducers({
  // searchBar,
  verifySlice: verifySlice.reducer,
  // Default exports with .reducer method
  // allows me to use shorthand syntax
  openModalTextSlice,
  refreshTokenSlice,
  openModalPostSlice,
});

// While this RootState works,
// I'll move it inside root.tsx
// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
