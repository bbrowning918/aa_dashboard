import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { Powers, ORDER } from '../constants';
import { Power } from '../types';

type Turn = { start: number, spent?: number, income?: number };

type TurnState = {
    [Powers.GERMANY]: { [turnId: number]: Turn },
    [Powers.SOVIET_UNION]: { [turnId: number]: Turn },
    [Powers.COMMUNIST_CHINA]: { [turnId: number]: Turn },
    [Powers.JAPAN]: { [turnId: number]: Turn },
    [Powers.UK_WEST]: { [turnId: number]: Turn },
    [Powers.UK_EAST]: { [turnId: number]: Turn },
    [Powers.ANZAC]: { [turnId: number]: Turn },
    [Powers.FRANCE]: { [turnId: number]: Turn },
    [Powers.ITALY]: { [turnId: number]: Turn },
    [Powers.USA]: { [turnId: number]: Turn },
    [Powers.NATIONALIST_CHINA]: { [turnId: number]: Turn },
    ids: Array<number>,
    currentId: number,
    currentPower: Power,
}

const initialState: TurnState = {
    [Powers.GERMANY]: {0: {start: 20}},
    [Powers.SOVIET_UNION]: {0: {start: 8}},
    [Powers.COMMUNIST_CHINA]: {0: {start: 2}},
    [Powers.JAPAN]: {0: {start: 16}},
    [Powers.UK_WEST]: {0: {start: 11}},
    [Powers.UK_EAST]: {0: {start: 5}},
    [Powers.ANZAC]: {0: {start: 3}},
    [Powers.FRANCE]: {0: {start: 5}},
    [Powers.ITALY]: {0: {start: 7}},
    [Powers.USA]: {0: {start: 6}},
    [Powers.NATIONALIST_CHINA]: {0: {start: 6}},
    ids: [0, 1],
    currentId: 0,
    currentPower: ORDER[0],
}

const turnSlice = createSlice({
    name: 'turn',
    initialState,
    reducers: {
        nextTurn: (state: TurnState) => {
            const countPowersSubmitted = ORDER.reduce((count: number, power: Power) => {
                return state[power][state.currentId + 1] !== undefined ? count + 1 : count;
            }, 0);
            if (countPowersSubmitted === ORDER.length) {
                state.currentId += 1;
                state.currentPower = ORDER[0];
            }
        },
        nextPower: (state: TurnState) => {
            const currentIndex = ORDER.findIndex((country) => country === state.currentPower)
            if (currentIndex + 1 < ORDER.length) {
                state.currentPower = ORDER[currentIndex + 1];
                state.ids = Array.from(new Set([...state.ids, state.currentId + 1]));
            }
        },
        prevPower: (state: TurnState) => {
            const currentIndex = ORDER.findIndex((country) => country === state.currentPower)
            if (currentIndex > 0) {
                state.currentPower = ORDER[currentIndex - 1];
            }
        },
        saveCurrent: (state: TurnState, action: PayloadAction<{ spent: number, income: number }>) => {
            const {spent, income} = action.payload;

            const start = state[state.currentPower][state.currentId].start;
            state[state.currentPower][state.currentId].spent = spent;
            state[state.currentPower][state.currentId].income = income
            state[state.currentPower][state.currentId + 1] = {start: start - spent + income};
        },
    },
});

export const selectCanMovePrevPower = (state: RootState) => ORDER.findIndex((country) => country === state.game.turn.currentPower) > 0
export const selectCanMoveNextPower = (state: RootState) => ORDER.findIndex((country) => country === state.game.turn.currentPower) + 1 < ORDER.length
export const selectCanMoveNextTurn = (state: RootState) => {
    const countPowersSubmitted = ORDER.reduce((count: number, power: Power) => {
        return state.game.turn[power][state.game.turn.currentId + 1] !== undefined ? count + 1 : count;
    }, 0);
    return countPowersSubmitted === ORDER.length;
}

export const selectTurnIds = (state: RootState) => state.game.turn.ids;
export const selectTurnsForPower = (state: RootState, power: Power) => state.game.turn[power];

export const selectCurrentTurnId = (state: RootState) => state.game.turn.currentId;
export const selectCurrentTurn = (state: RootState) => state.game.turn[state.game.turn.currentPower][state.game.turn.currentId]
export const selectCurrentPower = (state: RootState) => state.game.turn.currentPower;

export const {nextTurn, nextPower, prevPower, saveCurrent} = turnSlice.actions;
export const isTurnAction = isAnyOf(nextTurn, nextPower, prevPower, saveCurrent);
export const turnReducer = turnSlice.reducer;
