import asyncio
import secrets
import json

import websockets

import config
from domain.model import Game
from services.qr import make_qr_code

GAMES = {}


async def error(websocket, message):
    event = {
        "type": "error",
        "message": message,
    }
    await websocket.send(json.dumps(event))


async def play(websocket, game, connected):
    async for message in websocket:
        event = json.loads(message)
        print(event)

        event = {
            "type": "update",
            "ipp": [],
        }
        websockets.broadcast(connected, json.dumps(event))


async def watch(websocket, game_id):
    try:
        game, _ = GAMES[game_id]
    except KeyError:
        await error(websocket, "Game not found")
        return
    event = {
        "type": "update",
        "ipp": [],
    }
    await websocket.send(json.dumps(event))


async def join(websocket, game_id):
    try:
        game, connected = GAMES[game_id]
    except KeyError:
        await error(websocket, "Game not found")
        return

    token = secrets.token_urlsafe(6)
    connected.add(websocket)
    # TODO include powers in event and assign token for access
    try:
        event = {
            "type": "join",
            "token": token,
        }
        await websocket.send(json.dumps(event))
        await play(websocket, game, connected)
    finally:
        connected.remove(websocket)


async def start(websocket):
    token = secrets.token_urlsafe(6)
    game_id = secrets.token_urlsafe(6)

    connected = {websocket}
    game = Game(id=game_id, host=token, clients={}, ipp={}, turn=0)

    # TODO persist these
    GAMES[game.id] = game, connected

    qr_code = make_qr_code(
        f"http://{config.get_http_hostname()}:{config.get_http_port()}/{game_id}/play"
    )

    event = {
        "type": "init",
        "payload": {"token": token, "game": game.id, "qr_code": qr_code},
    }
    await websocket.send(json.dumps(event))
    await watch(websocket, game.id)


async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)
        print(event)
        if event["type"] == "start":
            await start(websocket)
        elif event["type"] == "watch":
            await watch(websocket, event["game"])
        elif event["type"] == "join":
            await join(websocket, event["game"])


async def main():
    port = config.get_ws_port()
    async with websockets.serve(handler, "", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
