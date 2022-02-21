import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type GameState = {
    token: string;
    game: string;
    qrCode: string;
};

const initialState: GameState = {
    token: localStorage.getItem("token") || "",
    game: localStorage.getItem("game") || "",
    qrCode: localStorage.getItem("qrCode") || "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        init: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("game", action.payload.game);
            localStorage.setItem("qrCode", action.payload.qr_code);
            state.token = action.payload.token;
            state.game = action.payload.game;
            state.qrCode = action.payload.qr_code;
        },
        clear: (state: GameState) => {
            localStorage.removeItem("token");
            localStorage.removeItem("game");
            localStorage.removeItem("qrCode");
            state.token = "";
            state.game = "";
            state.qrCode = "";
        },
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectGame = (state: RootState) => state.game.game;
export const selectToken = (state: RootState) => state.game.token;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.game.token);

export const { init, clear } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
