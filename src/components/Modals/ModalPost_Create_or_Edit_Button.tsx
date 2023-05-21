import { FormEvent } from "react";
import { Button } from "react-bootstrap";
import { selectVerifyUser } from "../../redux/slices/verifySlice";
import modalPost_checkEmptyValueFN from "../../utilities/modalPost_FN/modalPost_checkEmptyValueFN";
import {
  openModalPostAction,
  selectorOpenModalPost,
} from "../../redux/slices/openModalPostSlice";
import { setModalPostLoadingAction } from "../../redux/slices/modalPostLoading";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import { selectorOpenModalPostButtonValue } from "../../redux/slices/modalPostButtonValueSlice";
import {
  useDispatchAsyncThunk,
  useDispatchTyped,
  useSelectorTyped,
} from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import useModalPost_formatNum from "../../hooks/ModalPostHooks/useModalPost_formatNum";
import { getAllPosts } from "../../redux/createAsyncThunk/getAllPosts";
import axios from "axios";
import { setModalPostEmptyFieldValueAction } from "../../redux/slices/modalPostEmptyFieldValue";
const ModalPost_Create_or_Edit_Button = () => {
  const dispatchTyped = useDispatchTyped();
  const dispatchAsyncThunk = useDispatchAsyncThunk();
  const modalPostState = useSelectorTyped(selectorOpenModalPost);
  const { user_name, user_email } = useSelectorTyped(selectVerifyUser);
  const modalPostButtonValue = useSelectorTyped(
    selectorOpenModalPostButtonValue
  );
  const axiosCredentials = useAxiosInterceptor();
  const {
    // formatNumber, // not using
    deformatNumber,
  } = useModalPost_formatNum();

  // const submitPost = async (e: MouseEvent<HTMLButtonElement>) => {
  const submitPost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.count("submitPost click");
    try {
      if (modalPost_checkEmptyValueFN(modalPostState)) {
        const formData = new FormData();
        // formData.append("title", modalPostState.title);
        // formData.append("image", modalPostState.image);

        // ... Alternative loop for DRY:
        // for (const key in modalPostState) {
        //   formData.append(key, modalPostState[key]); // TypeScript errors
        // }
        // Alternatively for alternative:
        Object.entries(modalPostState).forEach(([key, value]) => {
          if (key === "askingPrice") {
            // Remove dots/commas for the 'price' number
            formData.append(key, deformatNumber(value));
          }
          //  else {
          // UPDATE: for reusability to NOT include isModalPostOpen
          else if (key !== "isModalPostOpen") {
            formData.append(key, value);
          }
        });
        formData.append("user_name", user_name as string);
        formData.append("user_email", user_email as string);

        // Start Loading
        // setLoading(true);
        dispatchTyped(
          setModalPostLoadingAction({
            modalPostLoading: true, // STart Loading ModalPost
          })
        );
        const { data } = await axiosCredentials.post(
          `http://localhost:3000/api/v1/post/createpost`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("submitpost DATA:", data);
        if (data?.isSuccessful) {
          // setLoading(false); // Stop Loading
          dispatchTyped(
            setModalPostLoadingAction({
              modalPostLoading: false, // Stop ModalPost's loading
            })
          );
          dispatchTyped(
            openModalPostAction({
              isModalPostOpen: false,
              title: "",
              image: "",
              description: "",
              contactNumber: "",
              askingPrice: "",
              currency: "USD",
            })
          );
        } // Resets fields back to initial values
        // setShowModalFN(); // Close modal I don't need anymore because
        // "isModalPostOpen: false" Closes the Modal.
        dispatchAsyncThunk(getAllPosts()); // WIll have to modify since
        // ^ the logic would be to show 2 posts per page
        // so instead I'll just run the LIMIT 2 SQL command, because
        // whenever User creates a post -> show him latest posts.
      } else {
        // Else if fields are empty
        // setIsEmptyFieldValue(true); // Shows the 'Fields can't be empty'
        // Updated for reusability:
        dispatchTyped(
          setModalPostEmptyFieldValueAction({
            modalPostEmptyFieldValue: true,
          })
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // console.log("submitPost err:", err);
        // console.log("submitPost err?.response:", err?.response);
        console.log("submitPost err?.response?.data:", err?.response?.data);
        // setLoading(false);
        dispatchTyped(
          setModalPostLoadingAction({
            modalPostLoading: false, // Stop Loading ModalPost
          })
        );
      }
    }
  };

  // EDIT A POST BUTTON

  return (
    <>
      {modalPostButtonValue === "CREATE A POST" ? (
        <Button
          variant={`btn bg-light btn-outline-info
      text-info  fw-bold`}
          type="submit"
          onClick={submitPost}
        >
          {modalPostButtonValue}
        </Button>
      ) : modalPostButtonValue === "EDIT A POST" ? (
        <Button
          variant={`btn bg-light btn-outline-info
      text-info  fw-bold`}
          type="submit"
          // onClick={submitPost}
        >
          {modalPostButtonValue}
        </Button>
      ) : (
        <div>Unexpected error happened</div>
      )}
    </>
  );
};

export default ModalPost_Create_or_Edit_Button;
