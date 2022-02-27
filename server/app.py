import asyncio
import secrets
import json

import websockets

import config
from domain.model import Game
from adapters.repository import TinyDBGameRepository
from services.qr import make_qr_code

GAME_CONNECTIONS = dict()


async def error(websocket, message):
    event = {
        "type": "error",
        "message": message,
    }
    await websocket.send(json.dumps(event))


async def play(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
        connected = GAME_CONNECTIONS[game_ref]
    except KeyError:
        await error(websocket, "Game not found")
    else:
        async for message in websocket:
            event = json.loads(message)
            print(event)

            event = {
                "type": "update",
                "turns": [
                    {
                        "year": turn.year,
                        "season": turn.season.value,
                        "power": turn.power.value,
                        "start": turn.start,
                        "spent": turn.spent,
                        "income": turn.income
                    }
                    for turn in game.turns],
            }
            websockets.broadcast(connected, json.dumps(event))


async def watch(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
    except KeyError:
        await error(websocket, "Game not found")
        return
    event = {
        "type": "update",
        "turns": list(
            {
                "year": turn.year,
                "season": turn.season,
                "power": turn.power,
                "start": turn.start,
                "spent": turn.spent,
                "income": turn.income
            }
            for turn in game.turns),
    }
    await websocket.send(json.dumps(event))


async def join(websocket, game_ref):
    try:
        connected = GAME_CONNECTIONS[game_ref]
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
        await play(websocket, game_ref)
    finally:
        connected.remove(websocket)


async def start(websocket):
    token = secrets.token_urlsafe(6)
    game_ref = secrets.token_urlsafe(6)

    repo = TinyDBGameRepository(config.get_tinydb_path())
    game = Game(ref=game_ref, host=token)
    repo.add(game)

    GAME_CONNECTIONS[game.ref] = {websocket}

    qr_code = make_qr_code(
        f"http://{config.get_http_hostname()}:{config.get_http_port()}/{game.ref}/play"
    )

    event = {
        "type": "init",
        "payload": {"token": token, "game": game.ref, "qr_code": qr_code},
    }
    await websocket.send(json.dumps(event))
    await watch(websocket, game.ref)


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
