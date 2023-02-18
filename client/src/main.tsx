import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import { store } from "./state/store";
import { WebsocketProvider } from "./Websocket";

import { ErrorBoundary } from "./ErrorBoundary";
import { Draft } from "./pages/Draft";
import { JoinGame } from "./pages/JoinGame";
import { NewGame } from "./pages/NewGame";
import { Settings } from "./pages/Settings";
import { Tracker } from "./pages/Tracker";

const routes = [
    { path: "/", element: <NewGame /> },
    { path: "/join/:gameId", element: <JoinGame /> },
    { path: "/draft", element: <Draft /> },
    { path: "/tracker", element: <Tracker /> },
    { path: "/settings", element: <Settings /> },
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
