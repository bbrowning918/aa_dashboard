import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { rehydrateLocalStorage } from "./utils";


type Turn = {

}

export type TurnState = {
    turns: string[];
};

const initialState: TurnState = {
    turns: rehydrateLocalStorage("turns", []),
};

export const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        setTurns: (state: TurnState, action: PayloadAction<any>) => {
            localStorage.setItem(
                "turns",
                JSON.stringify(action.payload.turns)
            );
            state.turns = action.payload.turns;
        },
    },
});

export const selectTurns = (state: RootState) => state.turn.turns;

export const { setTurns } = turnSlice.actions;
export const turnReducer = turnSlice.reducer;
