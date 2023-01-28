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
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectToken = (state: RootState) => state.game.token;

export const { init } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
