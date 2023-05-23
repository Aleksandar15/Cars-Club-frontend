import axios from "axios";
import { useEffect } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
// import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
import {
  getAllPosts,
  selectorPostsData,
  selectorPostsError,
  selectorPostsStatus,
} from "../../redux/createAsyncThunk/getAllPosts";
import {
  getSortedPostsAsyncThunk,
  selectorSortedPostsData,
  selectorSortedPostsError,
  selectorSortedPostsStatus,
  // selectorSortedTotalPosts,
} from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  FormSearchCarsFields,
  selectorFormSearchCarsFields,
} from "../../redux/slices/formSearchCarsSlice";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import { PostSorted } from "../../utilities/Types/getSortedPostsTypes";
import { Currency, PostType } from "../../utilities/Types/postsTypes";
import Loading from "../Loading/Loading";
import Post_Action_Buttons from "./Post_Action_Buttons";

function Post() {
  const axiosCredentials = useAxiosInterceptor();
  // DO NOT REMOVE useAxiosInterceptor()
  // or AsyncThunk's being used in Post & it's children
  // will start failing (I'm working on testing performance
  // to instead call useAxiosIntercpetor inside App.tsx).

  // const handleDelete = () => {
  //   onDelete();
  // };

  // const handleEdit = async (post_id: string, user_id: string) => {
  //   console.log("Edit clicked");
  // };

  const convertBufferToImgSRC = (bufferData: ArrayBufferLike | undefined) => {
    const buffer = new Uint8Array(bufferData as ArrayBufferLike).buffer;
    const blob = new Blob([buffer], { type: "image/jpeg" });
    const blobToURL = URL.createObjectURL(blob);
    // console.log("blobToURL:", blobToURL);
    return blobToURL;
  };

  const dispatchAsyncThunk = useDispatchAsyncThunk();
  const dispatchTyped = useDispatchTyped();
  // const posts = useSelectorTyped(selectorPostsData);
  const posts: PostSorted[] = useSelectorTyped<PostSorted[]>(
    selectorSortedPostsData
  );
  // const postsStatus = useSelectorTyped(selectorPostsStatus);
  const postsStatus = useSelectorTyped(selectorSortedPostsStatus);
  // const postsError = useSelectorTyped(selectorPostsError);
  const postsError = useSelectorTyped(selectorSortedPostsError);
  // const total_posts = useSelectorTyped(selectorSortedTotalPosts);

  // const searchCarsFieldsState = useSelectorTyped<FormSearchCarsFields>(
  //   selectorFormSearchCarsFields
  // );
  // console.log("Post.tsx searchCarsFieldsState:", searchCarsFieldsState);

  // Here I don't need to import `postPerPage` Redux State
  // because the Post.tsx logic is: on component mount:
  // 'everything will be reset back to default'

  useEffect(() => {
    // dispatchAsyncThunk(getAllPosts());

    // In the next logic I'd have to check if
    // sessionStorage
    // has 'limit' and 'offset'
    // ^->if user has refreshed=session isn't lost;
    // However if it doesn't exist then provide the initial numbers.
    dispatchAsyncThunk(
      getSortedPostsAsyncThunk({ limit: 5, offset: 0, carNameTitle: "" })
    );

    // const getTotalPostsFN = async () => {
    //   const { data } = await axiosCredentials.get(
    //     `/api/v1/post/getsortedposts/${5}/${3}`
    //   );
    //   console.log("getTotalPostsFN DATA:", data);

    //   // dispatchTyped()

    //   // Set it in here as well as in PaginationMarketplace
    //   sessionStorage.setItem("total_posts", data.total_posts);
    // };

    // No need for flags since I only will call it ONCE on Render
  }, []);
  // console.log("posts:", posts);
  // console.log("postsStatus:", postsStatus);
  // console.log("postsError:", postsError);

  const { formatNumber } = useModalPost_formatNum();

  const { user_id } = useSelectorTyped(selectVerifyUser);
  // console.log("postsStatus:", postsStatus);
  // console.log("posts:", posts);

  if (postsStatus === "idle" || postsStatus === "loading") {
    // Might need to move these inside parent: MarketPlace.tsx
    return <Loading />; // Looks good here as well
  }

  if (postsStatus === "failed") {
    return <h1>Error: {postsError}. Please refresh or try again later.</h1>;
  }

  // Implement a DIV/H1 that will show if there's 0 posts (# in array)

  return (
    <>
      {/* Don't trust the backend and also check for undefined: */}
      {posts?.length === 0 || posts === undefined ? (
        <div className="text-center text-primary">
          <h1>There's no posts found</h1>
          <p>(Start by creating one.)</p>
        </div>
      ) : (
        posts.map((post) => {
          {
            // console.log("post:", post);
            // console.log("post.post_id:", post.post_id);
          }
          return (
            <div
              className="post"
              key={post.post_id}
              style={
                {
                  // wordBreak: "break-word", // Can't call it in here
                  // because my Button's get on a new=line unwantedly.
                }
              }
            >
              <div className="post-header">
                <h2
                  style={{
                    textTransform: "capitalize",
                    wordBreak: "break-word", // Avoids breaking UI/UX
                    // // if text gets too long like 'Aaaaa..' x50
                  }}
                >
                  {post.post_title}
                </h2>
                <div className="post-actions">
                  {post.user_id === user_id ||
                  // AT LEAST it's Post's owner, otherwise moderators:
                  post.post_created_by_user_role === "owner" ||
                  post.post_created_by_user_role === "super-admin" ? (
                    <ButtonGroup>
                      {/* <Button
                        className="bg-warning btn-outline-warning text-light"
                        style={{
                          maxWidth: "70px",
                          width: "70px",
                          zIndex: "0",
                          // marginLeft: "0px",
                        }}
                        onClick={() => handleEdit(post.post_id, post.user_id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="bg-danger btn-outline-danger text-light"
                        style={{ maxWidth: "70px", width: "70px" }}
                      >
                        Delete
                      </Button> */}
                      {/* ^^^^^UPDATED INTO: */}
                      <Post_Action_Buttons
                        post_post_id={post.post_id as string}
                        post_user_id={post.user_id as string}
                      />
                    </ButtonGroup>
                  ) : null}
                </div>
              </div>
              <div className="post-image-wrapper-center">
                <div className="post-image-wrapper">
                  <img
                    src={convertBufferToImgSRC(post.post_image_buffer?.data)}
                    alt={"title"}
                    className="post-image"
                  />
                </div>
              </div>
              <p className="mt-3">
                <span className="fw-bold">Posted by:</span>{" "}
                {post.post_created_by_user_name}
              </p>
              <h6
                // className="mt-3 fw-bold"
                className=" fw-bold"
              >
                Description:
              </h6>
              <p
                style={{
                  wordBreak: "break-word", // Avoids breaking UI/UX
                  // // if text gets too long like 'Aaaaa..' x1000
                }}
              >
                {post.post_description}
              </p>
              <p>
                <span className="fw-bold">Asking price:</span>{" "}
                {post.post_asking_price_currency === "USD" ? "$" : null}
                {formatNumber(
                  post.post_asking_price,
                  post.post_asking_price_currency as Currency
                )}
                {post.post_asking_price_currency === "EUR" ? "€" : null}
              </p>
              <p>
                <span className="fw-bold">Contact number:</span>{" "}
                {post.post_contact_number}
              </p>
              <p>
                <span className="fw-bold">Date posted:</span>{" "}
                {post.post_created_at.slice(0, 10)}
                {/* {console.log("new Date():", new Date(post.post_created_at))} */}
                {/* ^: Thu May 18 2023 10:05:02 GMT+0200 (Central European SUmmer TIme) */}
              </p>
              {/* <div className="post-comments">
                <h6>Comments:</h6>
                <ul className="post-comments-ul">
                  {comments.map((comment, index) => (
                    <li key={index} className="post-comments-li">
                      {comment}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          );
        })
      )}
    </>
  );
}

export default Post;
