import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { charactersApi } from "../API";
import { charactersSlice } from "./slices/characters";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { galleryFilter } from "./slices/galleryFilter";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  characters: charactersSlice.reducer,
  filter: galleryFilter.reducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['characters'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(charactersApi.middleware),
});

export const persister = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
