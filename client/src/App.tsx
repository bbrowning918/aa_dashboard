import React, { useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { JoinGame } from "./pages/JoinGame";
import { NewGame } from "./pages/NewGame";
import { Draft } from "./pages/Draft";
import { Tracker } from "./pages/Tracker";

import { init, setToken, setPowers } from "./state/game";
import { useAppDispatch } from "./state/hooks";
import { useGameSocket, InboundMessage } from "./state/websocket";

export const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: InboundMessage) => {
        switch (message.type) {
            case "init":
                dispatch(init(message.payload));
                navigate(`${message.payload.game_ref}/tracker`);
                break;
            case "join":
                dispatch(setToken(message.payload));
                dispatch(setPowers(message.payload));
                navigate(`${message.payload.game_ref}/draft`);
                break;
            case "update":
                dispatch(setPowers(message.payload));
                console.log(message.payload);
                break;
        }
    }, []);

    return (
        <Routes>
            <Route path={"/"} element={<NewGame sendMessage={sendMessage} />} />
            <Route
                path={":gameId/join"}
                element={<JoinGame sendMessage={sendMessage} />}
            />
            <Route
                path={":gameId/draft"}
                element={<Draft sendMessage={sendMessage} />}
            />
            <Route path={":gameId/tracker"} element={<Tracker />} />
        </Routes>
    );
};
