import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import { Post } from "../../utilities/Types/postsTypes";
import { RootState } from "../store";

const axiosCredentials = useAxiosInterceptor();

// Define the async thunk
export const getAllPosts: AsyncThunk<Post[], void, {}> = createAsyncThunk(
  "posts/getAllPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosCredentials("/api/v1/post/getallposts");
      return data;
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
  posts: Post[];
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
      reducer(state: InitialState, action: PayloadAction<Post[]>) {
        state.posts = action.payload;
      },
      prepare: (payload: Post[]) => {
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
