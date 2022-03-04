from __future__ import annotations
from dataclasses import dataclass
from enum import Enum
from typing import Dict, Set


class Power(Enum):
    GERMANY = "Germany"
    SOVIET_UNION = "Soviet Union"
    COMMUNIST_CHINA = "Communist China"
    JAPAN = "Japan"
    UK_WEST = "UK West"
    UK_EAST = "UK East"
    ANZAC = "ANZAC"
    FRANCE = "France"
    ITALY = "Italy"
    USA = "United States"
    NATIONALIST_CHINA = "Nationalist China"


class Season(Enum):
    SUMMER = "Summer"
    WINTER = "Winter"


@dataclass(frozen=True)
class Player:
    token: str
    controlled_powers: Set[Power]


class Turn:
    def __init__(self, year: int, season: Season, power: Power, start: int, spent: int = 0, income: int = 0):
        self.year = year
        self.season = season
        self.power = power
        self.start = start
        self.spent = spent
        self.income = income

    def __repr__(self):
        return f"<Turn {self.year} {self.season.value} {self.power.value}>"

    def __hash__(self):
        return hash((self.year, self.season, self.power))

    def __eq__(self, other):
        if not isinstance(other, Turn):
            return False
        return all(
            [
                self.year == other.year,
                self.season == other.season,
                self.power == other.power,
            ]
        )


class Game:
    ref: str
    host: str
    clients: Dict[str, Player]
    turns: Set[Turn]

    def __init__(self, ref: str, host: str, clients=None, turns=None):
        self.ref = ref
        self.host = host

        if clients is None:
            self.clients = dict()
        else:
            self.clients = clients

        if turns is None:
            self.turns = first_turn()
        else:
            self.turns = turns

    def __repr__(self):
        return f"<Game {self.ref}>"

    def __hash__(self):
        return hash(self.ref)

    def __eq__(self, other):
        if not isinstance(other, Game):
            return False
        return self.ref == other.ref

    class NotFound(Exception):
        pass


def first_turn():
    year = 1936
    season = Season.SUMMER
    return {
        Turn(year=year, season=season, power=Power.GERMANY, start=20),
        Turn(year=year, season=season, power=Power.SOVIET_UNION, start=8),
        Turn(year=year, season=season, power=Power.COMMUNIST_CHINA, start=2),
        Turn(year=year, season=season, power=Power.JAPAN, start=16),
        Turn(year=year, season=season, power=Power.UK_WEST, start=11),
        Turn(year=year, season=season, power=Power.UK_EAST, start=5),
        Turn(year=year, season=season, power=Power.ANZAC, start=3),
        Turn(year=year, season=season, power=Power.FRANCE, start=5),
        Turn(year=year, season=season, power=Power.ITALY, start=7),
        Turn(year=year, season=season, power=Power.USA, start=6),
        Turn(year=year, season=season, power=Power.NATIONALIST_CHINA, start=6),
    }
