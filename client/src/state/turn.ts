import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { rehydrateLocalStorage, findSeasonYearForTurnId } from "./utils";
import { Power, Season } from "./types";

export type Turn = {
    year: number;
    power: Power;
    season: Season;
    spent: number;
    start: number;
    income: number;
};

export type TurnState = {
    turns: Turn[];
};

const initialState: TurnState = {
    turns: rehydrateLocalStorage("turns", []),
};

export const turnSlice = createSlice({
    name: "turn",
    initialState,
    reducers: {
        setTurns: (state: TurnState, action: PayloadAction<any>) => {
            localStorage.setItem("turns", JSON.stringify(action.payload.turns));
            state.turns = action.payload.turns;
        },
    },
});

export const selectTurns = (state: RootState) => state.turn.turns;

type TurnReduce = {
    [key in Power]: number;
};

export const selectTurnLabels = createSelector(
    [selectTurns],
    (turns: Turn[]) => {
        const turnCounts = turns.reduce<TurnReduce>((result, turn: Turn) => {
            if (turn.power in result) result[turn.power] += 1;
            else {
                result[turn.power] = 1;
            }
            return result;
        }, {} as TurnReduce);

        const maxTurns = Math.max(...Object.values(turnCounts));
        return Array.from({ length: maxTurns }, (_, i) => {
            return findSeasonYearForTurnId(i);
        });
    }
);

export const selectTurnsForPower = createSelector(
    [selectTurns, (state: RootState, power: Power): Power => power],
    (turns: Turn[], power: Power) => {
        const turnsForPower = turns.reduce((result: Turn[], turn: Turn) => {
            if (turn.power === power) {
                result.push(turn);
            }
            return result;
        }, []);

        return turnsForPower.sort((a: Turn, b: Turn) => {
            if (a.year === b.year) {
                return a.season.localeCompare(b.season);
            } else {
                return a.year < b.year ? -1 : 1;
            }
        });
    }
);

export const { setTurns } = turnSlice.actions;
export const turnReducer = turnSlice.reducer;
