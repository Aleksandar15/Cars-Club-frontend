import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

export interface InitialStateModalPostEditPost {
  post_user_id: string;
  post_post_id: string;
}

const initialState: InitialStateModalPostEditPost = {
  post_user_id: "",
  post_post_id: "",
};

const modalPostEditPostSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setModalPostEditPostAction: (
      state,
      action: PayloadAction<InitialStateModalPostEditPost>
    ) => {
      state.post_user_id = action?.payload?.post_user_id;
      state.post_post_id = action?.payload?.post_post_id;
    },
  },
});

export default modalPostEditPostSlice.reducer;

export const { setModalPostEditPostAction } = modalPostEditPostSlice.actions;
export const selectorOpenModalPostEditPost = (state: RootState) =>
  state.modalPostEditPostSlice;
