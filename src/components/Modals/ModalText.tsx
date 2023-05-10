import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

import {
  openModalAction,
  selectorOpenModalText,
} from "../../redux/slices/openModalTextSlice";

const ModalText = () => {
  // const ModalText = ({ children }) => {
  // const { isModalOpen } = useSelector(selectorOpenModal);
  const { isModalOpen, text } = useSelectorTyped(selectorOpenModalText);
  const dispatch = useDispatchTyped();

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen]);

  const setShowModalFN = () => {
    dispatch(openModalAction({ isModalOpen: !isModalOpen, text: "" }));
  };

  return (
    <>
      {isModalOpen && (
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
            {/* MODAL BODY */}
            {/* <h3 className="h3ModalProjectTitle">
              Title: <span className="spanModalProjectTitle"></span>
            </h3>
            <p className="pTagModalTechnologies">Technologies: </p>
            <p className="pTagModalDescription">Description: </p> */}

            {/* Text-only body for this case: */}
            <h3
              className="text-info pb-5 mb-5"
              style={{
                // textDecoration: "underline overline",
                textAlign: "center",
              }}
            >
              {text}
            </h3>

            <div
              style={{
                display: "grid",
                maxWidth: "300px", //a must to avoid horizontal ScrollBar
                textAlign: "center",
                // position: "relative",
              }}
            >
              <Button
                variant={`btn bg-light btn-outline-info
                 text-info mb-2 fw-bold`}
                type="button"
                onClick={setShowModalFN}
                className={"clickOKbutton"}
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

export default ModalText;
