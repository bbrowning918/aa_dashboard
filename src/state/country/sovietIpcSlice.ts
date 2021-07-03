import { countryIppSlice, IppState } from "./countryIppSlice";
import { RootState } from "../store";

const initialSovietState: IppState = {
    0: { ipp: 8 },
};

const sovietIppSlice = countryIppSlice({
    name: 'soviet',
    initialState: initialSovietState,
    reducers: {},
});

export const selectSovietIpp = (state: RootState) => state.soviets;
export const { save: saveSovietIpp } = sovietIppSlice.actions;
export const sovietIpcReducer = sovietIppSlice.reducer;
