from domain.model import Game, Turn
from adapters.repository import AbstractGameRepository


def submit_turn(
        game: Game,
        token: str,
        turn: Turn,
        repo: AbstractGameRepository
) -> None:
    with repo:
        game.submit_turn(token, turn)
        repo.update(game)
