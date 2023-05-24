import { useEffect } from "react";
import { Button } from "react-bootstrap";
// import { getAllPosts } from "../../redux/createAsyncThunk/getAllPosts";
import {
  // getSortedPosts
  getSortedPostsAsyncThunk,
} from "../../redux/createAsyncThunk/getSortedPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  InitialStateModalPostButtonValue,
  selectorOpenModalPostButtonValue,
} from "../../redux/slices/modalPostButtonValueSlice";

import {
  openModalPostSuccessTextAction,
  selectorOpenModalPostSuccessText,
} from "../../redux/slices/modalPostSuccessTextSlice";
import { setCurrentPageAction } from "../../redux/slices/paginationMarketplaceCurrentPageSlice";
import { selectorPostPerPage } from "../../redux/slices/postPerPageSlice";
// import {
//   InitialStateModalPost,
//   selectorOpenModalPost,
// } from "../../redux/slices/openModalPostSlice";

const ModalPostSuccessText = () => {
  // const ModalPostSuccessText = ({ children }) => {
  // const { isModalPostSuccessTextOpen } = useSelector(selectorOpenModal);
  const { isModalPostSuccessTextOpen, text } = useSelectorTyped(
    selectorOpenModalPostSuccessText
  );
  const dispatchTyped = useDispatchTyped();
  // const dispatchAsyncThunk = useDispatchAsyncThunk();
  // const { modalPostButtonValue } =
  //   useSelectorTyped<InitialStateModalPostButtonValue>(
  //     selectorOpenModalPostButtonValue
  //   );
  // console.log(
  //   "modalPostButtonValue in ModalPostSuccessText:",
  //   modalPostButtonValue
  // );
  // const modalPostState = useSelectorTyped<InitialStateModalPost>(
  //   selectorOpenModalPost
  // );
  // console.log("modalPostSTate in ModalPostSuccessText:", modalPostState);

  // const postPerPage = useSelectorTyped(selectorPostPerPage);

  useEffect(() => {
    if (isModalPostSuccessTextOpen) {
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
  }, [isModalPostSuccessTextOpen]);

  const setShowModalFN = () => {
    dispatchTyped(
      openModalPostSuccessTextAction({
        isModalPostSuccessTextOpen: !isModalPostSuccessTextOpen,
        text: "",
      })
    );
    // UPDATE 3:
    // I am using this `setSHowModalFN` to close
    // this very same ModalPostSuccessText as
    // the `OKAY` button's onClick as well as
    // the 'click outside' & 'X' button
    // so I must not forget that on 'CREATE A POST'
    // I must still call the `getSortedPostsAsyncThunk.
    // if (modalPostButtonValue === "CREATE A POST") {
    //   dispatchAsyncThunk(
    //     getSortedPostsAsyncThunk({
    //       limit: postPerPage,
    //       offset: 0, // show from the very first pages
    //       carNameTitle: "", // don't pass the current
    //       // searchBar's input field because the User might
    //       // have forgotten to remove it and will think that
    //       // the Creation of a Post was not Successful.
    //     })
    //   );
    //   // UI/UX issue fix: also set the currentPage back to 1
    //   dispatchTyped(setCurrentPageAction({ currentPage: 1 }));
    // }

    // NOTE:
    // for `if modalPostButtonValue === "EDIT A POST"` I only
    // close this `ModalPostSuccessText` since the changes are
    // handleded by `ModalPost_Create_or_Edit_Button` of the
    // `EDIT BUTTON`'s response of `edittedPost` to directly
    // mutate the Redux State `Posts` by `edittedPost.post_id`.
    // REMINDER: this `ModalPostSuccessText` only serves for
    // UI/UX to alert the User.

    // UPDATE: EXACTLY!^
    // I don't need to call my `getSortedPostsAsyncThunk` inside
    // of here -> only allow User to see the response and in
    // the background a `/getsortedposts` request is ongoing BUT
    // now triggered by my `ModalPost_Create_or_Edit_Button.tsx`
  };

  return (
    <>
      {isModalPostSuccessTextOpen && (
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
              // display: "inline-block", // Does nothing
            }}
            onClick={(e) => e.stopPropagation()}
            className="mymodal-wrapper"
          >
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
                // maxWidth: "300px", //a must-use to avoid
                // // ^-> to avoid horizontal ScrollBar
                // textAlign: "center",
                // // // position: "relative",
                // // // For ModalPostSuccessText Component:
                // justifyContent: "center", // Doesn't do anything
                // // ^ if I maxWidth:"300px" then it does centralizes
              }}
              // Inlin styles overrides my CSS, so I must move
              // it all inside CSS:
              // className="buttonAndSpanModalWrapper"
            >
              <Button
                variant={`btn bg-light btn-outline-info
                 text-info mb-2 fw-bold secondary`}
                type="button"
                onClick={setShowModalFN}
                className={"clickOKbuttonModalPostSuccess"}
                // size="sm" // too shrunk
                // size="lg" // too wide
                // Main issue remains: it's spread wide!
              >
                OKAY
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
          </div>
        </div>
      )}
      {/* {children} */}
    </>
  );
};

export default ModalPostSuccessText;
