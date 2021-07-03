import { countryIpcSlice, IpcState } from "./countryIpcSlice";
import { RootState} from "../store";

const initialGermanyState: IpcState = {
    0: { ipc: 20 },
};

const germanyIpcSlice = countryIpcSlice({
    name: 'germany',
    initialState: initialGermanyState,
    reducers: {},
});

export const selectGermanyIPC = (state: RootState) => state.germany;
export const { save: saveGermanyIpc } = germanyIpcSlice.actions;
export const germanyIpcReducer = germanyIpcSlice.reducer;
