import axios from "axios";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
import { getAllPosts } from "../../redux/createAsyncThunk/getAllPosts";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { selectorOpenModalPostButtonValue } from "../../redux/slices/modalPostButtonValueSlice";
import {
  selectorOpenModalPostEmptyFieldValue,
  setModalPostEmptyFieldValueAction,
} from "../../redux/slices/modalPostEmptyFieldValue";
import { selectorOpenModalPostLoading } from "../../redux/slices/modalPostLoading";

import {
  InitialStateModalPost,
  openModalPostAction,
  selectorOpenModalPost,
} from "../../redux/slices/openModalPostSlice";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import modalPost_checkEmptyValueFN from "../../utilities/modalPost_FN/modalPost_checkEmptyValueFN";
import { Currency, PostState } from "../../utilities/Types/modalPostTypes";
import LoadingModalPost from "../Loading/LoadingModalPost";
import ModalPost_Create_or_Edit_Button from "./ModalPost_Create_or_Edit_Button";
// import ModalText from "./ModalText";

const ModalPost = () => {
  // const { isModalPostOpen, text } = useSelectorTyped(selectorOpenModalPost);
  const modalPostState = useSelectorTyped(selectorOpenModalPost);
  // I avoided direct destructure so I can pass spread syntax when updating.
  const {
    isModalPostOpen,
    // title, // I don't use them as before
    // image,
    // description,
    // contactNumber,
    // askingPrice,
    // currency,
  } = modalPostState as InitialStateModalPost;
  console.log("modalPostState:", modalPostState);
  console.log("modalPostState.currency:", modalPostState?.currency);
  const dispatchTyped = useDispatchTyped();
  const axiosCredentials = useAxiosInterceptor();
  // const [loading, setLoading] = useState<boolean>(false);
  const loading = useSelectorTyped<boolean>(selectorOpenModalPostLoading);
  const { user_name, user_email } = useSelectorTyped(selectVerifyUser);
  const modalPostButtonValue = useSelectorTyped(
    selectorOpenModalPostButtonValue
  );

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
    dispatchTyped(
      openModalPostAction({
        // isModalPostOpen: !isModalPostOpen,
        // // text:"",
        // // In here I can close it with setting state back to
        // // initial state of EMPTY VALUES, however I prefer not to.
        // // NEW:
        // // TypeScript error (props are no longer optional) a fix:
        ...modalPostState,
        isModalPostOpen: !isModalPostOpen,
      })
    );
  };

  // BODY STATES UPDATES
  const handlePostChanges = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, files } = e.target;
    console.log("value handlePostChanges:", value);
    if (e.target?.files !== null) {
      console.log("event.target.files[0]:", e.target.files[0]);
    }

    // If it's not a file-upload then use the 'value'
    const valueCheck =
      // "Object is possibly 'null'" guards:
      files !== null && files !== undefined ? files[0] : value;

    const capitalizedValue =
      typeof valueCheck === "string" && // this already is enough of a fix
      (valueCheck as string).charAt(0).toUpperCase() + valueCheck.slice(1);

    dispatchTyped(
      openModalPostAction({
        ...modalPostState,
        // Also don't forget to NOT pass capitalizedValue if 'name===image'.
        // && the: files !== null check is TypeScript-specific fix.
        [name]:
          name === "image" && files !== null ? files[0] : capitalizedValue,
      })
    );
    // setIsEmptyFieldValue(false);
    // Updated redux reusability:
    dispatchTyped(
      setModalPostEmptyFieldValueAction({
        modalPostEmptyFieldValue: false,
      })
    );
  };

  const handleTextAreaChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, maxLength } = e.target;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    dispatchTyped(
      openModalPostAction({ ...modalPostState, [name]: capitalizedValue })
    );

    const remainingChars = maxLength - value.length;
    const charCounterSPAN = document.getElementById("descriptionCounterSPAN");
    if (charCounterSPAN) {
      // This works & I can otherwise use a state to show {count} in JSX
      // charCounter.textContent = `${remainingChars} characters remaining`;
      charCounterSPAN.textContent = `(${remainingChars} characters left)`;
    }
    // setIsEmptyFieldValue(false);
    // Updated redux reusability:
    dispatchTyped(
      setModalPostEmptyFieldValueAction({
        modalPostEmptyFieldValue: false,
      })
    );
  };

  const handlePostNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    // By using RegEx the non-numeric inputs are converted into "" ('nothing').

    // FIX for "askingPrice" being unable to edit the value in-between-digits
    const deFormatedValue = deformatNumber(sanitizedValue);

    if (sanitizedValue.length <= 18) {
      // Test2 UI/UX:
      if (name === "askingPrice") {
        const formatedSanitzedValue = formatNumber(deFormatedValue); // Custom function
        dispatchTyped(
          openModalPostAction({
            ...modalPostState,
            [name]: formatedSanitzedValue,
          })
        );

        // setIsEmptyFieldValue(false);
        // Updated redux reusability:
        dispatchTyped(
          setModalPostEmptyFieldValueAction({
            modalPostEmptyFieldValue: false,
          })
        );
      } else {
        dispatchTyped(
          openModalPostAction({ ...modalPostState, [name]: sanitizedValue })
        );
        // setIsEmptyFieldValue(false);
        // Updated redux reusability:
        dispatchTyped(
          setModalPostEmptyFieldValueAction({
            modalPostEmptyFieldValue: false,
          })
        );
      }
    }
  };

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e?.target?.value as Currency;

    // Update the value as well
    const deFormatedValue = deformatNumber(modalPostState.askingPrice);
    const reFormatedValue = formatNumber(deFormatedValue, selectedCurrency);
    dispatchTyped(
      openModalPostAction({
        ...modalPostState,
        ["askingPrice"]: reFormatedValue,
        ["currency"]: selectedCurrency,
      })
    );
  };
  const { formatNumber, deformatNumber } = useModalPost_formatNum(
    modalPostState.currency
  );

  // Call this setter fn after every input value changes (except currency)
  // (currency has initial value that is NEVER empty.)
  // const [isEmptyFieldValue, setIsEmptyFieldValue] = useState<boolean>(false);
  const isEmptyFieldValue = useSelectorTyped<boolean>(
    selectorOpenModalPostEmptyFieldValue
  );
  // The LOGIC:
  // Then submitPost will set it to TRUE
  // IF my custom FN checker "modalPost_checkEmptyValueFN" returns
  // 'TRUE' to empty values checks -> then my hidden P tag with text of "Fields
  // can't be empty" will become VISIBLE, then the next handleChange FN will
  // hide the P tag text of "Fields can't be empty" by setIsEmptyFieldValue(false)
  // There's more workarounds but this is "cheapest" CPU-wise.

  const dispatchAsyncThunk = useDispatchAsyncThunk();

  // // const submitPost = async (e: MouseEvent<HTMLButtonElement>) => {
  // const submitPost = async (e: FormEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   console.count("submitPost click");
  //   try {
  //     if (modalPost_checkEmptyValueFN(modalPostState)) {
  //       const formData = new FormData();
  //       // formData.append("title", modalPostState.title);
  //       // formData.append("image", modalPostState.image);

  //       // ... Alternative loop for DRY:
  //       // for (const key in modalPostState) {
  //       //   formData.append(key, modalPostState[key]); // TypeScript errors
  //       // }
  //       // Alternatively for alternative:
  //       Object.entries(modalPostState).forEach(([key, value]) => {
  //         if (key === "askingPrice") {
  //           // Remove dots/commas for the 'price' number
  //           formData.append(key, deformatNumber(value));
  //         }
  //         //  else {
  //         // UPDATE: for reusability to NOT include isModalPostOpen
  //         else if (key !== "isModalPostOpen") {
  //           formData.append(key, value);
  //         }
  //       });
  //       formData.append("user_name", user_name as string);
  //       formData.append("user_email", user_email as string);

  //       // Start Loading
  //       setLoading(true);
  //       const { data } = await axiosCredentials.post(
  //         `http://localhost:3000/api/v1/post/createpost`,
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       // console.log("submitpost DATA:", data);
  //       if (data?.isSuccessful) {
  //         setLoading(false); // Stop Loading
  //         dispatchTyped(
  //           openModalPostAction({
  //             isModalPostOpen: false,
  //             title: "",
  //             image: "",
  //             description: "",
  //             contactNumber: "",
  //             askingPrice: "",
  //             currency: "USD",
  //           })
  //         );
  //       } // Resets fields back to initial values
  //       setShowModalFN(); // Close modal
  //       dispatchAsyncThunk(getAllPosts()); // WIll have to modify since
  //       // ^ the logic would be to show 2 posts per page
  //       // so instead I'll just run the LIMIT 2 SQL command, because
  //       // whenever User creates a post -> show him latest posts.
  //     } else {
  //       // Else if fields are empty
  //       setIsEmptyFieldValue(true); // Shows the 'Fields can't be empty'
  //     }
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       // console.log("submitPost err:", err);
  //       // console.log("submitPost err?.response:", err?.response);
  //       console.log("submitPost err?.response?.data:", err?.response?.data);
  //       setLoading(false);
  //     }
  //   }
  // };

  if (loading) {
    // Make screen unclickable while Loading (below) is rendered
    document.body.style.pointerEvents = "none";
    // One concern is users with slow internet.
  } else {
    document.body.style.pointerEvents = "auto";
  }

  return (
    <>
      {/* <ModalText /> */}
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
              // Update2: it doesn't reset fields.

              // NOTE: having Loading in here may RESET input fields
              // after an async fn's response setLoading(false).
              <LoadingModalPost />
            ) : (
              <>
                {/* TITLE */}
                <div
                  // color wrapper
                  style={{ color: "white", textTransform: "uppercase" }}
                  // className="pb-5 mb-5 mt-4 "
                  className="pb-5 mb-0 mt-2 "
                >
                  <form>
                    <label className="me-1 fw-bold" htmlFor="title">
                      Title:
                    </label>
                    <input
                      id="title"
                      name="title"
                      placeholder="Car name"
                      value={modalPostState.title}
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
                        // value={modalPostState.image}
                        onChange={handlePostChanges}
                        type="file"
                        accept="image/jpeg, image/jpg, image/png"
                      />
                    </div>
                    <label className="me-1 fw-bold mt-2" htmlFor="description">
                      Description:
                    </label>
                    <br />
                    <p
                      id="descriptionCounterSPAN"
                      className="m-0 "
                      style={{ textTransform: "lowercase" }}
                    />
                    <textarea
                      // className="mt-3"
                      id="description"
                      name="description"
                      placeholder="Description here ..."
                      value={modalPostState.description}
                      onChange={handleTextAreaChanges}
                      rows={3}
                      cols={33}
                      maxLength={1000}
                    />
                    <div>
                      <label className="me-1 fw-bold mt-2" htmlFor="contact">
                        Contact number:
                      </label>
                      <br />
                      <input
                        // className="mt-3"
                        id="contact"
                        name="contactNumber"
                        placeholder="888888 (fake it)"
                        value={modalPostState.contactNumber}
                        // onChange={handlePostChanges}
                        onChange={handlePostNumberChange}
                        type="tel"
                      />
                    </div>
                    <label className="me-2 fw-bold mt-3" htmlFor="price">
                      Asking price:
                    </label>
                    <br />
                    <label
                      className="fw-bold me-1 mt-1 mb-1"
                      style={{ fontSize: "14px" }}
                    >
                      {/* Select currency: */}
                      Currency:
                    </label>
                    <select
                      value={modalPostState.currency}
                      onChange={handleCurrencyChange}
                      style={{
                        fontSize:
                          modalPostState.currency === "Select currency"
                            ? "13px"
                            : "15px",
                      }} // This isn't required; Changed logic: default is "USD".
                    >
                      <option
                        value="Select currency"
                        disabled
                        style={{ fontSize: "13px" }} // Used for a case if the User
                        // selects "EUR" and decides to re-select: keep size the same
                      >
                        CURRENCY
                      </option>
                      <option value="EUR" style={{ fontSize: "15px" }}>
                        EUR
                      </option>
                      <option value="USD" style={{ fontSize: "15px" }}>
                        USD
                      </option>
                    </select>
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "21px" }}>
                      {modalPostState.currency === "EUR"
                        ? "€"
                        : modalPostState.currency === "USD"
                        ? "$"
                        : ""}
                    </span>
                    <input
                      // className="mt-3"
                      id="price"
                      name="askingPrice"
                      placeholder="8888 (fake it for test)"
                      value={modalPostState.askingPrice}
                      // onChange={handlePostChanges}
                      onChange={handlePostNumberChange}
                      // type="number"
                      type="text"
                      style={
                        {
                          // backgroundColor: "rgba(0, 0, 0, 0.5)",
                          // opacity: "0.77",
                        }
                      }
                    />
                    <br />
                    <p
                      // style={{ display: isEmptyFieldValue ? "block" : "none" }}
                      style={{
                        visibility: isEmptyFieldValue ? "visible" : "hidden",
                        color: "red",
                        fontSize: "12px",
                      }}
                      className="mb-1  fw-bold mt-1"
                    >
                      Fields can't be empty
                    </p>
                    <ModalPost_Create_or_Edit_Button />
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
