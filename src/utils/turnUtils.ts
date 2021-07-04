import { Season } from "../redux/types";

import { Seasons, START_SEASON, START_YEAR } from "../redux/constants";

export const switchSeason = (season: Season): Season => {
    return season !== Seasons[Seasons.WINTER] ? Seasons.WINTER : Seasons.SUMMER;
};

export const findSeasonYearForTurnId = (turnId: number): string => {
    const season = turnId % 2 === 0 ? START_SEASON : switchSeason(START_SEASON);
    const year = START_YEAR + Math.ceil(turnId/2);
    return `${season} ${year}`;
};
