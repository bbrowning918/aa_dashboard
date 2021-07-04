import { Seasons, START_SEASON, START_YEAR } from "../redux/constants";
import * as utils from './turnUtils';

describe('switchSeason tests', () => {
    test('summer becomes winter', () => {
        expect(utils.switchSeason(Seasons.SUMMER)).toBe(Seasons.WINTER);
    });
    test('winter becomes summer', () => {
        expect(utils.switchSeason(Seasons.WINTER)).toBe(Seasons.SUMMER);
    });
});

describe('findSeasonYearForTurnId tests', () => {
    test('first turn is START_SEASON of START_YEAR', () => {
        expect(utils.findSeasonYearForTurnId(0)).toBe(`${START_SEASON} ${START_YEAR}`);
    })
    test('second turn is different START_SEASON of START_YEAR + 1', () => {
        expect(utils.findSeasonYearForTurnId(1)).toBe(`${utils.switchSeason(START_SEASON)} ${START_YEAR + 1}`);
    })
    test('third turn is START_SEASON of START_YEAR + 1', () => {
        expect(utils.findSeasonYearForTurnId(2)).toBe(`${START_SEASON} ${START_YEAR + 1}`);
    })
});