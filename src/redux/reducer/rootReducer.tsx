import { combineReducers } from "@reduxjs/toolkit";
import { verifySlice } from "../slices/verifySlice";
// import searchBar from "./appReducers/searchBar";
import openModalTextSlice from "../slices/openModalTextSlice";
import refreshTokenSlice from "../slices/refreshTokenSlice";
import openModalPostSlice from "../slices/openModalPostSlice";
import getAllPosts from "../createAsyncThunk/getAllPosts";
import userInfoSlice from "../slices/userInfoSlice";
import modalPostButtonValueSlice from "../slices/modalPostButtonValueSlice";
import modalPostLoadingSlice from "../slices/modalPostLoading";
import modalPostEmptyFieldValueSlice from "../slices/modalPostEmptyFieldValue";
import modalPostEditPostSlice from "../slices/modalPostEditPostSlice";
import modalPostSuccessTextSlice from "../slices/modalPostSuccessTextSlice";
import modalDeletePostSlice from "../slices/modalDeletePostSlice";
import formSearchCarsSlice from "../slices/formSearchCarsSlice";
import getSortedPostsSlice from "../createAsyncThunk/getSortedPosts";

const rootReducer = combineReducers({
  // searchBar,
  verifySlice: verifySlice.reducer,
  // Default exports with .reducer method
  // allows me to use shorthand syntax
  openModalTextSlice,
  refreshTokenSlice,
  openModalPostSlice,
  getAllPosts,
  userInfoSlice,
  modalPostButtonValueSlice,
  modalPostLoadingSlice,
  modalPostEmptyFieldValueSlice,
  modalPostEditPostSlice,
  modalPostSuccessTextSlice,
  modalDeletePostSlice,
  formSearchCarsSlice,
  getSortedPostsSlice,
});

// While this RootState works,
// I'll move it inside root.tsx
// export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
