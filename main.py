from collections import defaultdict
from operator import attrgetter
from secrets import token_urlsafe

from asgi_htmx import HtmxMiddleware
from asgi_htmx import HtmxRequest as Request
from fastapi import FastAPI, Depends
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles
from jinja2_fragments.fastapi import Jinja2Blocks
from starlette.middleware.sessions import SessionMiddleware

import config
from adapters.repository import TinyDBGameRepository
from domain.model import Power
from services.draft import draft
from services.new_game import new_game
from services.qr import make_qr_code

app = FastAPI()
app.mount('/static', StaticFiles(directory='static'), name='static')
app.add_middleware(SessionMiddleware, secret_key='super_secret')
app.add_middleware(HtmxMiddleware)

templates = Jinja2Blocks(directory='templates')

logger = config.get_logger()


class MissingGameRefException(Exception):
    pass


@app.exception_handler(MissingGameRefException)
async def missing_game_ref_exception_handler(request: Request, exc: MissingGameRefException):
    return RedirectResponse('/')


async def has_game_ref(request: Request):
    if not request.session.get('game_ref'):
        raise MissingGameRefException


@app.get('/')
async def home(request: Request):
    if request.session.get('game_ref'):
        return RedirectResponse(request.url_for('tracker'))
    return templates.TemplateResponse(
        'home.html',
        {
            'request': request
        }
    )


@app.get('/tracker', dependencies=[Depends(has_game_ref)])
async def tracker(request: Request):
    game_ref = request.session.get('game_ref')
    with TinyDBGameRepository() as repo:
        game = repo.get(game_ref)
    # TODO this will need to be hooked up to uvicorn
    qr_code = make_qr_code(
        f'http://{config.get_http_hostname()}:{config.get_http_port()}/join/?game_ref={game.ref}')
    block_name = 'content' if request.scope['htmx'] else None

    powers = list(map(lambda p: p.value, Power))

    turns = defaultdict(dict)
    for turn in sorted(game.turns, key=attrgetter('year', 'season')):
        turns[f'{turn.year} {turn.season}'][turn.power] = turn

    logger.debug(powers)
    logger.debug(turns)

    return templates.TemplateResponse(
        'tracker.html',
        {
            'request': request,
            'qr_code': qr_code,
            'powers': powers,
            'turns': turns
        },
        block_name=block_name
    )


@app.get('/draft', dependencies=[Depends(has_game_ref)])
async def draft_list(request: Request):
    game_ref = request.session.get('game_ref')
    with TinyDBGameRepository() as repo:
        game = repo.get(game_ref)

    def get_power_status(t):
        if t == request.session['token']:
            return 1  # drafted
        if t:
            return 2  # unavailable
        return 0  # available

    powers = {name: get_power_status(token) for name, token in game.powers.items()}

    block_name = 'content' if request.scope['htmx'] else None
    return templates.TemplateResponse(
        'draft.html',
        {
            'request': request,
            'powers': powers
        },
        block_name=block_name
    )


@app.post('/draft', dependencies=[Depends(has_game_ref)])
async def draft_powers(request: Request):
    form_data = await request.form()
    logger.debug(form_data)

    game_ref = request.session.get('game_ref')
    with TinyDBGameRepository() as repo:
        game = repo.get(game_ref)

    drafted_powers = [p for p, _ in form_data.items()]
    draft(game, request.session['token'], drafted_powers, TinyDBGameRepository())

    def get_power_status(t):
        if t == request.session['token']:
            return 1  # drafted
        if t:
            return 2  # unavailable
        return 0  # available

    powers = {name: get_power_status(token) for name, token in game.powers.items()}

    block_name = 'content' if request.scope['htmx'] else None
    return templates.TemplateResponse(
        'draft.html',
        {
            'request': request,
            'powers': powers
        },
        block_name=block_name
    )


@app.get('/turns', dependencies=[Depends(has_game_ref)])
async def turns(request: Request, power: Power = None):
    game_ref = request.session.get('game_ref')
    with TinyDBGameRepository() as repo:
        game = repo.get(game_ref)

    def is_drafted_power(t):
        return t == request.session['token']

    powers = [name for name, token in game.powers.items() if is_drafted_power(token)]

    if power and is_drafted_power(game.powers[power]):  # TODO fail non-silently
        current_power = powers[powers.index(power)]
        next_power = powers[(powers.index(power) + 1) % len(powers)]
        prev_power = powers[(powers.index(power) - 1) % len(powers)]
    else:  # TODO handle no powers drafted and less than 3 drafted
        current_power = powers[0]
        next_power = powers[1]
        prev_power = powers[-1]

    # TODO need current turn year + season
    block_name = 'content' if request.scope['htmx'] else None
    return templates.TemplateResponse(
        'turns.html',
        {
            'request': request,
            'power': current_power,
            'next_power': request.url_for('turns').include_query_params(power=next_power) if next_power else None,
            'prev_power': request.url_for('turns').include_query_params(power=prev_power) if prev_power else None,
        },
        block_name=block_name
    )


@app.post('/turns', dependencies=[Depends(has_game_ref)])
async def submit_turn(request: Request):
    # TODO check that:
    #  token can access power
    #  turn is valid
    #  turn is not duplicate
    pass


@app.get('/settings', dependencies=[Depends(has_game_ref)])
async def settings(request: Request):
    game_ref = request.session.get('game_ref')
    block_name = 'content' if request.scope['htmx'] else None
    token = request.session['token']
    return templates.TemplateResponse(
        'settings.html',
        {
            'request': request,
            'token': token,
            'game_ref': game_ref
        },
        block_name=block_name
    )


@app.get('/new')
async def new(request: Request):
    game = new_game(TinyDBGameRepository())
    logger.debug(f'game_ref: {game.ref}, token: {game.host}')

    request.session['token'] = game.host
    request.session['game_ref'] = game.ref

    return RedirectResponse(request.url_for('tracker'))


@app.get('/join')
async def join(request: Request, game_ref: str):
    token = token_urlsafe(4)
    logger.debug(f'game_ref: {game_ref}, token: {token}')

    request.session['token'] = token
    request.session['game_ref'] = game_ref

    return RedirectResponse(request.url_for('tracker'))


@app.get('/leave')
async def leave(request: Request):
    request.session['token'] = None
    request.session['game_ref'] = None

    return RedirectResponse(request.url_for('home'))
