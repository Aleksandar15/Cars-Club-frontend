import { combineReducers } from "@reduxjs/toolkit";
import { verifySlice } from "../slices/verifySlice";
// import searchBar from "./appReducers/searchBar";

const rootReducer = combineReducers({
  // searchBar,
  verifySlice: verifySlice.reducer,
});

// While this RootState works,
// I'll move it inside root.tsx
// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
