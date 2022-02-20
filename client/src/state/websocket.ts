type Message = { type: string, payload: any[] };
type MessageHandler = (message: Message) => void;

export const messageHandlers = new Set<MessageHandler>();

export const addMessageHandler = (handler: MessageHandler) => {
    messageHandlers.add(handler)
}

export const removeMessageHandler = (handler: MessageHandler) => {
    messageHandlers.delete(handler)
}

export const websocket = new WebSocket(
    `ws://${process.env.REACT_APP_HOST_WS}:${process.env.REACT_APP_PORT_WS}/`
);

websocket.onopen = () => console.log("ws opened");
websocket.onclose = () => console.log("ws closed");
websocket.onerror = (event) => console.error(event);
websocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    messageHandlers.forEach(handler => handler(message));
}


