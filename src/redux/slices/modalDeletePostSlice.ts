import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  isModalDeletePostOpen: boolean;
  text: string;
  typeOfResponse?: string;
  post_post_id?: string;
  post_user_id?: string;
}

const initialState: InitialState = {
  isModalDeletePostOpen: false,
  text: "",
};

const modalDeletePostSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    openModalDeletePostAction: (state, action: PayloadAction<InitialState>) => {
      // state.isModalDeletePostOpen = action.payload.isModalDeletePostOpen; //original
      // state = action.payload; //doesn't work

      return action.payload; //Works as well, alternatively to:
      // state.isModalDeletePostOpen = action.payload.isModalDeletePostOpen;
      // state.text = action.payload.text;
    },
  },
});

export default modalDeletePostSlice.reducer;

export const { openModalDeletePostAction } = modalDeletePostSlice.actions;
export const selectorOpenModalDeletePost = (state: {
  modalDeletePostSlice: InitialState;
}) => state.modalDeletePostSlice;
