import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  GetSortedPostsPayload,
  GetSortedPostsState,
  PostSorted,
} from "../../utilities/Types/getSortedPostsTypes";
import { RootState } from "../store";

// Define the async thunk
export const getSortedPosts = createAsyncThunk<
  PostSorted[],
  GetSortedPostsPayload,
  { state: RootState }
>(
  "posts/getSortedPosts",
  async function (
    { limit, offset, carTitleName },
    // Part below 'getState' is optional: to get current state
    // Use cases:
    // example: to conditionally dispatch actions
    // based on the current state
    // or to perform some logic based on the state values.
    { getState }
  ) {
    try {
      // Perform sorted API GET request.
      // However I can also give it yet another params
      // like '/sortByName' -> so in the future I can have
      // different kinds of sorting
      // BUT on the backend server I'd have to have a lot of
      // code with condtiional checkings against req.params &
      // to .query against Database accordingly.
      // NOTE that the PARAM can come from Arguments as well.
      const { data } = await axiosCredentials.get<{
        gotSortedPosts: PostSorted[];
      }>(
        `/api/v1/getsortedposts?limit=${limit}&offset=${offset}&cartTitleName=${carTitleName}`
      );
      return data?.gotSortedPosts;
    } catch (error) {
      // // Handle any errors here
      // throw new Error("Failed to fetch posts");

      // Maybe ^ this or that below:
      return [];
    }
  }
);

const initialState: GetSortedPostsState = {
  posts: [],
  // loading:false
  loading: "idle",
  error: null,
};

// Create the slice
const getSortedPostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSortedPosts.pending, (state) => {
        // state.loading = true;
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getSortedPosts.fulfilled, (state, action) => {
        // state.loading = false;
        state.loading = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getSortedPosts.rejected, (state, action) => {
        // state.loading = false;
        state.loading = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

// Export the slice and actions
export default getSortedPostsSlice.reducer;
