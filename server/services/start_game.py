import secrets

from domain.model import Game
from adapters.repository import AbstractGameRepository


def start_game(repo: AbstractGameRepository) -> Game:
    with repo:
        token = secrets.token_urlsafe(4)
        game_ref = secrets.token_urlsafe(4)
        game = Game(ref=game_ref, host=token)
        repo.add(game)

        return game
