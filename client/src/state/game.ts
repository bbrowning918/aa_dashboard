import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type GameState = {
    token: string;
    gameRef: string;
    qrCode: string;
};

const initialState: GameState = {
    token: localStorage.getItem("token") || "",
    gameRef: localStorage.getItem("gameRef") || "",
    qrCode: localStorage.getItem("qrCode") || "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        init: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("gameRef", action.payload.game_ref);
            localStorage.setItem("qrCode", action.payload.qr_code);
            state.token = action.payload.token;
            state.gameRef = action.payload.game_ref;
            state.qrCode = action.payload.qr_code;
        },
        clear: (state: GameState) => {
            localStorage.removeItem("token");
            localStorage.removeItem("gameRef");
            localStorage.removeItem("qrCode");
            state.token = "";
            state.gameRef = "";
            state.qrCode = "";
        },
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectGame = (state: RootState) => state.game.gameRef;
export const selectToken = (state: RootState) => state.game.token;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.game.token);

export const { init, clear } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
