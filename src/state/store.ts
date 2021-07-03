import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { turnReducer } from './turn/slice';
import { germanyIpcReducer } from "./country/germanyIpcSlice";
import { sovietIpcReducer } from "./country/sovietIpcSlice";

export const store = configureStore({
  reducer: {
    turn: turnReducer,
    germany: germanyIpcReducer,
    soviets: sovietIpcReducer,
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
