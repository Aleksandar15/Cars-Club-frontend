import { ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../../reducer/rootReducer";

export type reduxActionType = ThunkAction<void, RootState, unknown, AnyAction>;
