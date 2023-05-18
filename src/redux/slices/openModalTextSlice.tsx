import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isModalOpen: boolean;
  text: string;
}

const initialState: InitialState = {
  isModalOpen: false,
  text: "",
};

const openModalTextSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModalTextAction: (state, action: PayloadAction<InitialState>) => {
      // state.isModalOpen = action.payload.isModalOpen; //original
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.isModalOpen = action.payload.isModalOpen;
      // state.text = action.payload.text;
    },
  },
});

export default openModalTextSlice.reducer;

export const { openModalTextAction } = openModalTextSlice.actions;
export const selectorOpenModalText = (state: {
  openModalTextSlice: InitialState;
}) => state.openModalTextSlice;
