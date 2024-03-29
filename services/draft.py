from typing import List

from domain.model import Game, Power
from adapters.repository import AbstractGameRepository


def draft(
        game: Game,
        token: str,
        powers: List[Power],
        repo: AbstractGameRepository
) -> None:
    with repo:
        game.draft(token, powers)
        repo.update(game)
