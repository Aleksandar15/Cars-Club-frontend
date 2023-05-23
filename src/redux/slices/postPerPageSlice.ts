import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PostPerPageSortGetPosts {
  postPerPage: number;
  // Add more for future use
}

const initialState: PostPerPageSortGetPosts = {
  postPerPage: 5, // Change postPerPage
};

// STORE postPerPage so any components that uses it
// one change: will affect ALL of them Components.
// Future plans:
// Let User decide the amount of number to show per page
const postPerPageSlice = createSlice({
  name: "storePostPerPage",
  initialState,
  reducers: {
    onChangePostPerPage: (
      state,
      action: PayloadAction<PostPerPageSortGetPosts>
    ) => {
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.postPerPage = action.payload?.postPerPage;
    },
  },
});

export default postPerPageSlice.reducer;

export const { onChangePostPerPage } = postPerPageSlice.actions;

// Not much reusability below
export const selectorPostPerPage = (state: RootState) =>
  state.postPerPageSlice?.postPerPage;
