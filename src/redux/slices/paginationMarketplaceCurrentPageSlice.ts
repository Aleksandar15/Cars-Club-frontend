import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface currentPageSortGetPosts {
  currentPage: number;
  // Add more for future use
}

const initialState: currentPageSortGetPosts = {
  currentPage: 1, // Change currentPage
  // But initial current page (on refresh) must
  // always be '1' -> used in my
  // 'PaginationMarketplace.tsx'.
};

// STORE currentPage in Redux so that my 'EDIT A POST'
// button will be able to reset it to '1'

// In the future I can add all of my states & a bunch of
// Reducers to fit my 'PaginationMarketplace.tsx' logic
// that all will be fully built so that my
// 'PaginationMarketplace.tsx' can call them with ONLY
// the 'carNameTittle' Redux State coming from another
// component ('FormSearchCars.tsx').
// -> The only issue I see is that I need to use a custom
// 'dispatchAsyncThunk' that's coming from my Typed Hook
// 'useDispatchAsyncThunk' -> but ERROR is: I can NOT
// call a Hook inside Redux Slice files.

const paginationMarketplaceCurrentPageSlice = createSlice({
  name: "storeCurrentPage",
  initialState,
  reducers: {
    setCurrentPageAction: (
      state,
      action: PayloadAction<currentPageSortGetPosts>
    ) => {
      // state = action.payload; //doesn't work

      // return action.payload; //Works as well, alternative
      state.currentPage = action.payload?.currentPage;
    },
  },
});

// Export .reducer .actions ; states

export default paginationMarketplaceCurrentPageSlice.reducer;

export const { setCurrentPageAction } =
  paginationMarketplaceCurrentPageSlice.actions;

export const selectorCurrentPage = (state: RootState) =>
  state.paginationMarketplaceCurrentPageSlice?.currentPage;
