import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AuthState = {
    token: string;
};

const initialState: AuthState = { token: "" };

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state: AuthState, action: PayloadAction<any>) => {
            const token = action.payload.token;
            localStorage.setItem("token", token);
            state.token = token;
        },
        logout: (state: AuthState) => {
            localStorage.removeItem("token");
            state.token = "";
        },
    },
});

export const selectToken = (state: RootState) => state.auth.token;
export const selectIsLoggedIn = (state: RootState) => Boolean(state.auth.token);

export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
