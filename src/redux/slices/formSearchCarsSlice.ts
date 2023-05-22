import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormSearchCarsFields {
  carNameInputField: string;
  // Add more for future use
}

// Local Types can be added as well.
interface FormSearchCarsInputField {
  carNameInputField: string;
}

const initialState: FormSearchCarsFields = {
  carNameInputField: "",
};

const formSearchCarsSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    onChangeFormSearchCarsAction: (
      state,
      action: PayloadAction<FormSearchCarsFields>
    ) => {
      // state.isModalDeletePostOpen = action.payload.isModalDeletePostOpen; //original
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.isModalDeletePostOpen = action.payload.isModalDeletePostOpen;
      // state.text = action.payload.text;
    },
    onChangeFormSearchCarsInputAction: (
      state,
      action: PayloadAction<FormSearchCarsInputField>
    ) => {
      state.carNameInputField = action.payload.carNameInputField;
    },
  },
});

export default formSearchCarsSlice.reducer;

export const {
  onChangeFormSearchCarsAction,
  // onChangeFormSearchCarsInputAction, // Not a much re-usability
} = formSearchCarsSlice.actions;

// Not much reusability below
export const selectorFormSearchCarsInputField = (state: {
  formSearchCarsSlice: FormSearchCarsFields;
}) => state.formSearchCarsSlice.carNameInputField; // Works: no TSC issues

// I'm using below for all future fields as well.
export const selectorFormSearchCarsFields = (state: {
  formSearchCarsSlice: FormSearchCarsFields; // Can be RootState as well.
}) => state.formSearchCarsSlice;
