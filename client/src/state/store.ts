import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { draftReducer } from "./draft";
import { gameReducer } from "./game";
import { ippReducer } from "./ipp";
import { turnReducer } from "./turn";

export const store = configureStore({
    reducer: combineReducers({
        draft: draftReducer,
        game: gameReducer,
        ipp: ippReducer,
        turn: turnReducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([logger]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
