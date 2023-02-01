import React from "react";
import { useParams } from "react-router-dom";

import { selectToken } from "../state/game";
import { useAppSelector } from "../state/hooks";
import { OutboundMessage } from "../state/types";

interface Props {
    send: (message: OutboundMessage) => void;
}

export const JoinGame = ({ send }: Props) => {
    const { gameId } = useParams();
    const token = useAppSelector(selectToken);

    const joinGame = () => {
        if (gameId) {
            token
                ? send({
                      type: "join",
                      payload: {
                          token: token,
                          game_ref: gameId,
                      },
                  })
                : send({
                      type: "join",
                      payload: { game_ref: gameId },
                  });
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl py-8 px-4 sm:py-16 lg:px-6">
                <div className="mx-auto h-screen max-w-screen-sm text-center">
                    <h1 className="title-font mb-12 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Global War 1936
                    </h1>
                    <button
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={joinGame}
                    >
                        Join Game
                    </button>
                </div>
            </div>
        </div>
    );
};