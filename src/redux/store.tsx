import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
