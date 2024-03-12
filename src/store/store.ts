import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;