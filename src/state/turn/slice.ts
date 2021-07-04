import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { Powers } from "../constants";
import { ORDER } from "./constants";

import { Power } from "../types";
import { TurnState } from "./types";

const initialState: TurnState = {
    [Powers.GERMANY]: {
        0: {start: 20},
    },
    [Powers.SOVIET_UNION]: {
        0: {start: 8},
    },
    [Powers.COMMUNIST_CHINA]: {
        0: {start: 2},
    },
    [Powers.JAPAN]: {
        0: {start: 16},
    },
    [Powers.UK_WEST]: {
        0: {start: 11},
    },
    [Powers.UK_EAST]: {
        0: {start: 5},
    },
    [Powers.ANZAC]: {
        0: {start: 3},
    },
    [Powers.FRANCE]: {
        0: {start: 5},
    },
    [Powers.ITALY]: {
        0: {start: 7},
    },
    [Powers.USA]: {
        0: {start: 6},
    },
    [Powers.NATIONALIST_CHINA]: {
        0: {start: 6},
    },
    ids: [0, 1],
    currentId: 0,
    currentPower: ORDER[0],
}

const slice = createSlice({
    name: 'turn',
    initialState,
    reducers: {
        nextPower: (state: TurnState, action: PayloadAction<{ spent: number, income: number }>) => {
            const {spent, income} = action.payload;
            const currentIndex = ORDER.findIndex((country) => country === state.currentPower)

            const start = state[state.currentPower][state.currentId].start;
            state[state.currentPower][state.currentId].spent = spent;
            state[state.currentPower][state.currentId].income = income
            state[state.currentPower][state.currentId + 1] = {start: start - spent + income};

            if (currentIndex + 1 === ORDER.length) {
                state.currentId += 1;
                state.currentPower = ORDER[0];
                state.ids = Array.from(new Set([...state.ids, state.currentId + 1]));
            } else {
                state.currentPower = ORDER[currentIndex + 1];
            }
        },
        prevPower: (state) => {
            const currentIndex = ORDER.findIndex((country) => country === state.currentPower)
            if (currentIndex === 0) {
                if (state.currentId !== initialState.currentId) {
                    state.currentId -= 1;
                    state.currentPower = ORDER[ORDER.length - 1];
                }
            } else {
                state.currentPower = ORDER[currentIndex - 1];
            }
        },
    },
});

export const selectTurnIds = (state: RootState) => state.turn.ids;
export const selectTurnsForPower = (state: RootState, power: Power) => state.turn[power];

export const selectCurrentTurnId = (state: RootState) => state.turn.currentId;
export const selectCurrentTurn = (state: RootState) => state.turn[state.turn.currentPower][state.turn.currentId]
export const selectCurrentPower = (state: RootState) => state.turn.currentPower;

export const {nextPower, prevPower} = slice.actions;
export const turnReducer = slice.reducer;
