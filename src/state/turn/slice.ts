import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { Countries, Seasons } from "../constants";
import { Country, Season } from "../types";

import { ORDER } from "./constants";
import { switchSeason } from "./utils";

export interface TurnState {
    year: number,
    season: Season,
    country: Country,
}

const initialState: TurnState = {
    year: 1936,
    season: Seasons.SUMMER,
    country: Countries.GERMANY,
}

const turnSlice = createSlice({
    name: 'turn',
    initialState,
    reducers: {
        nextCountry: (state) => {
            const currentIndex = ORDER.findIndex((country) => country === state.country)
            if (currentIndex + 1 === ORDER.length) {
                state.year += 1;
                state.season = switchSeason(state.season);
                state.country = ORDER[0];
            } else {
                state.country = ORDER[currentIndex + 1];
            }
        },
        prevCountry: (state) => {
            const currentIndex = ORDER.findIndex((country) => country === state.country)
            if (currentIndex === 0) {
                if (state.year !== initialState.year || state.season !== initialState.season) {
                    state.year -= 1;
                    state.season = switchSeason(state.season);
                    state.country = ORDER[ORDER.length - 1];
                }
            } else {
                state.country = ORDER[currentIndex - 1];
            }
        },
    },
});

export const selectCurrentCountry = (state: RootState) => state.turn.country;
export const selectCurrentSeason = (state: RootState) => state.turn.season;
export const selectCurrentYear = (state: RootState) => state.turn.year;

export const { nextCountry, prevCountry } = turnSlice.actions;
export const turnReducer = turnSlice.reducer;
