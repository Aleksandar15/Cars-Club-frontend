import { PayloadAction } from "@reduxjs/toolkit";
import { allActionTypes } from "../../action-types/allActionTypes";

interface VerifyAction {
  type: string;
  payload: string | boolean;
}

interface VerifyState {
  isUserAuthorized: boolean;
}

const initState: VerifyState = {
  isUserAuthorized: false,
};

const verifyReducer = (
  state = initState,
  action: PayloadAction<{ isUserAuthorized: boolean }>
) => {
  console.log("VerifyReducer action:", action);
  // ^^^ this also works with RTK setups
  // since its inside combineReducers({})
  // but its not a best practice
  switch (action.type) {
    case allActionTypes.USER_IS_NOT_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload.isUserAuthorized as boolean,
      };
    case allActionTypes.USER_IS_AUTHORIZED:
      return {
        ...state,
        isUserAuthorized: action.payload.isUserAuthorized as boolean,
      };
    default:
      return state;
  }
};

// TypeScript way of exporting named functions
// otherwise "export" must be on same line as function declaration
export { verifyReducer };
