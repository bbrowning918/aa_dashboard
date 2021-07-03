import { Countries, Seasons } from "./constants";

export type Country = keyof typeof Countries;
export type Season = keyof typeof Seasons;
