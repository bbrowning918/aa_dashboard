import abc
from ..domain.model import Game, Turn

from tinydb import TinyDB
from tinydb.table import Document


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
        self.db.insert(Document(document, doc_id=hash(game)))

    def get(self, game_ref: str) -> Game:
        document = self.db.get(doc_id=hash(game_ref))
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
