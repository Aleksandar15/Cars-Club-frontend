// Define Typed Hooks using Redux docs
// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";

// AppDispatch = typeof store.dispatch
type DispatchFunc = () => AppDispatch;
export const useDispatchTyped: DispatchFunc = useDispatch;
export const useSelectorTyped: TypedUseSelectorHook<RootState> = useSelector;
