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
  state.modalPostButtonValueSlice;
// Had to fix TypScript in `ModalPost_Create_or_Edit_Button`
// I had to destructure the "modalPostButtonValue" state.

// // Alternative like below has TypeScript errors
// // "Property 'modalPostButtonValueSlice' does not exist
// // on type 'InitialStateModalPostButtonValue'.
// //  Did you mean 'modalPostButtonValue'? TS":
// export const selectorOpenModalPostButtonValueTypeFix = (
//   state: InitialStateModalPostButtonValue
// ) => state.modalPostButtonValueSlice.modalPostButtonValue;
