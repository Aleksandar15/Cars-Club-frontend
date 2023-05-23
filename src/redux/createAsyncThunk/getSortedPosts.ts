import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosCredentials } from "../../utilities/API/axios";
import {
  EditSortedPost,
  GetSortedPostsPayload,
  GetSortedPostsState,
  PostSorted,
  ReceivedDataSortedPosts,
} from "../../utilities/Types/getSortedPostsTypes";
import { RootState } from "../store";

// Define the getSortedPostsAsyncThunk async thunk
export const getSortedPostsAsyncThunk = createAsyncThunk<
  // PostSorted[], // Returned Type. Updated:
  ReceivedDataSortedPosts,
  GetSortedPostsPayload,
  { state: RootState }
>(
  "sortedPosts/getSortedPostsAsyncThunk",
  async function (
    { limit, offset, carNameTitle },
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

      // const { data } = await axiosCredentials.get<{
      //   gotSortedPosts: PostSorted[];
      // }>(
      // return data?.gotSortedPosts;
      // ...
      // UPDATED LOGIC:
      const { data }: { data: ReceivedDataSortedPosts } =
        await axiosCredentials.get<ReceivedDataSortedPosts>(
          `/api/v1/post/getsortedposts?limit=${limit}&offset=${offset}&carNameTitle=${carNameTitle}`
        );
      return data;
    } catch (error) {
      // // Handle any errors here
      // throw new Error("Failed to fetch posts");

      // Maybe ^ this or that below:
      // return [];

      // Updated logic
      return {
        total_posts: 0,
        posts: [],
      };
    }
  }
);

const initialState: GetSortedPostsState = {
  posts: [],
  // loading:false
  // loading: "idle",
  status: "idle",
  error: null,
  // update:
  total_posts: 0,
};

// Create the slice
const getSortedPostsSlice = createSlice({
  name: "sortedPosts",
  initialState,
  reducers: {
    // Reducer for DELETE Button in 'ModalDeletePost'
    //  upon response 200 of deletion: filter out the deleted Post.
    deletePostsByIdAction(
      state: GetSortedPostsState,
      action: PayloadAction<string>
    ) {
      const postId = action.payload;
      const filteredPosts = state.posts.filter(
        (post) => post.post_id !== postId
      );
      state.posts = filteredPosts;
    },
    editSortedPostAction: (
      state: GetSortedPostsState,
      action: PayloadAction<PostSorted>
    ) => {
      const editedPost = action.payload;
      const editedPostID = action.payload.post_id;
      state.posts = state.posts.map((currentPost) => {
        return currentPost.post_id === editedPostID ? editedPost : currentPost;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSortedPostsAsyncThunk.pending, (state) => {
        // state.loading = true;
        // state.loading = "loading";
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSortedPostsAsyncThunk.fulfilled, (state, action) => {
        // state.loading = false;
        // state.loading = "succeeded";
        state.status = "succeeded";
        // state.posts = action.payload;

        state.posts = action.payload.posts;
        state.total_posts = action.payload.total_posts;
      })
      .addCase(getSortedPostsAsyncThunk.rejected, (state, action) => {
        // state.loading = false;
        // state.loading = "failed";
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch posts";
      });
  },
});

// Export the slice, states and actions
export default getSortedPostsSlice.reducer;

export const selectorSortedPostsData = (state: RootState) =>
  state?.getSortedPostsSlice?.posts;
export const selectorSortedPostsStatus = (state: RootState) =>
  state?.getSortedPostsSlice?.status;
export const selectorSortedPostsError = (state: RootState) =>
  state?.getSortedPostsSlice?.error;
export const selectorSortedTotalPosts = (state: RootState) =>
  state?.getSortedPostsSlice?.total_posts;

export const { editSortedPostAction } = getSortedPostsSlice.actions;
