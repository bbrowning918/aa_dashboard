import { useEffect, useRef, useCallback } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

type Start = { type: "start"; payload: {} };
type Init = {
    type: "init";
    payload: { token: string; game_ref: string; qr_code: string };
};
type Join = { type: "join"; payload: { game_ref: string } };
type Rejoin = { type: "join"; payload: { token: string; game_ref: string } };
type Update = { type: "update"; payload: unknown };

export type Message = Start | Init | Join | Rejoin | Update;

type MessageHandler = (message: Message) => void;

export const useGameSocket = () => {
    const ws = useRef<ReconnectingWebSocket>();
    const messageHandlers = new Set<MessageHandler>();

    useEffect(() => {
        const options = {
            debug: true,
        };

        ws.current = new ReconnectingWebSocket(
            `ws://${import.meta.env.VITE_REACT_APP_HOST_WS}:${
                import.meta.env.VITE_REACT_APP_PORT_WS
            }/`,
            [],
            options
        );

        // ws.current.onopen = () => console.log("ws opened");
        // ws.current.onclose = () => console.log("ws closed");
        ws.current.onerror = (event) => console.error(event);
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            messageHandlers.forEach((handler) => handler(message));
        };

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    const addMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.add(handler);
    }, []);

    const removeMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.delete(handler);
    }, []);

    const sendMessage = useCallback((message: Message) => {
        if (!ws.current) {
            return;
        } else if (ws.current.readyState == WebSocket.CONNECTING) {
            ws.current?.addEventListener("open", () =>
                ws.current?.send(JSON.stringify(message))
            );
        } else {
            ws.current.send(JSON.stringify(message));
        }
    }, []);

    return {
        addMessageHandler,
        removeMessageHandler,
        sendMessage,
    };
};
