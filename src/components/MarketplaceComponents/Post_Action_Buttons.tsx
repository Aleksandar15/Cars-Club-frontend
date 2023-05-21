import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import useAxiosInterceptor from "../../hooks/authHooks/useAxiosInterceptor";
import { useDispatchTyped } from "../../redux/reduxCustomTypes/ReduxTypedHooks/typedHooks";
import { setModalPostButtonValueAction } from "../../redux/slices/modalPostButtonValueSlice";
import { setModalPostLoadingAction } from "../../redux/slices/modalPostLoading";
import {
  openModalPostAction,
  toggleModalPostWithInitialValuesAction,
} from "../../redux/slices/openModalPostSlice";
import {
  FoundOnePost,
  Posts_view_except_post_image,
} from "../../utilities/Types/postActionButtonsTypes";

interface PostActionButtonsProps {
  post_user_id: string;
  post_post_id: string;
}

const Post_Action_Buttons = ({
  post_user_id,
  post_post_id,
}: PostActionButtonsProps) => {
  const axiosCredentials = useAxiosInterceptor();
  const dispatchTyped = useDispatchTyped();

  // This flag is a MUST with my current setup with refreshToken
  // so it won't re-trigger x2/x3 requests with old refreshToken
  // for the Users with slow internet
  const [flag, setFlag] = useState<boolean>(false);
  // call setFlag(false) ONCE response is received.
  // here I'll use FLAG state for BUTTON's DISABLED={flag}.
  // UPDATE2:
  // I do have 2 securities: one is the ModalPost's Loading
  // screen doesn't allow for Clicks outside while Loading, but
  // I'll still use the flag for 101% safety guards.

  const handleEdit = async (post_id: string, user_id: string) => {
    console.log("Edit clicked");
    setFlag(true);
    dispatchTyped(
      toggleModalPostWithInitialValuesAction({
        isModalPostOpen: true, // Open ModalPost
      })
    );
    dispatchTyped(
      setModalPostLoadingAction({
        modalPostLoading: true, // Open ModalPost with Loading
      })
    );
    try {
      if (flag === false) {
        const { data } = await axiosCredentials.get(
          `/api/v1/post/getonepost/${post_id}/${user_id}`
        );
        console.log("edit DATA iS:", data);
        if (data?.isSuccessful === true) {
          const foundOnePostRowsTyped =
            data.foundOnePostRows as Posts_view_except_post_image;
          const foundOnePostTyped = foundOnePostRowsTyped[0] as FoundOnePost;
          // Open the modal and pass the received values
          dispatchTyped(
            openModalPostAction({
              isModalPostOpen: true,
              title: foundOnePostTyped.post_title,
              image: "",
              description: foundOnePostTyped.post_description,
              contactNumber: foundOnePostTyped.post_contact_number,
              askingPrice: foundOnePostTyped.post_asking_price,
              currency: foundOnePostTyped.post_asking_price_currency,
            })
          );
          // Trigger a change to the ModalPost's button to instead
          // show "EDIT A POST" button + also such a button has a
          // different onClick inside `ModalPost_Create_or_Edit`.
          dispatchTyped(
            setModalPostButtonValueAction({
              modalPostButtonValue: "EDIT A POST",
            })
          );
          dispatchTyped(
            setModalPostLoadingAction({
              modalPostLoading: false, // Stop ModalPost's loading
            })
          );
          setFlag(false); // Allow for subsequent requests
        }
      }
    } catch (err) {
      setFlag(false); // Allow for subsequent requests
      dispatchTyped(
        toggleModalPostWithInitialValuesAction({
          isModalPostOpen: false, // Stop ModalPost's loading
        })
      );
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.isSuccessful === false) {
          switch (err.response?.data?.message) {
            case "Error - user is not authorized to edit post":
              // Only if a Hacker tries to edit. Don't send message
              return console.log("Failed to EDIT");
            default:
              return console.log("Failed to EDIT unknown reason");
          }
        } else {
          console.log("Unexpected Axios error:", err);
          return "An unexpected error happened";
        }
      }
    }
  };
  return (
    <>
      <Button
        className="bg-warning btn-outline-warning text-light"
        style={{
          maxWidth: "70px",
          width: "70px",
          zIndex: "0",
          // marginLeft: "0px",
        }}
        // onClick={() => handleEdit(post.post_id, post.user_id)}
        // Split the Post.tsx buttons into Children Component
        // Now I receive those values as props:
        onClick={() => handleEdit(post_post_id, post_user_id)}
        disabled={flag}
      >
        Edit
      </Button>
      <Button
        className="bg-danger btn-outline-danger text-light"
        style={{ maxWidth: "70px", width: "70px" }}
        disabled={flag}
      >
        Delete
      </Button>
    </>
  );
};

export default Post_Action_Buttons;
