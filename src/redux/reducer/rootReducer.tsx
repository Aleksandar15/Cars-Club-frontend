import { combineReducers } from "@reduxjs/toolkit";
import { store } from "../../main";

import { verifyReducer } from "./verifyReducer/verifyReducer";
// import searchBar from "./appReducers/searchBar";

const rootReducer = combineReducers({
  verifyReducer,
  // searchBar,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default rootReducer;
