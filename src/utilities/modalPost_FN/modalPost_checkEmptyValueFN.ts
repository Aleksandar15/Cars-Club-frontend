import { InitialStateModalPost } from "../../redux/slices/openModalPostSlice";
// Not using openModalTextAction since (custom) MODAL over MODAL won't open.
// import { openModalTextAction } from "../../redux/slices/openModalTextSlice";
// Stopped using Type below since TSC must "SEE" same Types from ModalPost.tsx
// import { PostState } from "../Types/modalPostTypes";

// const modalPost_checkEmptyValueFN = (postState: PostState): boolean => {
// Updated ModalPost for reusability in "EditPost":
const modalPost_checkEmptyValueFN = (
  postState: InitialStateModalPost
): boolean => {
  // // The first approach
  // const isEmpty = Object.values(postState).some(value => value === "");

  // 2nd
  let isEmpty;
  // for (const value of Object.values(postState)) {
  //   if (value === "") {
  //     isEmpty = true;
  //     break;
  //   }
  // }

  // 3rd => TypeScript error, means: lots of more guards required (/more safety)
  // "postState[key]"-error: Element implicitly has an 'any' type because expression
  // of type 'string' can't be used to index type 'PostState'.
  // No index signature with a parameter of type 'string' was found on type 'PostState'
  // 'keyof' produces union type of PostState ('title' | 'image' | etc.)
  for (const key in postState) {
    if (
      postState.hasOwnProperty(key) &&
      // postState[key as keyof PostState] === "" // Updated type:
      postState[key as keyof InitialStateModalPost] === "" &&
      // Update for reusability I'm having unimportant Boolean: isModalPostOpen
      key !== "isModalPostOpen"
    ) {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    console.log("IF isEmpty", isEmpty);
    // if isEmpty is true
    // Trigger ModalText to open & return false to ModalPost
    // openModalTextAction({
    //   isModalOpen: true,
    //   text: `Fields can't be empty!`,
    // });
    // ModalText won't open OVER ModalPost,
    // I'll look it up later
    return false;
  } else {
    console.log("ELSE isEmpty", isEmpty);
    // 'true' means to keep the submitPost FN flowing.
    return true;
  }
};

export default modalPost_checkEmptyValueFN;
