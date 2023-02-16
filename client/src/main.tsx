import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { store } from "./state/store";
import { WebsocketProvider } from "./Websocket";

import { ErrorBoundary } from "./ErrorBoundary";
import { NewGame } from "./pages/NewGame";
import { JoinGame } from "./pages/JoinGame";
import { Draft } from "./pages/Draft";
import { Tracker } from "./pages/Tracker";

const routes = [
    { path: "/", element: <NewGame /> },
    { path: "/join/:gameId", element: <JoinGame /> },
    { path: "/draft", element: <Draft /> },
    { path: "/tracker", element: <Tracker /> },
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <WebsocketProvider>
                    <RouterProvider router={router} />
                </WebsocketProvider>
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);
