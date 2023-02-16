import React, { useEffect } from "react";

import { useWebsocket } from "../Websocket";

import { CountryTable } from "../components/CountryTable";
import { Header } from "../components/Header";

import {
    selectConnected,
    selectGameId,
    selectQrCode,
    selectToken,
    setConnected,
} from "../state/game";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setTurns } from "../state/turn";
import { InboundMessage } from "../state/types";

export const Tracker = () => {
    const dispatch = useAppDispatch();

    const { send, addHandler, removeHandler } = useWebsocket();

    const qrCode = useAppSelector(selectQrCode);
    const token = useAppSelector(selectToken);
    const connected = useAppSelector(selectConnected);
    const gameId = useAppSelector(selectGameId);

    useEffect(() => {
        addHandler(handler);
        return () => removeHandler(handler);
    }, []);

    const handler = (message: InboundMessage) => {
        if (message.type === "connected") {
            dispatch(setConnected(message.payload));
            dispatch(setTurns(message.payload));
        }
        if (message.type === "update") {
            dispatch(setTurns(message.payload));
        }
    };

    useEffect(() => {
        if (!connected) {
            if (gameId) {
                token
                    ? send({
                          type: "join",
                          payload: {
                              token: token,
                              game_ref: gameId,
                          },
                      })
                    : send({
                          type: "join",
                          payload: { game_ref: gameId },
                      });
            }
        }
    }, [connected]);

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Header title="Tracker" />
            <CountryTable />
            {qrCode && (
                <img
                    className="absolute bottom-0 right-0 w-36 rounded-2xl border-gray-200 shadow-md"
                    src={`data:image/png;base64, ${qrCode}`}
                />
            )}
        </div>
    );
};
