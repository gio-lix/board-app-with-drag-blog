import {combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    user: userReducer
})

const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store