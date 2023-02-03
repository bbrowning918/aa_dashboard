import {
    useEffect,
    useRef,
    createContext,
    useContext,
    FC,
    ReactNode,
} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

import { WS_HOST, WS_PORT } from "./state/constants";

import { OutboundMessage, MessageHandler } from "./state/types";

export const useWebsocket = () => {
    const context = useContext(WebsocketContext);
    if (!context) {
        throw new Error("useWebsocket msut be used within a WebsocketProvider");
    }
    return context;
};

interface WebsocketContextType {
    send: (arg0: OutboundMessage) => void;
    addHandler: (arg0: MessageHandler) => void;
    removeHandler: (arg0: MessageHandler) => void;
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

interface WebsocketProviderProps {
    children: ReactNode;
}

export const WebsocketProvider: FC<WebsocketProviderProps> = ({ children }) => {
    const websocket = useRef<ReconnectingWebSocket>();
    const messageHandlers = new Set<MessageHandler>();

    useEffect(() => {
        const ws = new ReconnectingWebSocket(
            `ws://${WS_HOST}:${WS_PORT}/`,
            [],
            {
                debug: true,
            }
        );

        ws.onerror = (event) => console.error(event);
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            messageHandlers.forEach((handler) => handler(message));
        };
        websocket.current = ws;

        return () => ws.close();
    }, []);

    const addHandler = (handler: MessageHandler) => {
        messageHandlers.add(handler);
    };

    const removeHandler = (handler: MessageHandler) => {
        messageHandlers.delete(handler);
    };

    const send = (message: OutboundMessage) => {
        if (!websocket.current) {
            return;
        } else if (websocket.current?.readyState == WebSocket.CONNECTING) {
            websocket.current?.addEventListener("open", () =>
                websocket.current?.send(JSON.stringify(message))
            );
        } else {
            websocket.current?.send(JSON.stringify(message));
        }
    };

    return (
        <WebsocketContext.Provider value={{ send, addHandler, removeHandler }}>
            {children}
        </WebsocketContext.Provider>
    );
};
