import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { gameReducer } from './game';
import { uiReducer } from './ui';

const rootReducer = combineReducers({
  game: gameReducer,
  ui: uiReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
