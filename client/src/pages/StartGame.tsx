import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Message, useGameSocket } from "../state/websocket";
import { useAppDispatch } from "../state/hooks";
import { init } from "../state/game";

export const StartGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    const handler = useCallback((message: Message) => {
        if (message.type === "init") {
            dispatch(init(message.payload));
            // @ts-ignore
            navigate(`${message.payload.game_ref}/tracker`);
        }
    }, []);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    return (
        <div className="container mx-auto py-24">
            <h1 className="title-font mb-12 text-center text-2xl font-medium text-gray-900 sm:text-3xl">
                Global War 1936
            </h1>
            <div className="mx-auto flex max-w-xs flex-col justify-center">
                <button
                    className="rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                    onClick={() =>
                        sendMessage({ type: "start", payload: null })
                    }
                >
                    Start Game
                </button>
            </div>
        </div>
    );
};
