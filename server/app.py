import asyncio
import json
import secrets
import signal

import websockets

import config
from domain.model import Game, Turn
from adapters.repository import TinyDBGameRepository
from services.qr import make_qr_code
from services.new_game import new_game
from services.draft import draft
from services.submit_turn import submit_turn

connected = set()

logger = config.get_logger()


async def error(websocket, message):
    response = {
        "type": "error",
        "payload": message,
    }
    await websocket.send(json.dumps(response))


async def play(websocket, game_ref):
    async for event in websocket:
        message = json.loads(event)
        logger.info(F"message {message}")

        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)

        payload = message.get("payload")

        token = payload.get("token")
        if not token:
            await error(websocket, "token not found")
            return

        if message["type"] == "draft":
            draft(game, token, payload["powers"], TinyDBGameRepository())
        elif message["type"] == "turn":
            turn = Turn(**payload["turn"])
            submit_turn(game, token, turn, TinyDBGameRepository())
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
                "powers": {name: bool(token) for name, token in game.powers.items()}
            },
        }
        websockets.broadcast(connected, json.dumps(response))


async def join(websocket, payload):
    game_ref = payload.get("game_ref")
    if not game_ref:
        await error(websocket, "No game_ref found in payload")
        return

    try:
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)
    except Game.NotFound:
        await error(websocket, f"Game {payload['game_ref']} not found")
        return

    token = payload.get("token")
    if not token:
        token = secrets.token_urlsafe(4)

    connected.add(websocket)

    try:
        message = {
            "type": "connected",
            "payload": {
                "token": token,
                "game_ref": game_ref,
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
                "powers": {name: bool(token) for name, token in game.powers.items()}
            },
        }
        await websocket.send(json.dumps(message))
        await play(websocket, game_ref)
    finally:
        connected.remove(websocket)


async def new(websocket):
    game = new_game(TinyDBGameRepository())
    qr_code = make_qr_code(
        f"http://{config.get_http_hostname()}:{config.get_http_port()}/join/{game.ref}"
    )

    message = {
        "type": "init",
        "payload": {"token": game.host, "game_ref": game.ref, "qr_code": qr_code},
    }
    await websocket.send(json.dumps(message))


async def handler(websocket):
    async for event in websocket:
        message = json.loads(event)

        logger.info(F"event {message}")

        if message["type"] == "new":
            await new(websocket)
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
