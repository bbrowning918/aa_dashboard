export const WS_HOST = import.meta.env.VITE_REACT_APP_HOST_WS;
export const WS_PORT = import.meta.env.VITE_REACT_APP_PORT_WS;

export const Powers  = {
    GERMANY: "GERMANY",
    SOVIET_UNION: "SOVIET_UNION",
    COMMUNIST_CHINA: "COMMUNIST_CHINA",
    JAPAN: "JAPAN",
    UK_WEST: "UK_WEST",
    UK_EAST: "UK_EAST",
    ANZAC: "ANZAC",
    FRANCE: "FRANCE",
    ITALY: "ITALY",
    USA: "USA",
    NATIONALIST_CHINA: "NATIONALIST_CHINA",
} as const;

export const Seasons = {
    WINTER: "Winter",
    SUMMER: "Summer",
} as const;

export const START_SEASON = Seasons.SUMMER;
export const START_YEAR = 1936;
