import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isModalPostSuccessTextOpen: boolean;
  text: string;
  typeOfResponse?: string;
}

const initialState: InitialState = {
  isModalPostSuccessTextOpen: false,
  text: "",
  // NOTE typeOfResponse will be used for the Button inside ModalPostSuccessText to update.
  // ..Thinking about logically: both Success & Fail`s responses may trigger a re-call to
  // the getAllPosts() Async Thunk when clicking "OKAY" inside ModalPostSuccessText.
  // I'll leave here for a future-proof & reusability.
  // The kind of reusability can be: the "Fields can't be empty" to be moved away from
  // my current P-tag and into the ModalPostSuccessText`s "OKAY" button should re-open
  // the ModalPost.tsx with the current-user-input field values remained unchanged;
  // otherwise it should call getAllPosts() (or any future SORTing GET Request).
  // typeOfResponse: "successfully created post",
  // typeOfResponse: "successfully editted post",
  // typeOfResponse: "failed to create post",
  // typeOfResponse: "failed to edit post",
};

const modalPostSuccessTextSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModalPostSuccessTextAction: (
      state,
      action: PayloadAction<InitialState>
    ) => {
      // state.isModalPostSuccessTextOpen = action.payload.isModalPostSuccessTextOpen; //original
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.isModalPostSuccessTextOpen = action.payload.isModalPostSuccessTextOpen;
      // state.text = action.payload.text;
    },
  },
});

export default modalPostSuccessTextSlice.reducer;

export const { openModalPostSuccessTextAction } =
  modalPostSuccessTextSlice.actions;
export const selectorOpenModalPostSuccessText = (state: {
  modalPostSuccessTextSlice: InitialState;
}) => state.modalPostSuccessTextSlice;
