import { ChangeEvent, FormEvent, MouseEvent, useEffect } from "react";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
import {
  // useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import {
  InitialStateModalPostButtonValue,
  selectorOpenModalPostButtonValue,
} from "../../redux/slices/modalPostButtonValueSlice";
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
import { Currency, PostState } from "../../utilities/Types/modalPostTypes";
import LoadingModalPost from "../Loading/LoadingModalPost";
import ModalPost_Create_or_Edit_Button from "./ModalPost_Create_or_Edit_Button";
// import ModalText from "./ModalText";

const ModalPost = () => {
  // VERY IMPORTANT CALL:
  useAxiosInterceptor();
  // Otherwise my intercepted axiosCredentials is FAILING inside my
  // createAsyncThunk `getAllPosts`() -> because Redux can't call a Hook
  // so I forgot and have removed this one & all my App bugs started:
  // I couldn't retrieve my Data.
  // So I'm calling it here but I might as well move it inside my App.tsx
  // so that issues future won't happen in the future,
  // but I must test Performance first before callinng it inside App.tsx.

  const { modalPostButtonValue } =
    useSelectorTyped<InitialStateModalPostButtonValue>(
      selectorOpenModalPostButtonValue
    );

  // const [loading, setLoading] = useState<boolean>(false);
  const loading = useSelectorTyped<boolean>(selectorOpenModalPostLoading);
  if (loading) {
    // Make screen unclickable while Loading (below) is rendered
    document.body.style.pointerEvents = "none";
    // One concern is users with slow internet.
  } else {
    document.body.style.pointerEvents = "auto";
  }
  // NOTE about pointerEvents:
  // To make outsides unclickable for my slow internet users
  // to not send x2 x3 subsequential HTTP Requests
  // with SAME refreshToken. On top of it I add
  // "flag guards" and use "flag" state as "disabled"
  // value to the "buttons", that works the same as
  // useEffect's cleanup function; but just in case I'd forget
  // to use 'flag' somewhere, this will be one more guard.

  // const { isModalPostOpen, text } = useSelectorTyped(selectorOpenModalPost);
  const modalPostState = useSelectorTyped<InitialStateModalPost>(
    selectorOpenModalPost
  );
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
  const dispatchTyped = useDispatchTyped();

  useEffect(() => {
    if (isModalPostOpen) {
      document.body.style.overflow = "hidden";

      // Below would work but makes even the modal unclickable
      // (ModalPost.tsx I have this below in an: if (loading))
      // document.body.style.pointerEvents = "none";
    } else {
      document.body.style.overflow = "auto";
    }

    // Fixing a React bug where on EDIT POST clicks the Loading's
    // outside is clickable but not scrollable
    // Unlike when using /CREATEPOST where on my part the HTTP
    // Request is triggered WHILE the ModalPost is open so the
    // Loading both is UNCLICKABLE & UNSCROLLABLE, well,
    // on the "EDIT POST" it's Only UNSCROLLABLE
    // and below is the FIX; I've also tried to move the top-level
    // .pointerEvents="none" setters ABOVE the useEffect but
    // nothing fixed it as much as condition below, EVEN without
    // 'LOADING' as a dependency (Vite shuts those warnings off).
    // ... I've tested 100s times BUT this is the ONLY fix.
    if (loading) {
      // Make screen unclickable while Loading element is rendered
      document.body.style.pointerEvents = "none";
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
    // NEW UPDATE3: when state is 'EDIT A POST': Reset fields
    // Otherwise on 'CREATE A POST': Retain the fields.
    if (modalPostButtonValue === "CREATE A POST") {
      dispatchTyped(
        openModalPostAction({
          // isModalPostOpen: !isModalPostOpen,
          // // text:"",
          // // In here I can close it with setting state back to
          // // initial state of EMPTY VALUES, however I prefer not to.
          // // NEW UPDATE2:
          // // TypeScript error (props are no longer optional) a fix:
          ...modalPostState,
          isModalPostOpen: !isModalPostOpen,
        })
      );
    }
    if (modalPostButtonValue === "EDIT A POST") {
      dispatchTyped(
        openModalPostAction({
          isModalPostOpen: !isModalPostOpen,
          title: "",
          image: "",
          description: "",
          contactNumber: "",
          askingPrice: "",
          currency: "USD",
        })
      );
    }
  };

  // BODY STATES UPDATES
  const handlePostChanges = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, files } = e.target;
    // console.log("value handlePostChanges:", value);
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
    // Now I'm using 'capitalized' CSS style and I do can keep this above
    // because that's how it's sent to backend server for now.

    dispatchTyped(
      openModalPostAction({
        ...modalPostState,
        // Also don't forget to NOT pass capitalizedValue if 'name===image'.
        // && the: files !== null check is TypeScript-specific fix.
        [name]:
          name === "image" && files !== null ? files[0] : capitalizedValue,
      })
    );
    // Issue: title was not limited to 50 characters (SQL Limits it to 50)
    if (name === "image" && files !== null) {
      dispatchTyped(
        openModalPostAction({
          ...modalPostState,
          ["image"]: files[0],
        })
      );
    }
    if (name === "title" && typeof capitalizedValue === "string") {
      dispatchTyped(
        openModalPostAction({
          ...modalPostState,
          ["title"]:
            capitalizedValue.length <= 50
              ? capitalizedValue
              : modalPostState.title,
        })
      );
    }

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
          // disabled={loading} // TypeScript error prop doesnt exist on DIV
          // // ^ Also doesn't have any effects on my Redux Bug workaround.
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
                        style={{
                          // margin: "auto", // No effects for now
                          maxWidth: "230px",
                        }}
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
                      // cols={30} // Might be needed for Galaxy S8+ (DevTools)
                      maxLength={1000}
                      style={{
                        // maxWidth: "250px", // overrides my COLS
                        resize: "both", // lets it span horizontal & vertical
                        // overflow: "auto", // unnecessary
                      }}
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
