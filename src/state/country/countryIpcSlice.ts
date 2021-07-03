import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";

export type IpcItem = {
    ipc: number,
}

export type IpcState = {
    [turn_id: number]: IpcItem
}

export type IpcAction = {
    turn_id: number,
    ipc: number,
}

export const countryIpcSlice = <IpcState, Reducers extends SliceCaseReducers<IpcState>>({
    name = '',
    initialState,
    reducers,
}: {
    name: string,
    initialState: IpcState,
    reducers: ValidateSliceCaseReducers<IpcState, Reducers>,
}) => {
    return createSlice({
        name,
        initialState,
        reducers: {
            save: (state: IpcState, action: PayloadAction<IpcAction>) => {
                const {turn_id, ipc} = action.payload;
                Object.assign(state, {[turn_id]: {ipc: ipc}})
            },
            ...reducers,
        }
    })
};
