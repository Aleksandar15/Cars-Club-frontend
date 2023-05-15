import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

import {
  openModalPostAction,
  selectorOpenModalPost,
} from "../../redux/slices/openModalPostSlice";

const ModalPost = () => {
  // const ModalPost = ({ children }) => {
  // const { isModalPostOpen } = useSelector(selectorOpenModal);
  const { isModalPostOpen, text } = useSelectorTyped(selectorOpenModalPost);
  const dispatch = useDispatchTyped();

  useEffect(() => {
    if (isModalPostOpen) {
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
  }, [isModalPostOpen]);

  const setShowModalFN = () => {
    dispatch(
      openModalPostAction({ isModalPostOpen: !isModalPostOpen, text: "" })
    );
  };

  // BODY STATES
  const [postState, setPostState] = useState({
    title: "",
    image: "",
    description: "",
    contactNumber: "",
    askingPrice: "",
  });
  const handlePostChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, files } = e.target;
    console.log("value:", value);
    // console.log("event.target.files:", e.target.files);
    // const condition = files !== null || files !== undefined;
    // console.log("condition", condition);
    if (e.target?.files !== null) {
      console.log("event.target.files[0]:", e.target.files[0]);
    }

    // If it's not a file-upload then use the 'value'
    const valueCheck =
      // This 'undefined' check was added for TextArea but
      // TextArea's fix of <HTMLInputElement | HTMLTextAreaElement>
      // Turns into issues with files & to avoid lots of IF statements
      // I separated the TextArea changes in a new handler FN below.
      e.target?.files !== null || e.target?.files !== undefined
        ? value
        : e.target?.files[0];

    console.log("valueCheck:", valueCheck);

    setPostState({ ...postState, [name]: valueCheck });
  };

  console.log("postState:", postState);

  const handleTextAreaChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostState({ ...postState, [name]: value });
  };

  const handlePostNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    // This allows for state updates but it's no problem since ModalPost is unexpensive
    setPostState({ ...postState, [name]: sanitizedValue });

    // // Check if the value is a number or an empty string
    // if (!isNaN(Number(value)) || value === "") {
    //   // With this condition I can use [name]: value -> works as fine.
    //   setPostState({ ...postState, [name]: sanitizedValue });
    // }

    // // Alternatively (same logic):
    // if (!isNaN(Number(value)) || value === "") {
    //   setPostState({ ...postState, [name]: value });
    // }
  };

  return (
    <>
      {isModalPostOpen && (
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

            {/* TITLE */}
            <div
              // color wrapper
              style={{ color: "white", textTransform: "uppercase" }}
              className="pb-5 mb-5 mt-4 "
            >
              <form>
                <label className="me-1 fw-bold" htmlFor="title">
                  Title:
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Car name"
                  value={postState.title}
                  onChange={handlePostChanges}
                />
                {/* <br /> */}
                <div className="mt-3">
                  <label className="me-1 fw-bold" htmlFor="image">
                    Image:
                  </label>
                  <input
                    id="image"
                    name="image"
                    // value={postState.image}
                    onChange={handlePostChanges}
                    type="file"
                    accept="image/jpeg, image/jpg"
                  />
                </div>
                <label className="me-1 fw-bold mt-3" htmlFor="description">
                  Description:
                </label>
                <br />
                <textarea
                  className="mt-3"
                  id="description"
                  name="description"
                  placeholder="Description here ..."
                  value={postState.description}
                  onChange={handleTextAreaChanges}
                  rows={3}
                  cols={33}
                />
                <div>
                  <label className="me-1 fw-bold mt-3" htmlFor="contact">
                    Contact number:
                  </label>
                  {/* <br /> */}
                  <input
                    className="mt-3"
                    id="contact"
                    name="contactNumber"
                    placeholder="888-888 (fake it)"
                    value={postState.contactNumber}
                    // onChange={handlePostChanges}
                    onChange={handlePostNumberChange}
                    type="tel"
                  />
                </div>
                <div>
                  <label className="me-2 fw-bold mt-3" htmlFor="price">
                    Asking price:
                  </label>
                  <span style={{ fontWeight: "bold" }}>
                    $
                    <input
                      className="mt-3"
                      id="price"
                      name="askingPrice"
                      placeholder="8888 (fake it)"
                      value={postState.askingPrice}
                      // onChange={handlePostChanges}
                      onChange={handlePostNumberChange}
                      type="text"
                      style={
                        {
                          // backgroundColor: "rgba(0, 0, 0, 0.5)",
                          // opacity: "0.77",
                        }
                      }
                    />
                  </span>
                </div>
              </form>
            </div>

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
                // className={"clickOKbutton"}
                className={"clickOKbutton mt-5"}
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

export default ModalPost;
