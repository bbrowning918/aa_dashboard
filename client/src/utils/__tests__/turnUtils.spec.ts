import { assert, expect, test } from 'vitest';

import { Seasons, START_SEASON, START_YEAR } from "../../state/constants";
import * as utils from "../turnUtils";

test("switchSeason tests", () => {
    test("summer becomes winter", () => {
        expect(utils.switchSeason(Seasons.SUMMER)).toEqual(Seasons.WINTER);
    });
    test("winter becomes summer", () => {
        expect(utils.switchSeason(Seasons.WINTER)).toEqual(Seasons.SUMMER);
    });
});

test("findSeasonYearForTurnId tests", () => {
    test("first turn is START_SEASON of START_YEAR", () => {
        expect(utils.findSeasonYearForTurnId(0)).toEqual(
            `${START_SEASON} ${START_YEAR}`
        );
    });
    test("second turn is different START_SEASON of START_YEAR + 1", () => {
        expect(utils.findSeasonYearForTurnId(1)).toEqual(
            `${utils.switchSeason(START_SEASON)} ${START_YEAR + 1}`
        );
    });
    test("third turn is START_SEASON of START_YEAR + 1", () => {
        expect(utils.findSeasonYearForTurnId(2)).toEqual(
            `${START_SEASON} ${START_YEAR + 1}`
        );
    });
});
