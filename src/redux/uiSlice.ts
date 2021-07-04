import { createSlice } from '@reduxjs/toolkit';

import { RootState } from './store';

type UiState = {
    turnDialogVisibility: boolean
}

const initialState: UiState = {
    turnDialogVisibility: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleTurnDialog: (state: UiState) => {
            state.turnDialogVisibility = !state.turnDialogVisibility;
        }
    }
});

export const selectTurnDialogVisibility = (state: RootState) => state.ui.turnDialogVisibility;

export const { toggleTurnDialog } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;