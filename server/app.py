import asyncio
import secrets
import json
import logging

import websockets

from server import config
from server.domain.model import Game
from server.adapters.repository import TinyDBGameRepository
from server.services.qr import make_qr_code

connected = set()


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
    except Game.NotFound:
        await error(websocket, F"Game {game_ref} not found")
    else:
        async for message in websocket:
            msg = json.loads(message)
            logging.info(msg)

            # TODO can this be the spot to draft powers
            #  other clients will need to know which are available

            # TODO validate the callee and payload, host can do whatever
            #  update the game state
            #  send update

            event = {
                "type": "update",
                "payload": {
                    "turns": [
                        {
                            "year": turn.year,
                            "season": turn.season,
                            "power": turn.power,
                            "start": turn.start,
                            "spent": turn.spent,
                            "income": turn.income,
                        }
                        for turn in game.turns
                    ],
                },
            }
            websockets.broadcast(connected, json.dumps(event))


async def join(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
    except Game.NotFound:
        await error(websocket, F"Game {game_ref} not found")
        return

    connected.add(websocket)

    # TODO if the msg passes a token -> check it
    #  else produce a new one and figure out how to let them draft power(s)

    token = secrets.token_urlsafe(6)
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
        connected.remove(websocket)


async def start(websocket):
    token = secrets.token_urlsafe(6)
    game_ref = secrets.token_urlsafe(6)

    repo = TinyDBGameRepository(config.get_tinydb_path())
    game = Game(ref=game_ref, host=token)
    repo.add(game)

    qr_code = make_qr_code(
        f"http://{config.get_http_hostname()}:{config.get_http_port()}/{game.ref}/play"
    )

    event = {
        "type": "init",
        "payload": {"token": token, "game": game.ref, "qr_code": qr_code},
    }
    await websocket.send(json.dumps(event))


async def handler(websocket):
    async for message in websocket:
        event = json.loads(message)
        logging.debug(event)

        if event["type"] == "start":
            await start(websocket)
        elif event["type"] == "join":
            await join(websocket, event["payload"])


async def main():
    logging.basicConfig(level=config.get_logging_level())

    port = config.get_ws_port()
    async with websockets.serve(handler, "", port):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
