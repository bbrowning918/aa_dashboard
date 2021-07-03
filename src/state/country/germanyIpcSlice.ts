import { countryIppSlice, IppState } from "./countryIppSlice";
import { RootState} from "../store";

const initialGermanyState: IppState = {
    0: { ipp: 20 },
};

const germanyIppSlice = countryIppSlice({
    name: 'germany',
    initialState: initialGermanyState,
    reducers: {},
});

export const selectGermanyIpp = (state: RootState) => state.germany;
export const { save: saveGermanyIpp } = germanyIppSlice.actions;
export const germanyIpcReducer = germanyIppSlice.reducer;
