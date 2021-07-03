import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { Country } from "./types";
import { ORDER } from "./constants";

export type TurnState = {
    turnIds: Array<number>,
    currentTurnId: number,
    currentCountry: Country,
}

const initialState: TurnState = {
    turnIds: [0],
    currentTurnId: 0,
    currentCountry: ORDER[0],
}

const turnSlice = createSlice({
    name: 'turn',
    initialState,
    reducers: {
        nextCountry: (state) => {
            const currentIndex = ORDER.findIndex((country) => country === state.currentCountry)
            if (currentIndex + 1 === ORDER.length) {
                state.currentTurnId += 1;
                state.currentCountry = ORDER[0];
                state.turnIds.push(state.currentTurnId);
            } else {
                state.currentCountry = ORDER[currentIndex + 1];
            }
        },
        prevCountry: (state) => {
            const currentIndex = ORDER.findIndex((country) => country === state.currentCountry)
            if (currentIndex === 0) {
                if (state.currentTurnId !== initialState.currentTurnId) {
                    state.currentTurnId -= 1;
                    state.currentCountry = ORDER[ORDER.length - 1];
                }
            } else {
                state.currentCountry = ORDER[currentIndex - 1];
            }
        },
    },
});

export const selectCurrentTurnId = (state: RootState) => state.turn.currentTurnId;
export const selectTurnIds = (state: RootState) => state.turn.turnIds;
export const selectCurrentCountry = (state: RootState) => state.turn.currentCountry;

export const { nextCountry, prevCountry } = turnSlice.actions;
export const turnReducer = turnSlice.reducer;
