import { Seasons } from "./constants";
import { Countries } from "../constants";

export type Country = keyof typeof Countries;
export type Season = keyof typeof Seasons;