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
  useDispatchAsyncThunk,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import { Currency, PostType } from "../../utilities/Types/postsTypes";
import Loading from "../Loading/Loading";
import Post_Action_Buttons from "./Post_Action_Buttons";

function Post() {
  const axiosCredentials = useAxiosInterceptor();

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
  const posts = useSelectorTyped(selectorPostsData);
  const postsStatus = useSelectorTyped(selectorPostsStatus);
  const postsError = useSelectorTyped(selectorPostsError);
  useEffect(() => {
    // dispatchAsyncThunk(getAllPosts());

    // NOTE: IF i have 2 subsequental calls
    // User will get logged out because of my backend rule
    // 1 refreshToken/1 request -> 2nd Request logs out the User.
    // UPDATE:
    let flag = true;
    const getTotalPostsFN = async () => {
      const { data } = await axiosCredentials.get(
        `/api/v1/post/getsortedposts/${5}/${3}`
      );
      console.log("getTotalPostsFN DATA:", data);

      sessionStorage.setItem("total_posts", data.total_posts);
    };

    if (flag) {
      getTotalPostsFN();
    }
    return () => {
      flag = false;
    };
  }, []);
  // console.log("posts:", posts);
  // console.log("postsStatus:", postsStatus);
  // console.log("postsError:", postsError);

  const { formatNumber } = useModalPost_formatNum();

  const { user_id } = useSelectorTyped(selectVerifyUser);

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
      {posts.length > 0 &&
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
        })}
    </>
  );
}

export default Post;
