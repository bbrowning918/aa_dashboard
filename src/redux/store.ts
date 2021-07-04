import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { turnReducer } from './turnSlice';
import { ippReducer } from "./ippSlice";
import { uiReducer } from './uiSlice';

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
