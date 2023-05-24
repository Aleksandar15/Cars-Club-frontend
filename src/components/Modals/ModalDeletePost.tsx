import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
// import {
//   filterPostsByIdAction,
//   getAllPosts,
// } from "../../redux/createAsyncThunk/getAllPosts";
import { deletePostsByIdAction } from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

import {
  openModalDeletePostAction,
  selectorOpenModalDeletePost,
} from "../../redux/slices/modalDeletePostSlice";
import Loading from "../Loading/Loading";

const ModalDeletePost = () => {
  // const ModalDeletePost = ({ children }) => {
  // const { isModalDeletePostOpen } = useSelector(selectorOpenModal);
  const { isModalDeletePostOpen, text, post_post_id, post_user_id } =
    useSelectorTyped(selectorOpenModalDeletePost);
  // console.log("post_post_id:", post_post_id,
  // "post_user_id:", post_user_id);
  const dispatchTyped = useDispatchTyped();
  const dispatchAsyncThunk = useDispatchAsyncThunk();
  const axiosCredentials = useAxiosInterceptor();
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    if (isModalDeletePostOpen) {
      document.body.style.overflow = "hidden";

      // below would work but makes even the modal unclickable
      // so my new solution is div wrapper :)
      // document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
    }

    // return a cleanup function to set the overflow style
    // back to 'auto' when the component unmounts.
    return () => {
      document.body.style.overflow = "auto";
      // also
      document.body.style.pointerEvents = "auto";
      // ^ there was a mistake that even bootstrap v4
      // had a bug: screen was unscrollable
      // once their modal's closed.
    };
  }, [isModalDeletePostOpen]);

  const setShowModalFN = () => {
    dispatchTyped(
      openModalDeletePostAction({
        isModalDeletePostOpen: !isModalDeletePostOpen,
        text: "",
      })
    );
  };

  const deletePostModalFN = async () => {
    try {
      setFlag(true); // Disables 'YES' button's subsequent requests.
      if (flag === false) {
        // Only try to delete if FLAG = false
        console.log("deleting");
        const { data } = await axiosCredentials.delete(
          `/api/v1/post/deletepost/${post_post_id}/${post_user_id}`
        );

        console.log("Delete DATA:", data);

        if (data?.isSuccessful) {
          setFlag(false); // Allow for future requests

          // Filted the Deleted Post out of Posts state in Post.tsx
          // dispatchTyped(filterPostsByIdAction(post_post_id as string));
          // UPDATE:
          if (typeof post_post_id === "string") {
            dispatchTyped(deletePostsByIdAction(post_post_id as string));
          }

          dispatchTyped(
            // Close ModalDeletePost
            openModalDeletePostAction({
              isModalDeletePostOpen: !isModalDeletePostOpen,
              text: "",
            })
          );
        }

        // LOGIC3: I think I will inded dispatch an sorting-action
        // which is soon to be built, and thus if I show 2 posts/1 page
        // and there will be only 2 posts left instead of Loading the
        // screen & showing a new fresh 2 posts, however in a case
        // where I may show more Posts elements -> I'd rather prefer
        // to have a .filter method on `Posts` state in Post.tsx.
        // // LOGIC2:
        // // On success either a getAllPosts() or .filter the POSTS?
        // // which may introduce complications with SORT method (?) hm.
        // // /marketplace on Successful CREATION:
        // dispatchAsyncThunk(getAllPosts()); // WIll have to modify
        // // ^ since the future logic would be to show 2 posts per page
        // // so instead I'll just run the LIMIT 2 SQL command, because
        // // whenever User creates a post -> show him latest posts.
      }
    } catch (err) {
      setFlag(false);
      if (axios.isAxiosError(err)) {
        // console.log("editPost err:", err);
        // console.log("editPost err?.response:", err?.response);
        console.log("editPost err?.response?.data:", err?.response?.data);
        // setLoading(false); // or a REDUX STATE
        switch (err?.response?.data?.message) {
          case "Post has already been deleted":
            return console.log(
              "err?.response?.data?.message:",
              err?.response?.data?.message
            );
          default:
            return;
        }
      }
    }
  };

  return (
    <>
      {isModalDeletePostOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={setShowModalFN}
        >
          <div
            style={{
              padding: "20px",
              width: "80%",
              maxWidth: "550px",
              zIndex: 1000,
              textAlign: "justify",
              minHeight: "300px",
              maxHeight: "500px",
              // overflow: "hidden", // scroll bar never appears
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
            className="mymodal-wrapper"
          >
            {flag === true ? (
              // NOTE I'm using `flag` state as if `loading`
              // to shorten the amount of states needed.
              <Loading />
            ) : (
              <>
                {/* MODAL BODY */}
                {/* <h3 className="h3ModalProjectTitle">
              Title: <span className="spanModalProjectTitle"></span>
            </h3>
            <p className="pTagModalTechnologies">Technologies: </p>
            <p className="pTagModalDescription">Description: </p> */}

                {/* Text-only body for this case: */}
                <h3
                  className="text-light pb-5 mb-5 mt-4"
                  style={{
                    // textDecoration: "underline overline",
                    textAlign: "center",
                    whiteSpace: "pre-line", // preferred over pre-wrap
                  }}
                >
                  {text}
                </h3>

                <div
                  style={{
                    display: "grid",
                    // maxWidth: "300px", //a must to
                    // // ^avoid horizontal ScrollBar // No longer applies
                    // textAlign: "center",
                    // position: "relative",
                  }}
                >
                  <Button
                    variant={`btn bg-danger btn-outline-info
                 text-info mb-2 fw-bold`}
                    type="button"
                    // onClick={setShowModalFN}
                    onClick={deletePostModalFN}
                    // className={"clickOKbutton"}
                    //       ^ UPDATE2: I'll no longer use this class
                    // for some of my Modals, and will slowly
                    // remove it from all since styling has no effect
                    // because inline-styles wins && the ONLY effects
                    // I have is MARGIN & width which would be made
                    // inline as well.
                    style={{ margin: "auto", width: "150px" }}
                    disabled={flag}
                  >
                    YES
                  </Button>
                  <Button
                    variant={`btn bg-success btn-outline-info
                text-info mb-2 fw-bold`}
                    type="button"
                    onClick={setShowModalFN}
                    // className={"clickOKbutton"}
                    style={{ margin: "auto", minWidth: "150px" }}
                  >
                    NO
                  </Button>
                  <span className="spanModalClickOutside">
                    (click outside to close)
                  </span>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  className="close-button"
                  onClick={setShowModalFN}
                  style={{
                    color: "red",
                    fontSize: "77px",
                    marginRight: "20px",
                  }}
                >
                  &times;
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* {children} */}
    </>
  );
};

export default ModalDeletePost;
