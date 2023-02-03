import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import { App } from "./App";
import { store } from "./state/store";
import { WebsocketProvider } from "./Websocket";

import { ErrorBoundary } from "./ErrorBoundary";

createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <WebsocketProvider>
                        <App />
                    </WebsocketProvider>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
