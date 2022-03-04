import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { gameReducer } from "./game";
import { ippReducer } from "./ipp";

export const store = configureStore({
    reducer: combineReducers({
        game: gameReducer,
        ipp: ippReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
