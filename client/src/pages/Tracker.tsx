import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { selectQrCode } from "../state/game";
import { Message, useGameSocket } from "../state/websocket";

export const Tracker = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: "join", payload: gameId });
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
        <>
            <nav className="rounded-b-lg border-gray-200 bg-blue-600 p-4">
                <div className="container flex flex-wrap items-center">
                    <h1 className="title-font text-xl font-medium text-white sm:text-2xl">
                        {findSeasonYearForTurnId(currentTurnId)}
                    </h1>
                </div>
            </nav>
            <CountryTable />
            <div className="absolute bottom-0 right-0 w-36 rounded-2xl border-gray-200 shadow-md">
                <img src={`data:image/png;base64, ${qrCode}`} />
            </div>
        </>
    );
};
