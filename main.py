from collections import defaultdict
from functools import wraps
from operator import attrgetter
from secrets import token_urlsafe

import uvicorn
from asgi_htmx import HtmxMiddleware
from asgi_htmx import HtmxRequest as Request
from jinja2_fragments.fastapi import Jinja2Blocks
from starlette.applications import Starlette
from starlette.exceptions import HTTPException
from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware
from starlette.responses import RedirectResponse, Response
from starlette.routing import Mount, Route
from starlette.staticfiles import StaticFiles

import config
from adapters.repository import TinyDBGameRepository
from domain.model import Power, Turn
from services.draft import draft
from services.new_game import new_game
from services.qr import make_qr_code
from services.submit_turn import submit_turn as submit_turn_service

templates = Jinja2Blocks(directory="templates")

logger = config.get_logger()


def game_ref_required(func):
    @wraps(func)
    async def wrapper(request, *args, **kwargs):
        if "game_ref" not in request.session:
            return RedirectResponse("/")
        return await func(request, *args, **kwargs)

    return wrapper


async def home(request: Request):
    if request.session.get("game_ref"):
        return RedirectResponse(request.url_for("tracker"))
    return templates.TemplateResponse("home.html", {"request": request})


@game_ref_required
async def tracker(request: Request):
    with TinyDBGameRepository() as repo:
        game = repo.get(request.session["game_ref"])
    # TODO this will need to be hooked up to uvicorn
    qr_code = make_qr_code(
        f"http://{config.get_http_hostname()}:{config.get_http_port()}/join/?game_ref={game.ref}"
    )
    block_name = "content" if request.scope["htmx"] else None

    powers = list(map(lambda p: p.value, Power))

    turns = defaultdict(dict)
    for turn in sorted(game.turns, key=attrgetter("year", "season")):
        turns[f"{turn.year} {'Summer' if turn.season == 1 else 'Winter'}"][
            turn.power
        ] = turn

    logger.debug(powers)
    logger.debug(turns)

    return templates.TemplateResponse(
        "tracker.html",
        {"request": request, "qr_code": qr_code, "powers": powers, "turns": turns},
        block_name=block_name,
    )


@game_ref_required
async def draft_list(request: Request):
    with TinyDBGameRepository() as repo:
        game = repo.get(request.session["game_ref"])

    def get_power_status(t):
        if t == request.session["token"]:
            return 1  # drafted
        if t:
            return 2  # unavailable
        return 0  # available

    powers = {name: get_power_status(token) for name, token in game.powers.items()}

    block_name = "content" if request.scope["htmx"] else None
    return templates.TemplateResponse(
        "draft.html", {"request": request, "powers": powers}, block_name=block_name
    )


@game_ref_required
async def draft_powers(request: Request):
    form_data = await request.form()
    logger.debug(form_data)

    with TinyDBGameRepository() as repo:
        game = repo.get(request.session["game_ref"])

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
        "draft.html", {"request": request, "powers": powers}, block_name=block_name
    )


async def turns(request: Request):
    with TinyDBGameRepository() as repo:
        game = repo.get(request.session["game_ref"])

    power_param = request.query_params.get("power")
    power = Power(power_param) if power_param else None

    logger.debug(power)
    logger.debug(power_param)

    def is_drafted_power(t):
        return t == request.session["token"]

    powers = [name for name, token in game.powers.items() if is_drafted_power(token)]

    if is_drafted_power(game.powers.get(power)):
        current_power = powers[powers.index(power)]
        next_power = powers[(powers.index(power) + 1) % len(powers)]
        prev_power = powers[(powers.index(power) - 1) % len(powers)]
    elif not power:
        current_power = powers[0] if len(powers) > 0 else None
        next_power = powers[1] if len(powers) > 1 else None
        prev_power = powers[-1] if len(powers) > 1 else None
    else:
        return RedirectResponse(request.url_for("turns"))

    turns = [turn for turn in game.turns if turn.power == current_power]
    sorted_turns = sorted(turns, key=attrgetter("year", "season"))

    logger.debug(sorted_turns)

    block_name = "content" if request.scope["htmx"] else None
    return templates.TemplateResponse(
        "turns.html",
        {
            "request": request,
            "turn": sorted_turns[-1],
            "power": current_power,
            "next_power": request.url_for("turns").include_query_params(
                power=next_power
            )
            if next_power
            else None,
            "prev_power": request.url_for("turns").include_query_params(
                power=prev_power
            )
            if prev_power
            else None,
        },
        block_name=block_name,
    )


@game_ref_required
async def submit_turn(request: Request):
    with TinyDBGameRepository() as repo:
        game = repo.get(request.session["game_ref"])

    token = request.session["token"]

    form_data = await request.form()
    logger.debug([token, form_data])

    if token == game.powers.get(form_data["power"]):
        turn = Turn(
            year=int(form_data["year"]),
            season=1 if form_data["season"] == "Summer" else 2,
            power=form_data["power"],
            start=int(form_data["start"]),
            spent=int(form_data["spent"]),
            income=int(form_data["income"]),
        )

        # TODO validate there is no funny business with the start, spent and income

        submit_turn_service(
            game, request.session["token"], turn, TinyDBGameRepository()
        )

        # TODO figure out how best to set up the next turn
        response = Response()
        response.headers["hx-redirect"] = str(request.url_for("tracker"))
        return response

    raise HTTPException(
        status_code=403, detail="Can't submit for a power you didn't draft"
    )


async def settings(request: Request):
    game_ref = request.session["game_ref"]
    logger.info(game_ref)
    block_name = "content" if request.scope["htmx"] else None
    token = request.session["token"]
    return templates.TemplateResponse(
        "settings.html",
        {"request": request, "token": token, "game_ref": game_ref},
        block_name=block_name,
    )


async def new(request: Request):
    game = new_game(TinyDBGameRepository())
    logger.debug(f"game_ref: {game.ref}, token: {game.host}")

    request.session["token"] = game.host
    request.session["game_ref"] = game.ref

    return RedirectResponse(request.url_for("tracker"))


async def join(request: Request):
    game_ref = request.query_params.get("game_ref")
    token = token_urlsafe(4)
    logger.debug(f"game_ref: {game_ref}, token: {token}")

    request.session["token"] = token
    request.session["game_ref"] = game_ref

    return RedirectResponse(request.url_for("tracker"))


async def leave(request: Request):
    request.session["token"] = None
    request.session["game_ref"] = None

    return RedirectResponse(request.url_for("home"))


routes = [
    Mount("/static", StaticFiles(directory="static"), name="static"),
    Route("/", endpoint=home, methods=["GET"]),
    Route("/join", endpoint=join, methods=["GET"]),
    Route("/leave", endpoint=leave, methods=["GET"]),
    Route("/new", endpoint=new, methods=["GET"]),
    Route("/settings", endpoint=settings, methods=["GET"]),
    Route("/tracker", endpoint=tracker, methods=["GET"]),
    Route("/draft", endpoint=draft_list, methods=["GET"]),
    Route("/draft", endpoint=draft_powers, methods=["POST"]),
    Route("/turns", endpoint=turns, methods=["GET"]),
    Route("/turns", endpoint=submit_turn, methods=["POST"]),
]

middleware = [
    Middleware(SessionMiddleware, secret_key="super_secret"),
    Middleware(HtmxMiddleware),
]

app = Starlette(routes=routes, middleware=middleware)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=config.get_http_hostname(),
        port=config.get_http_port(),
        reload=True,
    )
