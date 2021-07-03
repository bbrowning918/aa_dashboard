import {Season} from "../types";
import {Seasons} from "../constants";

export const switchSeason = (season: Season): Season => {
    return season === Seasons[Seasons.WINTER] ? Seasons.SUMMER : Seasons.WINTER;
};
