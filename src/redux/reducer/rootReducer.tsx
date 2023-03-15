import { combineReducers } from "@reduxjs/toolkit";

// import verifyReducer from "./appReducers/verifyReducer";
// import searchBar from "./appReducers/searchBar";

const rootReducer = combineReducers({
  // verifyReducer,
  // searchBar,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
