import asyncio
import secrets
import json
import logging

import websockets

from server import config
from server.domain.model import Game
from server.adapters.repository import TinyDBGameRepository
from server.services.qr import make_qr_code

GAME_CONNECTIONS = dict()


async def error(websocket, message):
    event = {
        "type": "error",
        "payload": message,
    }
    await websocket.send(json.dumps(event))


async def play(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
        connected = GAME_CONNECTIONS[game_ref]
    except Game.NotFound:
        await error(websocket, "Game not found")
    else:
        async for message in websocket:
            event = json.loads(message)

            # TODO validate the callee, the game state, and then broadcast update
            logging.debug(event)

            event = {
                "type": "update",
                "payload": {
                    "turns": [
                        {
                            "year": turn.year,
                            "season": turn.season.value,
                            "power": turn.power.value,
                            "start": turn.start,
                            "spent": turn.spent,
                            "income": turn.income,
                        }
                        for turn in game.turns
                    ],
                },
            }
            websockets.broadcast(connected, json.dumps(event))

            # TODO inside this play loop we need to handle who's turn it is, and set that in the game
            # decide if it needs to be sent to everyone or just the client whose turn it is


async def watch(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
    except Game.NotFound:
        await error(websocket, "Game not found")
        return
    event = {
        "type": "update",
        "payload": {
            "turns": list(
                {
                    "year": turn.year,
                    "season": turn.season,
                    "power": turn.power,
                    "start": turn.start,
                    "spent": turn.spent,
                    "income": turn.income,
                }
                for turn in game.turns
            ),
        },
    }
    # TODO if we add this socket, we can broadcast updates to them as they happen
    await websocket.send(json.dumps(event))


async def join(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
        # TODO persist connections in client game, unless we don't need them?
        # connected = GAME_CONNECTIONS[game_ref]
    except Game.NotFound:
        await error(websocket, "Game not found")
        return

    token = secrets.token_urlsafe(6)
    # connected.add(websocket)
    # TODO assign token for later access
    try:
        event = {
            "type": "join",
            "payload": {
                "token": token,
                "turns": list(
                    {
                        "year": turn.year,
                        "season": turn.season,
                        "power": turn.power,
                        "start": turn.start,
                        "spent": turn.spent,
                        "income": turn.income,
                    }
                    for turn in game.turns
                ),
            },
        }
        await websocket.send(json.dumps(event))
        await play(websocket, game_ref)
    finally:
        pass
        # connected.remove(websocket)


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
        logging.debug(event)

        if event["type"] == "start":
            await start(websocket)
        elif event["type"] == "watch":
            await watch(websocket, event["payload"])
        elif event["type"] == "join":
            await join(websocket, event["payload"])


async def main():
    logging.basicConfig(level=config.get_logging_level())

    port = config.get_ws_port()
    async with websockets.serve(handler, "", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
