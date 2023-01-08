import abc

from tinydb import TinyDB, Query

import config
from domain.model import Game, Turn


class AbstractGameRepository(abc.ABC):
    @abc.abstractmethod
    def add(self, game: Game):
        raise NotImplementedError

    @abc.abstractmethod
    def get(self, game_ref: str) -> Game:
        raise NotImplementedError

    @abc.abstractmethod
    def update(self, game: Game):
        raise NotImplementedError


DEFAULT_PATH = config.get_tinydb_path()


class TinyDBGameRepository(AbstractGameRepository):
    def __init__(self, path=DEFAULT_PATH):
        self.db = TinyDB(path, sort_keys=True, indent=2)

    def add(self, game: Game):
        document = {
            "ref": game.ref,
            "host": game.host,
            "turns": [
                {
                    "year": turn.year,
                    "season": turn.season.value,
                    "power": turn.power.value,
                    "start": turn.start,
                    "spent": turn.spent,
                    "income": turn.income,
                }
                for turn in game.turns
            ],
            "powers": {name: token for name, token in game.powers.items()}

        }
        self.db.insert(document)
        self.db.close()

    def get(self, game_ref: str) -> Game:
        game = Query()
        document = self.db.get(game.ref == game_ref)
        self.db.close()

        if not document:
            raise Game.NotFound
        return Game(
            ref=document["ref"],
            host=document["host"],
            turns={
                Turn(
                    year=turn["year"],
                    season=turn["season"],
                    power=turn["power"],
                    start=turn["start"],
                    spent=turn["spent"],
                    income=turn["income"],
                )
                for turn in document["turns"]
            },
            powers={name: token for name, token in document["powers"].items()}
        )

    def update(self, game: Game):
        query = Query()
        self.db.update({
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
            "powers": {name: token for name, token in game.powers.items()}
        }, query.ref == game.ref)
