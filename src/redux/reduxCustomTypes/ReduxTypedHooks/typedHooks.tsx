// Define Typed Hooks using Redux docs
// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppDispatch, RootState } from "../../store";

// AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch;
export const useDispatchTyped: DispatchFunc = useDispatch;
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;

// // Dispatch hook for createAsyncThunk function calls.
// type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
// export const useDispatchAsyncThunk = (): AppThunkDispatch =>
//   useDispatch<AppThunkDispatch>();
// // Alternatively:
type AppThunkDispatch = () => ThunkDispatch<RootState, void, AnyAction>;
export const useDispatchAsyncThunk: AppThunkDispatch = useDispatch;

// NOTES
// 1. useDispatchAsyncThunk was created to fix the error:
// "Argument of type 'AsyncThunkAction<any, void, AsyncThunkConfig>'
// is not assignable to parameter of type 'AnyAction'."
