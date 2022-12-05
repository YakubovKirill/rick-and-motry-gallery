import { configureStore } from "@reduxjs/toolkit";
import { charactersApi } from "../API";
import { charactersSlice } from "./slices/characters";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { galleryFilter } from "./slices/galleryFilter";

export const store = configureStore({
    reducer: {
      characters: charactersSlice.reducer,
      filter: galleryFilter.reducer,
      [charactersApi.reducerPath]: charactersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(charactersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
