import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from "@reduxjs/toolkit";

export type IppItem = {
    ipp: number,
}

export type IppState = {
    [turn_id: number]: IppItem
}

export type IppAction = {
    turn_id: number,
    ipp: number,
}

export const countryIppSlice = <IpcState, Reducers extends SliceCaseReducers<IpcState>>({
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
            save: (state: IpcState, action: PayloadAction<IppAction>) => {
                const {turn_id, ipp} = action.payload;
                Object.assign(state, {[turn_id]: {ipp: ipp}})
            },
            ...reducers,
        }
    })
};
