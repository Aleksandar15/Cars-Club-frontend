import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

export interface InitialStateModalPostButtonValue {
  modalPostButtonValue: "CREATE A POST" | "EDIT A POST";
}

const initialState: InitialStateModalPostButtonValue = {
  modalPostButtonValue: "CREATE A POST",
};

const modalPostButtonValueSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setModalPostButtonValueAction: (
      state,
      action: PayloadAction<InitialStateModalPostButtonValue>
    ) => {
      state.modalPostButtonValue = action?.payload?.modalPostButtonValue;
    },
  },
});

export default modalPostButtonValueSlice.reducer;

export const { setModalPostButtonValueAction } =
  modalPostButtonValueSlice.actions;
export const selectorOpenModalPostButtonValue = (state: RootState) =>
  state.modalPostButtonValueSlice.modalPostButtonValue;
