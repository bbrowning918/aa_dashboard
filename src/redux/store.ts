import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { turnReducer } from './slices/turnSlice';
import { ippReducer } from "./slices/ippSlice";
import { uiReducer } from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    turn: turnReducer,
    ipp: ippReducer,
    ui: uiReducer,
  },
  middleware: [logger]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
