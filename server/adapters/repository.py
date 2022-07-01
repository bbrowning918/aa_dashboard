import abc

from tinydb import TinyDB, Query

from server.domain.model import Game, Turn


class AbstractGameRepository(abc.ABC):
    @abc.abstractmethod
    def add(self, game: Game):
        raise NotImplementedError

    @abc.abstractmethod
    def get(self, game_ref: str) -> Game:
        raise NotImplementedError


class TinyDBGameRepository(AbstractGameRepository):
    def __init__(self, path):
        self.db = TinyDB(path)
        # TODO need UoW or context manager to close TinyDB

    def add(self, game: Game):
        document = {
            "ref": game.ref,
            "host": game.host,
            "clients": {},
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
            clients=document["clients"],
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
        )
