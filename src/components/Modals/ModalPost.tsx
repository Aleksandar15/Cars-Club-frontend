import axios from "axios";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import {
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";

import {
  openModalPostAction,
  selectorOpenModalPost,
} from "../../redux/slices/openModalPostSlice";
import LoadingModalPost from "../Loading/LoadingModalPost";

const ModalPost = () => {
  // const ModalPost = ({ children }) => {
  // const { isModalPostOpen } = useSelector(selectorOpenModal);
  const { isModalPostOpen, text } = useSelectorTyped(selectorOpenModalPost);
  const dispatch = useDispatchTyped();
  const axiosCredentials = useAxiosInterceptor();
  const [loading, setLoading] = useState<boolean>(false);

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
  type PostState = {
    title: string;
    image: string;
    // // image: string | null;
    // image: string | File; // possibly I'll use for the received data
    description: string;
    contactNumber: string;
    askingPrice: string;
  };
  // FormData's Blob TypeScript's rules
  // Argument of type 'string | number' is not assignable to parameter of type 'string | Blob'.
  // Type 'number' (/also 'null' or anything) is not assignable to type 'string | Blob'.

  const [postState, setPostState] = useState<PostState>({
    title: "",
    image: "",
    // image: null,
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
      // Turns into new TSC errors with 'files'
      // & to avoid lots of IF statements:
      // I separated the TextArea changes in a new handler FN below.
      //
      // "Object is possibly 'null'" guards:
      files !== null && files !== undefined ? files[0] : value;

    const capitalizedValue =
      // valueCheck.charAt(0).toUpperCase() + valueCheck.slice(1);
      // Property 'charAt' does not exist on type 'string | File'.
      // Property 'charAt' does not exist on type 'File'.
      typeof valueCheck === "string" && // this already is enough of a fix
      (valueCheck as string).charAt(0).toUpperCase() + valueCheck.slice(1);

    setPostState({
      ...postState,
      // Also don't forget to NOT pass uppercase if 'name===image'.
      // && the: files !== null check is TypeScript-specific.
      [name]: name === "image" && files !== null ? files[0] : capitalizedValue,
    });
  };

  // console.log("postState:", postState);

  const handleTextAreaChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, maxLength } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setPostState({ ...postState, [name]: capitalizedValue });

    const remainingChars = maxLength - value.length;
    const charCounterSPAN = document.getElementById("descriptionCounterSPAN");
    if (charCounterSPAN) {
      // This works & I can otherwise use a state to show {count} in JSX
      // charCounter.textContent = `${remainingChars} characters remaining`;
      charCounterSPAN.textContent = `(${remainingChars} characters left)`;
    }

    // Tried built-in methods for in-area message but that didn't work
    // const charCounter = `${remainingChars} characters remaining`;
    // // e.target.setCustomValidity(charCounter);
    // e.target.setCustomValidity(remainingChars.toString());
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

  // const submitPost = async (e: MouseEvent<HTMLButtonElement>) => {
  const submitPost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.count("submitPost click");
    setLoading(true);
    try {
      const formData = new FormData();
      // formData.append("title", postState.title);
      // formData.append("image", postState.image);
      // ...
      // ... Alternative loop:
      // for (const key in postState) {
      //   formData.append(key, postState[key]); // TypeScript errors
      // }
      // Alternatively for alternative:
      Object.entries(postState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // console.log("formData:", formData);

      const { data } = await axiosCredentials.post(
        `http://localhost:3000/api/v1/post/createpost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("submitpost DATA:", data);
      if (data) {
        setLoading(false);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // console.log("submitPost err:", err);
        // console.log("submitPost err?.response:", err?.response);
        console.log("submitPost err?.response?.data:", err?.response?.data);
        setLoading(false);
      }
    }
  };

  if (loading) {
    // Make screen unclickable while Loading (below) is rendered
    document.body.style.pointerEvents = "none";
    // One concern is users with slow internet.
  } else {
    document.body.style.pointerEvents = "auto";
  }

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
            {loading ? (
              // Update2: it doesn't reset fields if no error happens

              // NOTE: having Loading in here will RESET input fields
              // after an async fn's response setLoading(false).
              <LoadingModalPost />
            ) : (
              <>
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
                        accept="image/jpeg, image/jpg, image/png"
                      />
                    </div>
                    <label className="me-1 fw-bold mt-3" htmlFor="description">
                      Description:
                    </label>
                    <br />
                    <p
                      id="descriptionCounterSPAN"
                      className="m-0"
                      style={{ textTransform: "lowercase" }}
                    />
                    <textarea
                      // className="mt-3"
                      id="description"
                      name="description"
                      placeholder="Description here ..."
                      value={postState.description}
                      onChange={handleTextAreaChanges}
                      rows={3}
                      cols={33}
                      maxLength={1000}
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
                          placeholder="8888 (fake it for test)"
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
                    <Button
                      variant={`btn bg-light btn-outline-info
                 text-info  fw-bold`}
                      type="submit"
                      onClick={submitPost}
                      // className={"clickOKbutton"}
                      // className={"clickOKbutton mt-5"}
                      className={"mt-4"}
                    >
                      CREATE A POST
                    </Button>
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
                  {/* <Button
                variant={`btn bg-light btn-outline-info
                 text-info mb-2 fw-bold`}
                type="button"
                onClick={setShowModalFN}
                // className={"clickOKbutton"}
                className={"clickOKbutton mt-5"}
              >
                OKAY
              </Button> */}
                  <span className="spanModalClickOutside">
                    {/* <span className=""> */}
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

export default ModalPost;
