import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Powers } from "./constants";
import { Power } from "./types";

type Turn = { start: number; spent?: number; income?: number };

type IPPState = {
    [Powers.GERMANY]: { [turnId: number]: Turn };
    [Powers.SOVIET_UNION]: { [turnId: number]: Turn };
    [Powers.COMMUNIST_CHINA]: { [turnId: number]: Turn };
    [Powers.JAPAN]: { [turnId: number]: Turn };
    [Powers.UK_WEST]: { [turnId: number]: Turn };
    [Powers.UK_EAST]: { [turnId: number]: Turn };
    [Powers.ANZAC]: { [turnId: number]: Turn };
    [Powers.FRANCE]: { [turnId: number]: Turn };
    [Powers.ITALY]: { [turnId: number]: Turn };
    [Powers.USA]: { [turnId: number]: Turn };
    [Powers.NATIONALIST_CHINA]: { [turnId: number]: Turn };
    turnIds: Array<number>;
    currentTurnId: number;
};

const initialState: IPPState = {
    [Powers.GERMANY]: { 0: { start: 20 } },
    [Powers.SOVIET_UNION]: { 0: { start: 8 } },
    [Powers.COMMUNIST_CHINA]: { 0: { start: 2 } },
    [Powers.JAPAN]: { 0: { start: 16 } },
    [Powers.UK_WEST]: { 0: { start: 11 } },
    [Powers.UK_EAST]: { 0: { start: 5 } },
    [Powers.ANZAC]: { 0: { start: 3 } },
    [Powers.FRANCE]: { 0: { start: 5 } },
    [Powers.ITALY]: { 0: { start: 7 } },
    [Powers.USA]: { 0: { start: 6 } },
    [Powers.NATIONALIST_CHINA]: { 0: { start: 6 } },
    turnIds: [0, 1],
    currentTurnId: 0,
};

const ippSlice = createSlice({
    name: "ipp",
    initialState,
    reducers: {},
});

export const selectTurnIds = (state: RootState) => state.ipp.turnIds;
export const selectTurnsForPower = (state: RootState, power: Power) => state.ipp[power];

export const selectCurrentTurnId = (state: RootState) => state.ipp.currentTurnId;

export const ippReducer = ippSlice.reducer;
