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
  axiosCredentialsNonInterceptors, // Expectedly fails->read the rest below.
} from "../../utilities/API/axios";
import axiosCredentialsUtils from "../../utilities/axiosInterceptor/axiosInterceptor";
import { PostType } from "../../utilities/Types/postsTypes";
import { RootState } from "../store";

// const axiosCredentials = useAxiosInterceptor();
// // ^ Invalid hook call. Only callable inside of the body of a functional component.
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

// IMPORTANT UPDATE:
// editPost Async Thunk I won't use because
// I've tried the #2nd workaround about issues
// with my axiosInterceptor in getAllPosts Async Thunk
// and that doesn't work to have Utils file .ts/.tsx
// be calling my useAxiosInterceptor hook -> still inside the REDUX file
// there's errors of Invalid Hook Call.
//
// Otherwise new issues I found on stackoverflow & I will encounter is:
// I can't use dispatch in Redux because useDispatch() is a Hook, again.
// and I can't confuse my getAllPosts InitialState with the
// future /editpost/ID`s endpoint success response consisting of:
// NOT a "posts[] Array" data but rather a JSON data with
// `isSuccessful: boolean` & `message :string` properties,
// I would have to keep including my InitialState with `?` optional props
// and ruin the usefulness that TypeScript provides.
// I rather will call useAxiosInterceptor in the EditPost Component
// (Update: the Component is now called Post.tsx in src/components.)
// where I'll manually call "/editpost/ID" & on success I'll re-call
// my GETALLPOSTS (or future update with pagination) -> and that will
// cause 'Loading' screen to my Post (PARENT COMPONENT) & also
// update the POST.tsx to show my LATEST POST (because they're sorted DESC).
//
// And YES I do can have editPost & createPost in a single REDUX file
// where I'd have a separate AsyncThunk, but it's #1 NOT that useful
// since there's no reusability usage; and #2 the MOST important issue
// is the fact that I'll have to make sure to "just" call
// useAxiosInterceptor() WITHOUT using its returned Axios instance (if
// it's not required) in the
// Component where I'd be calling
// (dispatching) that AsyncThunk & all the while using the SAME
// intercepted Axios BUT imported from Axios.ts
// (the EXACT 'reference Axios instance object' that's being intercepted
// in my useAxiosInterceptor custom Hook)
// just to make sure
// my POST/PUT Requests won't fail by using a non-intercepted Axios instance.
// A lot of workaround indeed. Overall forgetting to call useAxiosInterceptor
//  would lead to Async Thunk failing on me.

// Define the editPost async thunk
export const getAllPosts: AsyncThunk<PostType[], void, {}> = createAsyncThunk(
  "posts/getAllPosts",
  async (post_id, thunkAPI) => {
    // thunkAPI must be 2nd argument
    try {
      const { data } = await axiosCredentialsUtils.get(
        `/api/v1/post/editpost/${post_id}`
      );

      console.log("data:", data);

      return data; //
    } catch (error) {
      thunkAPI.rejectWithValue(error); // does nothing
      return [];
    }
  }
);
