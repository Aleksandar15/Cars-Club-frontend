import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialStateSearchSubmitForm {
  carNameTitle: string;
}

const initialState: InitialStateSearchSubmitForm = {
  carNameTitle: "",
};

const formSearchSubmitSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    triggerFormSearchSubmitAction: (
      state,
      action: PayloadAction<InitialStateSearchSubmitForm>
    ) => {
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.isModalDeletePostOpen = action.payload.isModalDeletePostOpen;
      // state.text = action.payload.text;
    },
  },
});

export default formSearchSubmitSlice.reducer;

export const { triggerFormSearchSubmitAction } = formSearchSubmitSlice.actions;
export const selectorSearchSubmitForm = (state: RootState) =>
  state.formSearchSubmitSlice;
