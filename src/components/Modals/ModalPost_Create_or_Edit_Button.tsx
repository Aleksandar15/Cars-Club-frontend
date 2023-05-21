import { FormEvent, MouseEvent } from "react";
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
import { selectorOpenModalPostEditPost } from "../../redux/slices/modalPostEditPostSlice";
// import { openModalTextAction } from "../../redux/slices/openModalTextSlice";
import { openModalPostSuccessTextAction } from "../../redux/slices/modalPostSuccessTextSlice";
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
  const { post_user_id, post_post_id } = useSelectorTyped(
    selectorOpenModalPostEditPost
  );
  // console.log("post_user_id,:", post_user_id, "& post_post_id:", post_post_id);

  // const submitPost = async (e: MouseEvent<HTMLButtonElement>) => {
  const submitPost = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.count("submitPost click");
    try {
      if (modalPost_checkEmptyValueFN(modalPostState, "create-post")) {
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
          `/api/v1/post/createpost`,
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
        // setShowModalFN(); // Close modal I don't need anymore BECAUSE
        // "isModalPostOpen: false" above Closes the Modal.

        // Update2: /marketplace update on Successful CREATE will be triggered
        // by ModalPostSuccessText`s Component's Button call to getAllPosts()
        // Async Thunk (or in the future a pagination-SORTing Async Thunk).
        dispatchTyped(
          openModalPostSuccessTextAction({
            isModalPostSuccessTextOpen: true,
            text: data?.message,
          })
        );
        // // Update /marketplace on Successful CREATION:
        // dispatchAsyncThunk(getAllPosts()); // WIll have to modify since
        // // ^ the logic would be to show 2 posts per page
        // // so instead I'll just run the LIMIT 2 SQL command, because
        // // whenever User creates a post -> show him latest posts.
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
  const editPost = async (e: MouseEvent<HTMLButtonElement>) => {
    // const editPost = async (e: FormEvent<HTMLButtonElement>) => {
    // ^ Either would work, but I do need e.preventDefault()
    // because they're inside a scope of a Form inside ModalPost.tsx
    e.preventDefault();

    console.count("editPost clicked");

    // FUTURE PLANS:
    // In the future I can check if the current modalPostState values
    // coming from `Post_Action_Buttons.tsx` are matching against
    // yet another SLICE I'd have to create of prePostData and if
    // they match -> then User hasn't modified anything so DON'T send any
    // new Request to the server & warn the User about unchanged-values.

    try {
      if (modalPost_checkEmptyValueFN(modalPostState, "edit-post")) {
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
          // UPDATE2: for 'edit-post' 'image' might be empty string
          // so `editPostController` MUST NOT reject if it's empty.
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
        const { data } = await axiosCredentials.put(
          // URL can't be on a new lines with string literals because it either fails
          // or if I have ${post_post_id} on a new line the ID gets "   " at the end.
          `/api/v1/post/editpost/${post_post_id}/${post_user_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // console.log("editPost DATA:", data);
        if (data?.isSuccessful) {
          // setLoading(false); // Stop Loading
          dispatchTyped(
            setModalPostLoadingAction({
              modalPostLoading: false, // Stop ModalPost's loading
            })
          );
          // After successful EDIT set ModalPost to Initial Values
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
        // setShowModalFN(); // Close modal I don't need anymore BECAUSE
        // "isModalPostOpen: false" above Closes the Modal.

        // Update2: /marketplace`s re-render on Successful EDIT will be triggered
        // by ModalPostSuccessText`s Component's Button call to getAllPosts()
        // Async Thunk (or in the future a pagination-SORTing Async Thunk).
        dispatchTyped(
          openModalPostSuccessTextAction({
            isModalPostSuccessTextOpen: true,
            text: data?.message,
          })
        );
        // Update /marketplace on Successful EDIT:
        // dispatchAsyncThunk(getAllPosts()); // WIll have to modify since
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
          }) // Shows the 'Fields can't be empty' P-tag.
        );
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // console.log("editPost err:", err);
        // console.log("editPost err?.response:", err?.response);
        console.log("editPost err?.response?.data:", err?.response?.data);
        // setLoading(false);
        dispatchTyped(
          setModalPostLoadingAction({
            modalPostLoading: false, // Stop Loading ModalPost
          })
        );
      }
    }
  };

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
          onClick={editPost}
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
