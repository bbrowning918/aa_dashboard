from asgi_htmx import HtmxRequest as Request
from asgi_htmx import HtmxMiddleware
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from jinja2_fragments.fastapi import Jinja2Blocks
from starlette.middleware.sessions import SessionMiddleware

import config
from domain.model import Game, Turn
from adapters.repository import TinyDBGameRepository
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
    if game_ref := request.session["game_ref"]:
        return RedirectResponse("/tracker")
    return templates.TemplateResponse(
        "home.html",
        {
            "request": request
        }
    )

@app.get("/tracker")
async def tracker(request: Request):
    if game_ref := request.session["game_ref"]:
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)
        qr_code = make_qr_code(f"http://{config.get_http_hostname()}:{config.get_http_port()}/join/?game_ref={game.ref}")
        block_name = "content" if request.scope["htmx"] else None
        return templates.TemplateResponse(
            "tracker.html",
            {
                "request": request,
                "qr_code": qr_code,
                "powers": game.powers,
                "turns": game.turns
            },
            block_name=block_name
        )
    return RedirectResponse("/")


@app.get("/draft")
async def tracker(request: Request):
    if game_ref := request.session["game_ref"]:
        with TinyDBGameRepository() as repo:
            game = repo.get(game_ref)
        
        powers = {name: bool(token) for name, token in game.powers.items()}
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


@app.get("/new")
async def new(request: Request):
    assert(htmx := request.scope["htmx"])

    game = new_game(TinyDBGameRepository())

    request.session["token"] = game.host
    request.session["game_ref"] = game.ref


    game_ref = request.session["game_ref"]
    token = request.session["token"]
    logger.debug(f"game_ref: {game_ref}, token: {token}")

    return RedirectResponse("/tracker")


@app.get("/join")
async def join(request: Request, game_ref: str):
    assert(htmx := request.scope["htmx"])

    token = None  # TODO
    logger.debug(f"game_ref: {game_ref}, token: {token}")

    request.session["game_ref"] = game_ref
   
    return RedirectResponse("/tracker")


@app.get("/leave")
async def leave(request: Request):
    # assert(htmx := request.scope["htmx"])

    request.session["game_ref"] = None
    request.session["token"] = None
    
    return RedirectResponse("/")

