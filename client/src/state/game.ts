import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type GameState = {
    token: string;
    qrCode: string;
    gameId: string;
    connected: boolean;
};

const initialState: GameState = {
    token: localStorage.getItem("token") || "",
    qrCode: localStorage.getItem("qrCode") || "",
    gameId: localStorage.getItem("gameId") || "",
    connected: false,
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        init: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("qrCode", action.payload.qr_code);
            localStorage.setItem("gameId", action.payload.game_ref);
            state.gameId = action.payload.game_ref;
            state.token = action.payload.token;
            state.qrCode = action.payload.qr_code;
        },
        setToken: (state: GameState, action: PayloadAction<any>) => {
            localStorage.setItem("token", action.payload.token);
            state.token = action.payload.token;
        },
        setConnected: (state: GameState) => {
            state.connected = true;
        },
    },
});

export const selectQrCode = (state: RootState) => state.game.qrCode;
export const selectToken = (state: RootState) => state.game.token;
export const selectConnected = (state: RootState) => state.game.connected;
export const selectGameId = (state: RootState) => state.game.gameId;

export const { init, setToken, setConnected } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
