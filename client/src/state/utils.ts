import { Season } from "./types";

import { Seasons, START_SEASON, START_YEAR } from "./constants";

export const rehydrateLocalStorage = (
    key: string,
    defaultValue: object | string | unknown[]
) => {
    const item = localStorage.getItem(key);
    return (item && JSON.parse(item)) ?? defaultValue;
};

export const switchSeason = (season: Season): Season => {
    return season == Seasons.WINTER ? Seasons.SUMMER : Seasons.WINTER;
};

export const findSeasonYearForTurnId = (turnId: number): string => {
    const season = turnId % 2 === 0 ? START_SEASON : switchSeason(START_SEASON);
    const year = START_YEAR + Math.ceil(turnId / 2);
    return `${season} ${year}`;
};
