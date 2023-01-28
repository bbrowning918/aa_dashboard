import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../state/hooks";
import { selectQrCode, selectToken } from "../state/game";
import { Message, useGameSocket } from "../state/websocket";
import { selectCurrentTurnId } from "../state/ipp";

import { CountryTable } from "../components/CountryTable";

import { findSeasonYearForTurnId } from "../utils/turnUtils";

export const Tracker = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: "join", payload: { token: token, game_ref: gameId } });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        if (message.type === "update") {
            console.log("there was an update to the game state, save it");
        }
    }, []);

    return (
            <div className="h-screen bg-white dark:bg-gray-900">
                <nav className="mb-4 rounded-b-lg border-gray-200 bg-blue-700 p-4 shadow-md">
                    <div className="flex flex-wrap items-center items-center justify-between">
                        <h1 className="title-font text-xl font-medium text-white sm:text-2xl">
                            {findSeasonYearForTurnId(currentTurnId)}
                        </h1>
                </div>
            </nav>
            <CountryTable />
            <img
                className="absolute bottom-0 right-0 w-36 rounded-2xl border-gray-200 shadow-md"
                src={`data:image/png;base64, ${qrCode}`}
            />
        </div>
    );
};
