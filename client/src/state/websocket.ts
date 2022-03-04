import { useEffect, useRef, useCallback } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

type Message = { type: string, payload: unknown };
type MessageHandler = (message: Message) => void;

export const useGameSocket = () => {
    const ws = useRef<ReconnectingWebSocket>();
    const messageHandlers = new Set<MessageHandler>();

    useEffect(() => {
        const options = {
            debug: true
        };

        ws.current = new ReconnectingWebSocket(
            `ws://${process.env.REACT_APP_HOST_WS}:${process.env.REACT_APP_PORT_WS}/`,
            [],
            options
        );

        // ws.current.onopen = () => console.log("ws opened");
        // ws.current.onclose = () => console.log("ws closed");
        ws.current.onerror = (event) => console.error(event);
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            messageHandlers.forEach(handler => handler(message));
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    const addMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.add(handler)
    }, []);

    const removeMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.delete(handler)
    }, []);

    const sendMessage = useCallback((message: Message) => {
        if (!ws.current) {
            return;
        }
        ws.current.send(JSON.stringify(message));
    }, []);

    return {
        addMessageHandler,
        removeMessageHandler,
        sendMessage
    };
};
