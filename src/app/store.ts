import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import projectReducer from "../features/Project/projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
  },
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
