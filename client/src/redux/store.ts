import {
    configureStore,
    combineReducers,
    ThunkAction,
    Action,
    Middleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { gameReducer } from './game';
import { isTurnAction } from "./game/turnSlice";
import { uiReducer } from './ui';
import { websocket } from "../index";

const websocketMiddleware: Middleware = store => next => action => {
    const state = store.getState();
    if (isTurnAction(action)) {
        websocket.send(JSON.stringify(action));
        websocket.send(JSON.stringify(state));
    }
    next(action);
}

const rootReducer = combineReducers({
    game: gameReducer,
    ui: uiReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, websocketMiddleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
