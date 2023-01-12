import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "./index.css";

import { App } from "./App";
import { store } from "./state/store";

import { ErrorBoundary } from "./ErrorBoundary";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    spacing: 8,
});

createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline/>
                        <App/>
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
