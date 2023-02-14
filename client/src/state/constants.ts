export const WS_HOST = import.meta.env.VITE_REACT_APP_HOST_WS;
export const WS_PORT = import.meta.env.VITE_REACT_APP_PORT_WS;

export const Powers = {
    GERMANY: "Germany",
    SOVIET_UNION: "Soviet Union",
    COMMUNIST_CHINA: "Communist China",
    JAPAN: "Japan",
    UK_WEST: "UK West",
    UK_EAST: "UK East",
    ANZAC: "ANZAC",
    FRANCE: "France",
    ITALY: "Italy",
    USA: "United States",
    NATIONALIST_CHINA: "Nationalist China",
} as const;

export const powerOrder = [
    Powers.GERMANY,
    Powers.SOVIET_UNION,
    Powers.COMMUNIST_CHINA,
    Powers.JAPAN,
    Powers.UK_WEST,
    Powers.UK_EAST,
    Powers.ANZAC,
    Powers.FRANCE,
    Powers.ITALY,
    Powers.USA,
    Powers.NATIONALIST_CHINA,
];

export const Seasons = {
    WINTER: "Winter",
    SUMMER: "Summer",
} as const;

export const START_SEASON = Seasons.SUMMER;
export const START_YEAR = 1936;
