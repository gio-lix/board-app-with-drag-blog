import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"
import boardReducer from "./slices/boardSlice"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer
})

const store = configureStore({
    reducer: rootReducer,

})

export type RootState = ReturnType<typeof store.getState>
export type AddDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AddDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store