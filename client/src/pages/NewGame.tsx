import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";

import { useWebsocket } from "../Websocket";

import { setPowers } from "../state/draft";
import { init, setConnected, setToken } from "../state/game";
import { useAppDispatch } from "../state/hooks";
import { setTurns } from "../state/turn";
import { InboundMessage } from "../state/types";

export const NewGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { send, addHandler, removeHandler } = useWebsocket();

    useEffect(() => {
        addHandler(handler);
        return () => removeHandler(handler);
    }, []);

    const handler = (message: InboundMessage) => {
        if (message.type === "init") {
            dispatch(init(message.payload));
            navigate("/tracker");
        }
        if (message.type === "connected") {
            dispatch(setToken(message.payload));
            dispatch(setPowers(message.payload));
            dispatch(setTurns(message.payload));
            dispatch(setConnected(message.payload));
            navigate("/draft");
        }
        if (message.type === "error") {
            // show a toast or something with formik
            console.error(message.payload);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto w-screen py-8 px-4 sm:py-16 lg:px-6">
                <div className="mx-auto h-screen max-w-screen-sm text-center">
                    <h1 className="title-font mb-12 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Global War 1936
                    </h1>
                    <button
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => send({ type: "new" })}
                    >
                        New Game
                    </button>
                    <div className="inline-flex w-full items-center justify-center">
                        <hr className="my-8 h-px w-64 border-0 bg-gray-200 dark:bg-gray-700" />
                        <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-900 dark:bg-gray-900 dark:text-white">
                            or
                        </span>
                    </div>
                    <div>
                        <Formik
                            initialValues={{
                                game: "",
                            }}
                            onSubmit={(
                                values: { game: string },
                                formikHelpers: FormikHelpers<{ game: string }>
                            ) => {
                                send({
                                    type: "join",
                                    payload: { game_ref: values.game },
                                });
                            }}
                        >
                            <Form>
                                <Field
                                    name="game"
                                    id="game"
                                    type="text"
                                    className="mr-4 w-1/4 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Join Game
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
