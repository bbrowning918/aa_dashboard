import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { useWebsocket } from "../Websocket";

import { Loading } from "../components/Loading";
import { Header } from "../components/Header";

import { setPowers } from "../state/draft";
import {
    selectConnected,
    selectGameId,
    selectToken,
    setConnected,
    setToken,
} from "../state/game";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setTurns } from "../state/turn";
import { InboundMessage } from "../state/types";

export const Settings = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { send, addHandler, removeHandler } = useWebsocket();

    const token = useAppSelector(selectToken);
    const connected = useAppSelector(selectConnected);
    const gameId = useAppSelector(selectGameId);

    useEffect(() => {
        addHandler(handler);
        return () => removeHandler(handler);
    }, []);

    const handler = (message: InboundMessage) => {
        if (message.type === "connected") {
            dispatch(setPowers(message.payload));
            dispatch(setConnected(message.payload));
            dispatch(setTurns(message.payload));
        }
        if (message.type === "update") {
            dispatch(setPowers(message.payload));
            dispatch(setTurns(message.payload));
        }
    };

    useEffect(() => {
        if (!connected) {
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
        }
    }, [connected]);

    const onSubmit = (
        values: { [key: string]: boolean },
        _: FormikHelpers<{ [key: string]: boolean }>
    ) => {
        dispatch(setToken({ token: values.token }));
    };

    if (!connected) {
        return <Loading />;
    }

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Header title="Settings" />
            <Formik
                initialValues={{
                    game: gameId,
                    token: token,
                }}
                onSubmit={onSubmit}
            >
                <Form>
                    <div className="mx-auto max-w-screen-sm">
                        <div className="mb-6">
                            <label
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="game"
                            >
                                Game
                            </label>
                            <Field
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                type="text"
                                id="game"
                                name="game"
                                disabled
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="token"
                            >
                                Token
                            </label>
                            <Field
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                type="text"
                                id="token"
                                name="token"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="rounded border-0 border border-gray-200 bg-white py-2 text-lg text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                                type="button"
                                onClick={() => {
                                    localStorage.clear();
                                    navigate("/")
                                }}
                            >
                                Leave Game
                            </button>
                            <button
                                className="rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
