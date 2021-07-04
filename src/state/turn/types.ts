import { Powers } from "../constants";
import { Power } from "../types";

import { Seasons } from "./constants";

export type Season = keyof typeof Seasons;

export type Turn = { start: number, spent?: number, income?: number };

export type TurnState = {
    [Powers.GERMANY]: {
        [turnId: number]: Turn,
    },
    [Powers.SOVIET_UNION]: {
        [turnId: number]: Turn,
    },
    [Powers.COMMUNIST_CHINA]: {
        [turnId: number]: Turn,
    },
    [Powers.JAPAN]: {
        [turnId: number]: Turn,
    },
    [Powers.UK_WEST]: {
        [turnId: number]: Turn,
    },
    [Powers.UK_EAST]: {
        [turnId: number]: Turn,
    },
    [Powers.ANZAC]: {
        [turnId: number]: Turn,
    },
    [Powers.FRANCE]: {
        [turnId: number]: Turn,
    },
    [Powers.ITALY]: {
        [turnId: number]: Turn,
    },
    [Powers.USA]: {
        [turnId: number]: Turn,
    },
    [Powers.NATIONALIST_CHINA]: {
        [turnId: number]: Turn,
    },
    ids: Array<number>,
    currentId: number,
    currentPower: Power,
}
