import { Powers, Seasons } from "./constants";

export type Power = keyof typeof Powers;
export type Season = keyof typeof Seasons;

export type OutboundMessage =
    | { type: "new" }
    | { type: "join"; payload: { game_ref: string } }
    | { type: "join"; payload: { token: string; game_ref: string } }
    | { type: "draft"; payload: { token: string; powers: string[] } };

export type InboundMessage =
    | {
          type: "init";
          payload: { token: string; game_ref: string; qr_code: string };
      }
    | {
          type: "connected";
          payload: {
              token: string;
              game_ref: string;
              powers: { [key: string]: boolean };
          };
      }
    | { type: "update"; payload: { powers: { [key: string]: boolean } } };

export type MessageHandler = (message: InboundMessage) => void;
