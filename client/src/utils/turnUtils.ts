import { Season } from "../state/types";

import { Seasons, START_SEASON, START_YEAR } from "../state/constants";

export const switchSeason = (season: Season): Season => {
    return season == Seasons.WINTER ? Seasons.SUMMER : Seasons.WINTER;
};

export const findSeasonYearForTurnId = (turnId: number): string => {
    const season = turnId % 2 === 0 ? START_SEASON : switchSeason(START_SEASON);
    const year = START_YEAR + Math.ceil(turnId / 2);
    return `${season} ${year}`;
};
