import { openModalAction } from "../../redux/slices/openModalTextSlice";
import { PostState } from "../Types/modalPostTypes";

const modalPost_checkEmptyValueFN = (postState: PostState): boolean => {
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
      postState[key as keyof PostState] === ""
    ) {
      isEmpty = true;
      break;
    }
  }

  if (isEmpty) {
    console.log("IF isEmpty", isEmpty);
    // if isEmpty is true
    // Trigger ModalText to open & return false to ModalPost
    // openModalAction({
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
