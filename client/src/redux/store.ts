import {
    configureStore,
    combineReducers,
    Middleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { gameReducer } from './game';
import { websocket } from '../index';

const websocketMiddleware: Middleware = _ => next => action => {
    websocket.send(JSON.stringify(action));
    next(action);
}

const rootReducer = combineReducers({
    game: gameReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger, websocketMiddleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
