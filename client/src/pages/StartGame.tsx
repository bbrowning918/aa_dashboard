import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { InboundMessage, useGameSocket } from "../state/websocket";
import { useAppDispatch } from "../state/hooks";
import { init } from "../state/game";

export const StartGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    const handler = useCallback((message: InboundMessage) => {
        if (message.type === "init") {
            dispatch(init(message.payload));
            navigate(`${message.payload.game_ref}/tracker`);
        }
    }, []);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 sm:py-16 lg:px-6">
                <div className="mx-auto h-screen max-w-screen-sm text-center">
                    <h1 className="title-font mb-12 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Global War 1936
                    </h1>
                    <button
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() =>
                            sendMessage({ type: "start", payload: {} })
                        }
                    >
                        Start Game
                    </button>
                </div>
            </div>
        </div>
    );
};
