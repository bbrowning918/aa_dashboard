import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { selectQrCode } from '../state/game';
import { Message, useGameSocket } from '../state/websocket';


export const Tracker = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: 'join', payload: gameId });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        if (message.type === 'update') {
            console.log("there was an update to the game state, save it")
        }
    }, []);

    return (
        <>
            <nav className="p-4 border-gray-200 rounded-b-lg bg-blue-600">
                <div className="container flex flex-wrap items-center">
                    <h1 className="sm:text-2xl text-xl font-medium title-font text-white">{findSeasonYearForTurnId(currentTurnId)}</h1>
                </div>
            </nav>
            <CountryTable/>
            <div className="w-36 border-gray-200 rounded-2xl shadow-md absolute bottom-0 right-0">
                <img src={`data:image/png;base64, ${qrCode}`}/>
            </div>
        </>
    );
};
