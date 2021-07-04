import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { Powers } from "../constants";

import { Power } from "../types";
import { IppState } from "./types";


const initialState: IppState = {
    [Powers.GERMANY]: 20,
    [Powers.SOVIET_UNION]: 8,
    [Powers.COMMUNIST_CHINA]: 2,
    [Powers.JAPAN]: 16,
    [Powers.UK_WEST]: 11,
    [Powers.UK_EAST]: 5,
    [Powers.ANZAC]: 3,
    [Powers.FRANCE]: 5,
    [Powers.ITALY]: 7,
    [Powers.USA]: 6,
    [Powers.NATIONALIST_CHINA]: 6,
}

const slice = createSlice({
    name: 'ipp',
    initialState,
    reducers: {
        transfer: (state: IppState, action: PayloadAction<{ from: Power, to: Power, amount: number }>) => {
            state[action.payload.from] -= action.payload.amount;
            state[action.payload.to] += action.payload.amount;
        },
        increase: (state, action: PayloadAction<{ country: Power, amount: number }>) => {
            state[action.payload.country] += action.payload.amount;
        },
        decrease: (state, action: PayloadAction<{ country: Power, amount: number }>) => {
            state[action.payload.country] -= action.payload.amount;
        }
    },
});

export const selectIppForPower = (state: RootState, power: Power) => state.ipp[power];

export const {transfer, increase, decrease} = slice.actions;
export const ippReducer = slice.reducer;
