import { countryIpcSlice, IpcState } from "./countryIpcSlice";
import { RootState } from "../store";

const initialSovietState: IpcState = {
    0: { ipc: 8 },
};

const sovietIpcSlice = countryIpcSlice({
    name: 'soviet',
    initialState: initialSovietState,
    reducers: {},
});

export const selectSovietIPC = (state: RootState) => state.soviets;
export const { save: saveSovietIpc } = sovietIpcSlice.actions;
export const sovietIpcReducer = sovietIpcSlice.reducer;
