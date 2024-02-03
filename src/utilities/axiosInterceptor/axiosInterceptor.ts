import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";

// const axiosInterceptor = () => {
//   const axiosCredentials = useAxiosInterceptor()
// }

// TO BE USED FOR WHEN
// createAsyncThunk can't call the Hook.
// RESULTS: didn't work
// => TRIED the #2nd workaround doesn't work, it sitll says Invalid hook call
// ~> SO my MarketPlace component MUST call useAxiosInterceptor() for the
// sake of making 100% sure to be delivering intercepted axiosCredentials
// to my Future "editPost.ts" Async Thunk (in redux/createAsyncThunk).
// UPDATE & TESTED: I can't call `useAxiosInterceptor` inside editPost.ts
// because that's an error of Invalid Hook Call.

// -> OR maybe perhaps even calling it inside App.ts or Axios.ts file?
// UPDATE: `useAxiosInterceptor()` is called inside Post.tsx (src/components)
// instead, because I haven't tested performance yet, but I don't want to call
// it inside App.tsx unnecessarily.

const axiosCredentialsUtils = useAxiosInterceptor();

export default axiosCredentialsUtils;
