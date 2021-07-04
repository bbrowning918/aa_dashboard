import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { turnReducer } from './turn/slice';
import { ippReducer } from "./ipp/slice";
import { uiReducer } from './ui/slice';

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
