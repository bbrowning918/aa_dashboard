from __future__ import annotations
from dataclasses import dataclass
from enum import Enum
from typing import List, Dict

powers = [
    "GERMANY",
    "SOVIET_UNION",
    "COMMUNIST_CHINA",
    "JAPAN",
    "UK_WEST",
    "UK_EAST",
    "ANZAC",
    "FRANCE",
    "ITALY",
    "USA",
    "NATIONALIST_CHINA",
]
Power = Enum("Power", powers)

TurnOrder = [
    Power.GERMANY,
    Power.SOVIET_UNION,
    Power.COMMUNIST_CHINA,
    Power.JAPAN,
    Power.UK_WEST,
    Power.UK_EAST,
    Power.ANZAC,
    Power.FRANCE,
    Power.ITALY,
    Power.USA,
    Power.NATIONALIST_CHINA,
]

Season = Enum("Season", "Summer Winter")


@dataclass()
class Player:
    token: str
    controlled_powers: List[Power]


@dataclass()
class Turn:
    id: int
    start: int
    spent: int
    income: int


@dataclass()
class Game:
    id: str
    host: str
    clients: Dict[str, Player]
    ipp: Dict[Power, List[Turn]]
    turn: int
