import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

interface ToggleModalPostWithInitialInputValues {
  isModalPostOpen: boolean;
}

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
