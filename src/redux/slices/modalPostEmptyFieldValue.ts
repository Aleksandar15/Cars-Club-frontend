import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

interface InitialStateModalPostEmptyFieldValue {
  modalPostEmptyFieldValue: boolean;
}

const initialState: InitialStateModalPostEmptyFieldValue = {
  modalPostEmptyFieldValue: false,
};

const modalPostEmptyFieldValueSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setModalPostEmptyFieldValueAction: (
      state,
      action: PayloadAction<InitialStateModalPostEmptyFieldValue>
    ) => {
      state.modalPostEmptyFieldValue =
        action?.payload?.modalPostEmptyFieldValue;
    },
  },
});

export default modalPostEmptyFieldValueSlice.reducer;

export const { setModalPostEmptyFieldValueAction } =
  modalPostEmptyFieldValueSlice.actions;
export const selectorOpenModalPostEmptyFieldValue = (state: RootState) =>
  state.modalPostEmptyFieldValueSlice.modalPostEmptyFieldValue;
