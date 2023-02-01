import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { JoinGame } from "./pages/JoinGame";
import { NewGame } from "./pages/NewGame";
import { Draft } from "./pages/Draft";
import { Tracker } from "./pages/Tracker";

import { init, setToken, setPowers } from "./state/game";
import { useAppDispatch } from "./state/hooks";
import { InboundMessage } from "./state/types";
import { useWebSocket } from "./state/websocket";

export const App = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { send, addHandler, removeHandler } = useWebSocket();

    useEffect(() => {
        addHandler(handler);
        return () => removeHandler(handler);
    }, []);

    const handler = (message: InboundMessage) => {
        switch (message.type) {
            case "init":
                dispatch(init(message.payload));
                navigate(`${message.payload.game_ref}/tracker`);
                break;
            case "connected":
                dispatch(setToken(message.payload));
                dispatch(setPowers(message.payload));
                navigate(`${message.payload.game_ref}/draft`);
                break;
            case "update":
                dispatch(setPowers(message.payload));
                console.log(message.payload);
                break;
        }
    };

    return (
        <Routes>
            <Route path={"/"} element={<NewGame send={send} />} />
            <Route path={":gameId/join"} element={<JoinGame send={send} />} />
            <Route path={":gameId/draft"} element={<Draft send={send} />} />
            <Route path={":gameId/tracker"} element={<Tracker />} />
        </Routes>
    );
};
