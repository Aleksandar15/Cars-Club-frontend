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

type PostState = {
  title: string;
  image: string;
  description: string;
  // FormData issue: value can only be: string | Blob
  // contactNumber: number | null;
  // askingPrice: number | null;
  contactNumber: string;
  askingPrice: string;
};

// type Currency = "EUR" | "USD" | "Select currency";

const ModalPost = () => {
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

  const [postState, setPostState] = useState<PostState>({
    title: "",
    image: "",
    // image: null,
    description: "",
    contactNumber: "",
    askingPrice: "",
  });
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
      // valueCheck.charAt(0).toUpperCase() + valueCheck.slice(1);
      // Property 'charAt' does not exist on type 'string | File'.
      // Property 'charAt' does not exist on type 'File'.
      typeof valueCheck === "string" && // this already is enough of a fix
      (valueCheck as string).charAt(0).toUpperCase() + valueCheck.slice(1);

    setPostState({
      ...postState,
      // Also don't forget to NOT pass capitalizedValue if 'name===image'.
      // && the: files !== null check is TypeScript-specific fix.
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
  };

  const handlePostNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    // By using RegEx the non-numeric inputs are converted into "" ('nothing').

    if (sanitizedValue.length <= 18) {
      // Test2 UI/UX:
      if (name === "askingPrice") {
        const formatedSanitzedValue = formatNumber(sanitizedValue); // Custom function
        setPostState({ ...postState, [name]: formatedSanitzedValue });

        // Alternatively: Check if the value is a number or an empty string
        // & AVOIDS State Updating
        // if (!isNaN(Number(value)) || value === "") {
        //   // With this condition I can use [name]: value -> works as fine.
        //   // || value === "" -> checks against empty spaces
        //   setPostState({ ...postState, [name]: sanitizedValue });
        // }
      } else {
        setPostState({ ...postState, [name]: sanitizedValue });
      }
    }
  };

  // const [currency, setCurrency] = useState("Select currency");
  const [currency, setCurrency] = useState("USD");
  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);

    // Update the value as well
    const deFormatedValue = deformatNumber(postState.askingPrice);
    const reFormatedValue = formatNumber(deFormatedValue, e.target.value);
    setPostState({ ...postState, ["askingPrice"]: reFormatedValue });
  };
  const formatNumber = (value: string, currencyArg = currency): string => {
    if (currencyArg === "EUR") {
      // // Format the number with commas for Europe AND add € at the end
      // return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "€";
      // // For UX preference I decided not to use "€" at the end.
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      // Format the number with dots for the USA AND add $ at the beginning
      // return "$" + value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  };
  const deformatNumber = (formattedValue: string): string => {
    // Remove commas or dots from the formatted value
    const deformattedValue = formattedValue.replace(/[,|.]/g, "");
    return deformattedValue;
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
                      <br />
                      <input
                        // className="mt-3"
                        id="contact"
                        name="contactNumber"
                        placeholder="888888 (fake it)"
                        value={postState.contactNumber}
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
                      value={currency}
                      onChange={handleCurrencyChange}
                      style={{
                        fontSize:
                          currency === "Select currency" ? "13.8px" : "15px",
                      }}
                    >
                      <option
                        value="Select currency"
                        disabled
                        style={{ fontSize: "13.8px" }} // Used for a case if the User
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
                      {currency === "EUR" ? "€" : currency === "USD" ? "$" : ""}
                    </span>
                    <input
                      // className="mt-3"
                      id="price"
                      name="askingPrice"
                      placeholder="8888 (fake it for test)"
                      value={postState.askingPrice}
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
