import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";

import { useAppSelector } from "../state/hooks";
import { selectCurrentTurnId } from "../state/ipp";

import { Message, useGameSocket } from "../state/websocket";
import { findSeasonYearForTurnId } from "../utils/turnUtils";

type TurnFormProps = {
    start: number;
    spent: number;
    income: number;
};

export const Play = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } =
        useGameSocket();

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: "join", payload: gameId });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        switch (message.type) {
            case "join":
                console.log("we joined, save the token, then pick powers");
                break;
            case "update":
                console.log("there was an update to the game state, save it");
                break;
        }
    }, []);

    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const initialValues: TurnFormProps = {
        start: 10,
        spent: 0,
        income: 0,
    };

    return (
        <div className="container mx-auto max-w-sm py-24">
            <div className="flex flex-col items-center">
                <Formik
                    initialValues={initialValues}
                    validate={(values: TurnFormProps) => {
                        let errors: FormikErrors<TurnFormProps> = {};

                        if (values.spent < 0) {
                            errors.spent = "It does not work that way";
                        }
                        if (values.spent > initialValues.start) {
                            errors.spent = "Trying to spend more than IPP";
                        }
                        if (values.income < 0) {
                            errors.income = "It does not work that way";
                        }

                        return errors;
                    }}
                    onSubmit={(values: TurnFormProps, { resetForm }) => {
                        // TODO fire update message, redux will change in the handler
                        resetForm();
                    }}
                >
                    <Form>
                        <h6>CHOSEN POWER</h6>
                        <p>{findSeasonYearForTurnId(currentTurnId)}</p>
                        <div className="mb-6 grid gap-6">
                            <label htmlFor="start">IPP</label>
                            <Field
                                type="number"
                                id="start"
                                name="start"
                                disabled
                            />

                            <label htmlFor="spent">Spent</label>
                            <Field type="number" id="spent" name="spent" />
                            <ErrorMessage name={"spent"} />

                            <label htmlFor="income">Income</label>
                            <Field type="number" id="income" name="income" />
                            <ErrorMessage name={"income"} />
                        </div>
                        <button
                            className="rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                            type="submit"
                        >
                            Save
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
