from collections import defaultdict
from operator import attrgetter
from secrets import token_urlsafe
from typing import Optional

from asgi_htmx import HtmxRequest as Request
from asgi_htmx import HtmxMiddleware
from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from jinja2_fragments.fastapi import Jinja2Blocks
from starlette.middleware.sessions import SessionMiddleware

import config
from domain.model import Game, Turn, Power
from adapters.repository import TinyDBGameRepository
from services.draft import draft
from services.qr import make_qr_code
from services.new_game import new_game

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.add_middleware(SessionMiddleware, secret_key="super_secret")
app.add_middleware(HtmxMiddleware)

templates = Jinja2Blocks(directory="templates")

logger = config.get_logger()


@app.get("/")
async def home(request: Request):
    if request.session.get("game_ref"):
        return RedirectResponse("/tracker")
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request
        }
    )


@app.get("/tracker")
async def tracker(request: Request):
    if game_ref := request.session.get("game_ref"):
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)
        qr_code = make_qr_code(
            f"http://{config.get_http_hostname()}:{config.get_http_port()}/join/?game_ref={game.ref}")
        block_name = "content" if request.scope["htmx"] else None

        powers = list(map(lambda p: p.value, Power))

        turns = defaultdict(dict)
        for turn in sorted(game.turns, key=attrgetter('year', 'season')):
            turns[f"{turn.year} {turn.season}"][turn.power] = turn

        logger.debug(powers)
        logger.debug(turns)

        return templates.TemplateResponse(
            "tracker.html",
            {
                "request": request,
                "qr_code": qr_code,
                "powers": powers,
                "turns": turns
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.get("/draft")
async def draft_list(request: Request):
    if game_ref := request.session.get("game_ref"):
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)

        def get_power_status(t):
            if t == request.session["token"]:
                return 1  # drafted
            if t:
                return 2  # unavailable
            return 0  # available

        powers = {name: get_power_status(token) for name, token in game.powers.items()}

        block_name = "content" if request.scope["htmx"] else None
        return templates.TemplateResponse(
            "draft.html",
            {
                "request": request,
                "powers": powers
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.post("/draft")
async def draft_powers(request: Request):
    form_data = await request.form()
    logger.debug(form_data)

    if game_ref := request.session.get("game_ref"):
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)

        drafted_powers = [p for p, _ in form_data.items()]
        draft(game, request.session["token"], drafted_powers, TinyDBGameRepository())

        def get_power_status(t):
            if t == request.session["token"]:
                return 1  # drafted
            if t:
                return 2  # unavailable
            return 0  # available

        powers = {name: get_power_status(token) for name, token in game.powers.items()}

        block_name = "content" if request.scope["htmx"] else None
        return templates.TemplateResponse(
            "draft.html",
            {
                "request": request,
                "powers": powers
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.get("/turns")
async def turns(request: Request):
    if game_ref := request.session.get("game_ref"):
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)

        def is_drafted_power(t):
            return t == request.session["token"]

        powers = [name for name, token in game.powers.items() if is_drafted_power(token)]

        # TODO need:
        #  current power
        #  current turn year + season
        #  and the next/prev drafted powers in order
        block_name = "content" if request.scope["htmx"] else None
        return templates.TemplateResponse(
            "turns.html",
            {
                "request": request,
                "powers": powers,
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.get("/settings")
async def settings(request: Request):
    if game_ref := request.session.get("game_ref"):
        block_name = "content" if request.scope["htmx"] else None
        token = request.session["token"]
        return templates.TemplateResponse(
            "settings.html",
            {
                "request": request,
                "token": token,
                "game_ref": game_ref
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.get("/new")
async def new(request: Request):
    game = new_game(TinyDBGameRepository())

    request.session["token"] = game.host
    request.session["game_ref"] = game.ref

    game_ref = request.session["game_ref"]
    token = request.session["token"]
    logger.debug(f"game_ref: {game_ref}, token: {token}")

    return RedirectResponse("/tracker")


@app.get("/join")
async def join(request: Request, game_ref: str):
    token = token_urlsafe(4)
    logger.debug(f"game_ref: {game_ref}, token: {token}")

    request.session["token"] = token
    request.session["game_ref"] = game_ref

    return RedirectResponse("/tracker")


@app.get("/leave")
async def leave(request: Request):
    request.session["game_ref"] = None
    request.session["token"] = None

    return RedirectResponse("/")
