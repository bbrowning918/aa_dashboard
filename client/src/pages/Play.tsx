import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Draft } from "../components/Draft";

import { selectToken, setToken } from "../state/game";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { InboundMessage, useGameSocket } from "../state/websocket";

export const Play = () => {
    const dispatch = useAppDispatch();
    const { gameId } = useParams();
    const token = useAppSelector(selectToken);
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    const [powers, setPowers] = useState({});

    useEffect(() => {
        if (gameId) {
            token
                ? sendMessage({
                      type: "join",
                      payload: { token: token, game_ref: gameId },
                  })
                : sendMessage({ type: "join", payload: { game_ref: gameId } });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: InboundMessage) => {
        switch (message.type) {
            case "join":
                dispatch(setToken(message.payload.token));
                setPowers(message.payload.powers);
                break;
            case "update":
                setPowers(message.payload.powers);
                break;
        }
    }, []);

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Draft
                powers={powers}
                draft={(powers: string[]) =>
                    sendMessage({
                        type: "draft",
                        payload: { token: token, powers: powers },
                    })
                }
            />
        </div>
    );
};
