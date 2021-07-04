import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { UiState } from './types';

const initialState: UiState = {
    turnDialogVisibility: false,
};

const slice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTurnDialog: (state: UiState) => {
            state.turnDialogVisibility = !state.turnDialogVisibility;
        }
    }
});

export const selectTurnDialogVisibility = (state: RootState) => state.ui.turnDialogVisibility;

export const { toggleTurnDialog } = slice.actions;
export const uiReducer = slice.reducer;