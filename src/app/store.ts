import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer, { ProjectState } from "../features/Project/projectSlice";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedProjectReducer = persistReducer(persistConfig, projectReducer)

export const store = configureStore({
  reducer: {
    project: persistedProjectReducer
  },
  devTools: true
});

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
