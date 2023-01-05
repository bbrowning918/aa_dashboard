import asyncio
import json
import secrets
import signal

import websockets

import config
from domain.model import Game
from adapters.repository import TinyDBGameRepository
from services.qr import make_qr_code

connected = set()

logger = config.get_logger()


async def error(websocket, message):
    response = {
        "type": "error",
        "payload": message,
    }
    await websocket.send(json.dumps(response))


async def play(websocket, game_ref):
    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(game_ref)
    except Game.NotFound:
        await error(websocket, f"Game {game_ref} not found")
    else:
        async for event in websocket:
            message = json.loads(event)
            logger.info(F"message {message}")

            # TODO if we did not find a token, close

            if message["type"] == "draft":
                # TODO type draft powers for the given (non-host) token
                pass
            elif message["type"] == "turn":
                # TODO this token drafted the given power, accept the turn for it
                pass
            else:
                await error(websocket, "unrecognized message type")
                return

            response = {
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
                    "powers": {name: token for name, token in game.powers.items() if token is ''}
                },
            }
            websockets.broadcast(connected, json.dumps(response))


async def join(websocket, payload):
    game_ref = payload.get("game_ref")
    if not game_ref:
        await error(websocket, "No game_ref found in payload")
        return

    try:
        repo = TinyDBGameRepository(config.get_tinydb_path())
        game = repo.get(payload["game_ref"])
    except Game.NotFound:
        await error(websocket, f"Game {payload['game_ref']} not found")
        return

    token = payload.get("token")
    if not token:
        token = secrets.token_urlsafe(6)

    connected.add(websocket)

    try:
        message = {
            "type": "join",
            "payload": {
                "token": token,
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
                "powers": {name: token for name, token in game.powers.items() if token is ''}
            },
        }
        await websocket.send(json.dumps(message))
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

    message = {
        "type": "init",
        "payload": {"token": token, "game_ref": game.ref, "qr_code": qr_code},
    }
    await websocket.send(json.dumps(message))


async def handler(websocket):
    async for event in websocket:
        message = json.loads(event)

        logger.info(F"event {message}")

        if message["type"] == "start":
            await start(websocket)
        elif message["type"] == "join":
            await join(websocket, message["payload"])
        else:
            await error(websocket, "unrecognized message type")


async def main():
    loop = asyncio.get_running_loop()
    stop = loop.create_future()
    loop.add_signal_handler(signal.SIGTERM, stop.set_result, None)
    loop.add_signal_handler(signal.SIGINT, stop.set_result, None)

    port = config.get_ws_port()
    async with websockets.serve(handler, "", port):
        await stop


if __name__ == "__main__":
    asyncio.run(main())
