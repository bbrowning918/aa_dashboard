import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { gameReducer } from "./game";
import { ipp, ippReducer } from "./ipp";

export const store = configureStore({
    reducer: combineReducers({
        game: gameReducer,
        ipp: ippReducer,
        [ipp.reducerPath]: ipp.reducer,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            logger,
            ipp.middleware,
        ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
