import { configureStore, combineReducers, ThunkAction, Action, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { gameReducer } from './game';
import { uiReducer } from './ui';
import { websocket } from "../index";

const websocketMiddleware: Middleware = (store) => {
    return (next) => {
        return (action) => {
            websocket.send(JSON.stringify(store.getState()));
            return next(action);
        }
    }
}

const rootReducer = combineReducers({
    game: gameReducer,
    ui: uiReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, websocketMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
