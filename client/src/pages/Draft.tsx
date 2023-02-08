import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { useWebsocket } from "../Websocket";

import { Loading } from "../components/Loading";

import { selectPowers, setDrafted, setPowers } from "../state/draft";
import { selectConnected, selectToken, setConnected } from "../state/game";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { InboundMessage } from "../state/types";

export const Draft = () => {
    const dispatch = useAppDispatch();
    const { gameId } = useParams();

    const { send, addHandler, removeHandler } = useWebsocket();

    const token = useAppSelector(selectToken);
    const powers = useAppSelector(selectPowers);
    const connected = useAppSelector(selectConnected);

    useEffect(() => {
        addHandler(handler);
        return () => removeHandler(handler);
    }, []);

    const handler = (message: InboundMessage) => {
        if (message.type === "connected") {
            dispatch(setPowers(message.payload));
            dispatch(setConnected(message.payload));
        }
        if (message.type === "update") {
            dispatch(setPowers(message.payload));
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
        actions: FormikHelpers<{ [key: string]: boolean }>
    ) => {
        const selectedPowers = Object.entries(values).map(([power, selected]) =>
            selected ? power : ""
        );
        send({
            type: "draft",
            payload: { token: token, powers: selectedPowers },
        });
        // don't overwrite the state if selectedPowers is empty, it should be an append too
        dispatch(setDrafted(selectedPowers));
        actions.resetForm();
        // navigate away to turn
    };

    if (!connected) {
        return <Loading />;
    }

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Formik initialValues={{}} onSubmit={onSubmit}>
                <Form>
                    <div className="mx-auto max-w-screen-sm">
                        <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                            Draft
                        </h3>
                        <ul className="mb-6 grid w-full gap-6 md:grid-cols-3">
                            {Object.entries(powers).map(([power, drafted]) => (
                                <li key={power}>
                                    <Field
                                        type="checkbox"
                                        name={power}
                                        id={power}
                                        className="peer hidden"
                                        required={false}
                                        disabled={drafted}
                                    />
                                    <label
                                        htmlFor={power}
                                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-800 peer-checked:text-gray-600 peer-disabled:bg-gray-100 peer-disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300 dark:peer-disabled:border-gray-800 dark:peer-disabled:bg-gray-800 dark:peer-disabled:text-gray-600"
                                    >
                                        <div className="block">
                                            <div className="text-md w-full font-semibold">
                                                {power}
                                            </div>
                                        </div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="w-1/2 rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};
