import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type GameState = {
    token: string;
    powers: { [key: string]: boolean };
    qrCode: string;
};

const initialState: GameState = {
    token: localStorage.getItem("token") || "",
    qrCode: localStorage.getItem("qrCode") || "",
    powers: {},
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
        setPowers: (state: GameState, action: PayloadAction<any>) => {
            state.powers = action.payload.powers;
        },
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectToken = (state: RootState) => state.game.token;
export const selectPowers = (state: RootState) => state.game.powers;

export const { init, setToken, setPowers } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
