import { useEffect, useRef, useCallback } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export type OutboundMessage =
    | { type: "new" }
    | { type: "join"; payload: { game_ref: string } }
    | { type: "join"; payload: { token: string; game_ref: string } }
    | { type: "draft"; payload: { token: string; powers: string[] } };

export type InboundMessage =
    | {
          type: "init";
          payload: { token: string; game_ref: string; qr_code: string };
      }
    | {
          type: "join";
          payload: {
              token: string;
              game_ref: string;
              powers: { [key: string]: boolean };
          };
      }
    | { type: "update"; payload: { powers: { [key: string]: boolean } } };

type MessageHandler = (message: InboundMessage) => void;

export const useGameSocket = () => {
    const ws = useRef<ReconnectingWebSocket>();
    const messageHandlers = new Set<MessageHandler>();

    useEffect(() => {
        const options = {
            debug: false,
        };

        ws.current = new ReconnectingWebSocket(
            `ws://${import.meta.env.VITE_REACT_APP_HOST_WS}:${
                import.meta.env.VITE_REACT_APP_PORT_WS
            }/`,
            [],
            options
        );

        ws.current.onerror = (event) => console.error(event);
        ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            messageHandlers.forEach((handler) => handler(message));
        };

        const wsCurrent = ws.current;

        return () => wsCurrent.close();
    }, []);

    const addMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.add(handler);
    }, []);

    const removeMessageHandler = useCallback((handler: MessageHandler) => {
        messageHandlers.delete(handler);
    }, []);

    const sendMessage = useCallback((message: OutboundMessage) => {
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
