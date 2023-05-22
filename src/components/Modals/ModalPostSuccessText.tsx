import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/createAsyncThunk/getAllPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

import {
  openModalPostSuccessTextAction,
  selectorOpenModalPostSuccessText,
} from "../../redux/slices/modalPostSuccessTextSlice";

const ModalPostSuccessText = () => {
  // const ModalPostSuccessText = ({ children }) => {
  // const { isModalPostSuccessTextOpen } = useSelector(selectorOpenModal);
  const { isModalPostSuccessTextOpen, text } = useSelectorTyped(
    selectorOpenModalPostSuccessText
  );
  const dispatchTyped = useDispatchTyped();
  const dispatchAsyncThunk = useDispatchAsyncThunk();

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
    // /marketplace on Successful CREATION:
    dispatchAsyncThunk(getAllPosts()); // WIll have to modify since
    // // ^ the logic would be to show 2 posts per page
    // // so instead I'll just run the LIMIT 2 SQL command, because
    // // whenever User creates a post -> show him latest posts.
  };
  // VERY IMPORTANT NOTES about my setShowModalFN LOGIC:
  // ModalPostSuccessText logic for now is that
  // setShowModalFN ALWAYS calls getAllPosts() Async Thunk,
  // in the future for reusability I can use my new state in my
  // updated slice modalPostSuccessTextSlice:'typeOfResponse' state
  // to conditionally render different BUTTONS & its onClick's.
  // (As well as pagination future plans will requires new Thunk.)
  // Example:
  // failed response will move the User back to ModalPost (re-open)
  // with its field input states values UNCHANGED
  // VS a successful response will trigger Async Thunk to trigger
  // a re-render of my MarketPlace.tsx & reset ModalPost`s fields.

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
