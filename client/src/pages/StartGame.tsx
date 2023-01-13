import React, { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Message, useGameSocket } from '../state/websocket';
import { useAppDispatch } from '../state/hooks';
import { init } from '../state/game';


export const StartGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const handler = useCallback((message: Message) => {
        if (message.type === 'init') {
            dispatch(init(message.payload));
            // @ts-ignore
            navigate(`${message.payload.game_ref}/tracker`)
        }
    }, []);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    return (
        <div className="container py-24 mx-auto">
            <h1 className="text-center mb-12 sm:text-3xl text-2xl font-medium title-font text-gray-900">Global War 1936</h1>
            <div className="flex justify-center flex-col mx-auto max-w-xs">
                <button
                    className="text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-800 rounded text-lg"
                    onClick={() => sendMessage({ type: 'start', payload: null })}
                >Start Game</button>
            </div>
        </div>
    );
};
