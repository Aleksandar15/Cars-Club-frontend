import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isModalPostSuccessTextOpen: boolean;
  text: string;
}

const initialState: InitialState = {
  isModalPostSuccessTextOpen: false,
  text: "",
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
