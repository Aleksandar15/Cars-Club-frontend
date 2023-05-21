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
// to my Future "editPost" Async Thunk.
// -> OR maybe perhaps even calling it inside App.ts or Axios.ts file?

const axiosCredentialsUtils = useAxiosInterceptor();

export default axiosCredentialsUtils;
