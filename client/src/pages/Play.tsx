import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Draft } from "../components/Draft";

import { Message, useGameSocket } from "../state/websocket";

export const Play = () => {
    const { gameId } = useParams();
    const [token, setToken] = useState("");
    const [powers, setPowers] = useState({});
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: "join", payload: { game_ref: gameId } });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        switch (message.type) {
            case "join":
                setToken(message.payload.token);
                setPowers(message.payload.powers);
                break;
            case "update":
                console.log("there was an update to the game state, save it");
                break;
        }
    }, []);

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Draft token={token} powers={powers} />
        </div>
    );
};
