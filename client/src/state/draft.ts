import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

import { rehydrateLocalStorage } from "./utils";

export type DraftState = {
    drafted: string[];
    powers: { [key: string]: boolean };
};

const initialState: DraftState = {
    drafted: rehydrateLocalStorage("drafted", []),
    powers: rehydrateLocalStorage("powers", {}),
};

export const draftSlice = createSlice({
    name: "draft",
    initialState,
    reducers: {
        setPowers: (state: DraftState, action: PayloadAction<any>) => {
            localStorage.setItem(
                "powers",
                JSON.stringify(action.payload.powers)
            );
            state.powers = action.payload.powers;
        },
        setDrafted: (state: DraftState, action: PayloadAction<any>) => {
            localStorage.setItem("drafted", JSON.stringify(action.payload));
            state.drafted = action.payload;
        },
    },
});

export const selectPowers = (state: RootState) => state.draft.powers;

export const { setPowers, setDrafted } = draftSlice.actions;
export const draftReducer = draftSlice.reducer;
