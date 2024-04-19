import axios from "axios";
import { useEffect } from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
// import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
// import {
//   getAllPosts,
//   selectorPostsData,
//   selectorPostsError,
//   selectorPostsStatus,
// } from "../../redux/createAsyncThunk/getAllPosts";
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
import { setCurrentPageAction } from "../../redux/slices/paginationMarketplaceCurrentPageSlice";
import { selectorPostPerPage } from "../../redux/slices/postPerPageSlice";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import { PostSorted } from "../../utilities/Types/getSortedPostsTypes";
import {
  Currency,
  PostType,
  Post_image_buffer,
} from "../../utilities/Types/postsTypes";
import Loading from "../Loading/Loading";
import Post_Action_Buttons from "./Post_Action_Buttons";

const nodeENV = import.meta.env;

function Post() {
  const axiosCredentials = useAxiosInterceptor();
  // DO NOT REMOVE useAxiosInterceptor()
  // or AsyncThunk's being used in Post & it's children
  // will start failing (I'm working on testing performance
  // to instead call useAxiosIntercpetor inside App.tsx).

  // console.log("nodeENV:", nodeENV);

  console.count("rendered Post.tsx");

  // const convertBufferToImgSRC = (bufferData: ArrayBufferLike) => {
  // // Under the hood of TypeScript:
  // // type ArrayBufferLike = ArrayBuffer | SharedArrayBuffer
  const convertBufferToImgSRC = (bufferData: ArrayBuffer) => {
    if (!bufferData) return "";

    const buffer: ArrayBuffer =
      // new Uint8Array(bufferData as ArrayBufferLike).buffer //Works as well
      new Uint8Array(bufferData as ArrayBuffer).buffer as ArrayBuffer;

    // const buffer: Uint8Array = new Uint8Array(
    //   bufferData as ArrayBuffer
    // ) as Uint8Array; // works as well (without accessing `.buffer`) because
    // // the Blob constructor accepts an array of values, and the Uint8Array
    // // object can be treated as an array-like object. Internally, Blob
    // // converts the Uint8Array into a regular array when creating the Blob.

    // NOTE:
    // Yes both the Types of "bufferData" and "buffer" are ArrayBuffer,
    // but the actual DATA is what I should care about
    // when passing it to "new Blob"`s constructor's argument.

    // console.log("bufferData:", bufferData, "\nbuffer:", buffer);

    const blob = new Blob([buffer], { type: "image/jpeg" });
    // console.log("blob:", blob);

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

  const postPerPage = useSelectorTyped(selectorPostPerPage);
  const searchCarsFieldsState = useSelectorTyped<FormSearchCarsFields>(
    selectorFormSearchCarsFields
  );

  useEffect(() => {
    // dispatchAsyncThunk(getAllPosts());

    dispatchAsyncThunk(
      // getSortedPostsAsyncThunk({ limit: 5, offset: 0, carNameTitle: "" })
      getSortedPostsAsyncThunk({
        limit: postPerPage,
        offset: 0,
        // carNameTitle: "",
        carNameTitle: searchCarsFieldsState.carNameInputField,
      })
    );

    // I changed my decision and decided not to use sessionStorage
    // to store postPerPage, instead go with default 5 / 0 / ""

    // Logic changed into keeping the state `postPerPage` as-is even if
    // User navigates to different components, that's why I must retrieve
    // `searchCarsFieldsState.carNameInputField` from `FormSearchCars`.

    // Until I move all the Pagination States into
    // a Single Source of Truth; for now offset is hardcoded at 0:
    dispatchTyped(setCurrentPageAction({ currentPage: 1 }));

    if (nodeENV.DEV) {
      console.log("postPerPage Post.tsx:", postPerPage);
    }

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

  return (
    <>
      {/* Don't trust the backend and also check for undefined: */}
      {posts?.length === 0 || posts === undefined ? (
        <div className="text-center text-primary">
          <h1>There's no posts found</h1>
          <p>(Start by creating one.)</p>
        </div>
      ) : (
        (posts as PostType[]).map((post: PostType) => {
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
                      {/* ^^^^^UPDATES MOVED INTO: */}
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
                    src={convertBufferToImgSRC(
                      (post.post_image_buffer as Post_image_buffer)
                        ?.data as ArrayBuffer
                      // ?.data as ArrayBufferLike //Type works as well because
                      // Under the hood of TypeScript:
                      // type ArrayBufferLike = ArrayBuffer | SharedArrayBuffer
                    )}
                    // alt={"title"}
                    alt={`Image of: ${post.post_title}`}
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

              {/*  */}
              <div className="comment-section">
                {/* <h4>Comments</h4> */}
                {/* <h6 className="fw-bold">Comments</h6> */}
                {/* <h4 className="mt-1">Comments</h4> */}
                <p
                  // className="mt-1 fw-bold"
                  className=" fw-bold"
                  // className="fw-bold"
                >
                  Comments:
                  {/* COMMENTS */}
                </p>
                <ul className="list-group">
                  {/* {comments.map((comment, index) => ( */}
                  <li
                    // key={index}
                    className="list-group-item"
                  >
                    {/* {comment} */}
                  </li>
                  {/* ))} */}
                </ul>
                <form
                // onSubmit={handleCommentSubmit}
                >
                  <div className="form-group">
                    <label htmlFor="comment">Add a comment:</label>
                    <textarea
                      id="comment"
                      className="form-control"
                      // rows="3" // Data type is supposed to be a number.
                      rows={3}
                      // value={newComment}
                      // onChange={handleCommentChange}
                      // >
                    />
                    {/* Test text
                    </textarea> */}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
              {/*  */}
            </div>
          );
        })
      )}
    </>
  );
}

export default Post;
