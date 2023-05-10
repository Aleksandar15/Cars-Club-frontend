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
    openModalAction: (state, action: PayloadAction<InitialState>) => {
      console.log("action:", action, "&& state:", state);
      // state.isModalOpen = action.payload.isModalOpen;
      // state.isModalOpen = action.payload;
      // state = action.payload;
      return action.payload;
    },
  },
});

export default openModalTextSlice.reducer;

export const { openModalAction } = openModalTextSlice.actions;
export const selectorOpenModalText = (state: {
  openModalTextSlice: InitialState;
}) => state.openModalTextSlice;
