import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isModalPostOpen: boolean;
  text?: string;
  title?: string;
  image?: string;
  description?: string;
  contactNumber?: number;
  askingPrice?: number;
}

const initialState: InitialState = {
  isModalPostOpen: false,
  text: "",
};

const openModalPostSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModalPostAction: (state, action: PayloadAction<InitialState>) => {
      return action.payload; //Works as well, alternatively to:
      // state.isModalPostOpen = action.payload.isModalPostOpen;
      // state.text = action.payload.text; // etc.
    },
  },
});

export default openModalPostSlice.reducer;

export const { openModalPostAction } = openModalPostSlice.actions;
export const selectorOpenModalPost = (state: {
  openModalPostSlice: InitialState;
}) => state.openModalPostSlice;
