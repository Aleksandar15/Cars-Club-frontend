import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import { axiosCredentials } from "../../utilities/API/axios";
import { PostType } from "../../utilities/Types/postsTypes";
import { RootState } from "../store";

// const axiosCredentials = useAxiosInterceptor();
// // ^ Invalid hook call. Only inside of the body of a fn component.

// Define the async thunk
export const getAllPosts: AsyncThunk<PostType[], void, {}> = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    // thunkAPI must be 2nd argument
    try {
      const { data } = await axiosCredentials("/api/v1/post/getallposts");
      // return data; // Works but I rather access the real data:
      // Because destructuring this in Post component causes TSC error

      // return data?.gotThreePostsROWS; // perfect, however "LIMIT 3" was my backend test

      return data?.gotAllPostsROWS; //updated
    } catch (error) {
      // throw new Error("Error fetching posts");
      // Instead answer by Drew Reese stackoverflow:
      // https://stackoverflow.com/questions/76077610/react-redux-data-not-being-passed-correctly-components-with-dynamic-routes/76078197#76078197
      thunkAPI.rejectWithValue(error);
    }
  }
);

// Create the posts slice
interface InitialState {
  posts: PostType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: null | string;
}
const initialState: InitialState = {
  posts: [],
  status: "idle",
  error: null,
};
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postsReceived: {
      // This reducer is not required
      reducer(state: InitialState, action: PayloadAction<PostType[]>) {
        state.posts = action.payload;
      },
      prepare: (payload: PostType[]) => {
        return { payload };
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.error.message === typeof "string"
            ? action.error.message
            : null;
      });
  },
});

// Export the async thunk and the posts reducer
// export { getAllPosts }; // already exported inline
export default postsSlice.reducer;

export const selectorPostsData = (state: RootState) =>
  state?.getAllPosts?.posts;
export const selectorPostsStatus = (state: RootState) =>
  state?.getAllPosts?.status;
export const selectorPostsError = (state: RootState) =>
  state?.getAllPosts?.error;
