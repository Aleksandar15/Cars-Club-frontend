import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency } from "../../utilities/Types/modalPostTypes";
import { RootState } from "../store";

interface InitialStateModalPostLoading {
  modalPostLoading: boolean;
}

const initialState: InitialStateModalPostLoading = {
  modalPostLoading: false,
};

const modalPostLoadingSlice = createSlice({
  name: "openModal",
  initialState,
  reducers: {
    setModalPostLoadingAction: (
      state,
      action: PayloadAction<InitialStateModalPostLoading>
    ) => {
      state.modalPostLoading = action?.payload?.modalPostLoading;
    },
  },
});

export default modalPostLoadingSlice.reducer;

export const { setModalPostLoadingAction } = modalPostLoadingSlice.actions;
export const selectorOpenModalPostLoading = (state: RootState) =>
  state.modalPostLoadingSlice.modalPostLoading;
