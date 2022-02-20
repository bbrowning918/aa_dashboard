import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import { App } from "./App";
import { store } from "./state/store";

import { ErrorBoundary } from "./ErrorBoundary";


ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById("root")
);
