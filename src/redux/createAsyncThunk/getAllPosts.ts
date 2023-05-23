import {
  AnyAction,
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import {
  axiosCredentials,
  // axiosCredentialsNonInterceptors, // Expectedly fails->read the rest below.
} from "../../utilities/API/axios";
// import axiosCredentialsUtils from "../../utilities/axiosInterceptor/axiosInterceptor";
import { PostType } from "../../utilities/Types/postsTypes";
import { RootState } from "../store";

// const axiosCredentials = useAxiosInterceptor();
// // ^ Invalid hook call. Only inside of the body of a fn component.
//
// NEW IMPORTANT INFO ABOUT HOW axiosCredentials still is an interceptor:
// UPDATE2: the success from importing axisoCredentials from axios Utils
// is because the same reference is grabbed which equals to the same
// instance that is being intercepted inside my useAxiosInterceptor custom
// Hook being called inside ModalPost.tsx -> which in here I'm using
// the same REFERENCE of the same INTERCEPTED AXIOS INSTANCE.
//
// In case where I wouldn't need to call this function in ModalPost
// a workaround would be to call it just for the sake of gettig in here
// the intercepted Axios instance object & avoiding the invalid Hook call.
// #1st workaround is confirmed by the fact that when I've COMMENTED OUT
// the useAxiosInterceptor custom Hook CALL inside my ModalPost.tsx
// & this getAllPosts() being called in an useEffect in ModalPost is
// failing with 401 (not my custom invalid accessToken message though).
// (and bellow CATCH doesn't throw any errors so instead I get
// .length errors and a Blank page is fixed by my `return []` update.)
// #2nd workaround would be perhaps to create another Util that calls
// the Hook like "import useAxiosInterceptor" ->
// "const axiosInterceptor = useAxiosInterceptor()"
// -> "export default axiosInterceptor" -> and in here (AsyncThunk)
// I'll IMPORT that instance from that custom Util.
// => TRIED the #2nd workaround doesn't work, it sitl lsays Invalid hook call
// ~> SO my MarketPlace component MUST call useAxiosInterceptor() for the
// sake of delivering intercepted axiosCredentials to my Future "editPost"
// Async Thunk.
// -> OR maybe perhaps even calling it inside App.ts or Axios.ts file?

// UPDATE3: The bug happened! I must switch to calling useAxiosInterceptor()
// inside App.tsx
// Issue:
// Incidently removed (in my cleanup process) my useAxiosInterceptor call
// from my ModalPost.tsx
// BUG Results:
// I couldn't retrieve my Data.
// FIX for now:
// I'm calling it in ModalPost.tsx but I might as well move it
// inside my App.tsx but that requires some Performance testing.

// Define the async thunk
// export const getAllPosts: AsyncThunk<PostType[], void, {}> = createAsyncThunk(
// UPDATE:
// I stop using this Async Thunk & Moving into getSortedPosts; however
// a typescript rules may be to add something like {state:RootState} inside Brackets:
export const getAllPosts: AsyncThunk<PostType[], void, { state: RootState }> =
  createAsyncThunk("posts/getAllPosts", async (_, thunkAPI) => {
    // thunkAPI must be 2nd argument
    try {
      const { data } = await axiosCredentials("/api/v1/post/getallposts");
      // const { data } = await axiosCredentialsNonInterceptors( // Expectedly fails
      //   "/api/v1/post/getallposts"
      // );
      // const { data } = await axiosCredentialsUtils("/api/v1/post/getallposts"); // Doesn't work
      // return data; // Works but I rather access the real data:
      // Because destructuring this in Post component causes TSC error

      // return data?.gotThreePostsROWS; // perfect, however "LIMIT 3" was my backend test

      return data?.gotAllPostsROWS; //updated
    } catch (error) {
      // throw new Error("Error fetching posts");
      // Instead answer by Drew Reese stackoverflow:
      // https://stackoverflow.com/questions/76077610/react-redux-data-not-being-passed-correctly-components-with-dynamic-routes/76078197#76078197
      thunkAPI.rejectWithValue(error); // does nothing good
      // ^ UPDATE: Does nothing when request fails with 401 (invalid accessToken)
      // when using for tests: axiosCredentialsNonInterceptors OR commenting out
      // the useAxiosInterceptor call inside ModalPost (where I use this Async Thunk)
      // so instead I manually fix the error:
      // "Uncaught TypeError: Cannot read properties of undefined (reading 'length')"
      return [];
    }
  });

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
  name: "postsPostedZXC",
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
    // Reducer for DELETE Button in 'ModalDeletePost'
    filterPostsByIdAction(state: InitialState, action: PayloadAction<string>) {
      const postId = action.payload;
      const filteredPosts = state.posts.filter(
        (post) => post.post_id !== postId
      );
      state.posts = filteredPosts;
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
        console.log("rejected STATE:", state, "rejected aciton:", action);
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

// For my ModalDeletePost
export const { filterPostsByIdAction } = postsSlice.actions;
