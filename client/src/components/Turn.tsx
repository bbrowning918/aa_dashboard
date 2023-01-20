import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";

import { useAppSelector } from "../state/hooks";
import { selectCurrentTurnId } from "../state/ipp";

import { useGameSocket } from "../state/websocket";
import { findSeasonYearForTurnId } from "../utils/turnUtils";

type TurnFormProps = {
    start: number;
    spent: number;
    income: number;
};

export const Turn = () => {
    const { gameId } = useParams();
    const { sendMessage } = useGameSocket();

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: "join", payload: { game_ref: gameId }});
        }
    }, [gameId, sendMessage]);

    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const initialValues: TurnFormProps = {
        start: 10,
        spent: 0,
        income: 0,
    };

    return (
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
                        <Field type="number" id="start" name="start" disabled />

                        <label htmlFor="spent">Spent</label>
                        <Field type="number" id="spent" name="spent" />
                        <ErrorMessage name={"spent"} />

                        <label htmlFor="income">Income</label>
                        <Field type="number" id="income" name="income" />
                        <ErrorMessage name={"income"} />
                    </div>
                    <button
                        className="w-1/2 rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                        type="submit"
                    >
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    );
};
