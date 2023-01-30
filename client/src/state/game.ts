import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type GameState = {
    token: string;
    qrCode: string;
};

const initialState: GameState = {
    token: localStorage.getItem("token") || "",
    qrCode: localStorage.getItem("qrCode") || "",
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        init: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("qrCode", action.payload.qr_code);
            state.token = action.payload.token;
            state.qrCode = action.payload.qr_code;
        },
        setToken: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
        },
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectToken = (state: RootState) => state.game.token;

export const { init, setToken } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
