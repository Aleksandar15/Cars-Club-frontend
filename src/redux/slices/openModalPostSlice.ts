import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

interface ToggleModalPostWithInitialInputValues {
  isModalPostOpen: boolean;
}
// Update so I have created this new action that will be used
// ONLY to toggle ModalPost to open/close; I've been thinking
// to separate those states as "ModalPostData" and keep this
// one with a single 'isModalPostOpen' state, but I decided
// not to, because I'm filtering this state out of my FormData
// but I don't have to do it because sending my isModalPostOpen
// state data to the backend doesn't do any harm.
// -> Hence I can even use it for an evidence in Express: if
// req.body.isModalPostOpen is missing, that could be a hacker
// trying to modify a Post data on behalf of the victimized
// user, but I won't do it for now because it requires testing.

export interface InitialStateModalPost {
  isModalPostOpen: boolean;
  // text?: string;
  title: string;
  image: string;
  description: string;
  contactNumber: string;
  askingPrice: string;
  currency: Currency;
}

const initialState: InitialStateModalPost = {
  isModalPostOpen: false,
  // text: "",
  title: "",
  image: "",
  description: "",
  contactNumber: "",
  askingPrice: "",
  currency: "USD",
};

const openModalPostSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModalPostAction: (
      state,
      action: PayloadAction<InitialStateModalPost>
    ) => {
      // return action.payload; //Works as well, alternatively to:
      // // state.isModalPostOpen = action.payload.isModalPostOpen;
      // // state.text = action.payload.text; // etc.

      // Update for modifying all of the states
      state.isModalPostOpen = action.payload.isModalPostOpen;
      state.title = action.payload.title;
      state.image = action.payload.image;
      state.description = action.payload.description;
      state.contactNumber = action.payload.contactNumber;
      state.askingPrice = action.payload.askingPrice;
      state.currency = action.payload.currency;
    },
    toggleModalPostWithInitialValuesAction: (
      state,
      action: PayloadAction<ToggleModalPostWithInitialInputValues>
    ) => {
      state.isModalPostOpen = action.payload?.isModalPostOpen;
    },
  },
});

export default openModalPostSlice.reducer;

// export const { openModalPostAction } = openModalPostSlice.actions;
export const { openModalPostAction, toggleModalPostWithInitialValuesAction } =
  openModalPostSlice.actions;

// export const selectorOpenModalPost = (state: {
//   openModalPostSlice: InitialStateModalPost;
// }) => state.openModalPostSlice;
export const selectorOpenModalPost = (state: RootState) =>
  state.openModalPostSlice;
