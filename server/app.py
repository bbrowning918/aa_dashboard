import asyncio
import secrets
import json

import websockets

import config
from domain.model import Game, Power
from services.qr import make_qr_code


async def play(websocket, game, connected):
    pass


async def join(websocket, game):
    pass


async def start(websocket):
    connected = {websocket}
    host_key = secrets.token_urlsafe(6)
    game_id = secrets.token_urlsafe(6)

    game = Game(
        id=game_id, host=host_key, clients={}, ipp={}, turn=0, power=Power.GERMANY
    )

    qr = make_qr_code(game_id)

    try:
        event = {"type": "init", "token": host_key, "game": game_id, "qr": qr}
        await websocket.send(json.dumps(event))
        await play(websocket, game, connected)
    finally:
        del game


async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)
        print(event)

        if event["type"] == "start":
            await start(websocket)


async def main():
    port = config.get_port()
    async with websockets.serve(handler, "", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
