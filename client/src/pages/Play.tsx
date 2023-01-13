import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";

import { useAppSelector } from "../state/hooks";
import {
    selectCurrentTurnId,
} from "../state/ipp";

import { Message, useGameSocket } from '../state/websocket';
import { findSeasonYearForTurnId } from "../utils/turnUtils";

type TurnFormProps = {
    start: number,
    spent: number;
    income: number;
};

export const Play = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: 'join', payload: gameId });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        switch (message.type) {
            case 'join':
                console.log("we joined, save the token, now we should pick powers");
                break;
            case 'update':
                console.log("there was an update to the game state, save it")
                break;
        }
    }, []);

    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const initialValues: TurnFormProps = {
        start: 10,
        spent: 0,
        income: 0,
    };

    const formik = useFormik<TurnFormProps>({
        initialValues: initialValues,
        enableReinitialize: true,
        validate: (values: TurnFormProps) => {
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
        },
        onSubmit: (values: TurnFormProps, { resetForm }) => {
            // TODO fire update message, redux will change in the handler
            resetForm();
        },
    });

    return (
        <div className="container max-w-sm py-24 mx-auto">
            <div className="flex flex-col items-center">
                <form onSubmit={formik.handleSubmit}>
                    <h6>INSERT POWER</h6>
                    <p>{findSeasonYearForTurnId(currentTurnId)}</p>
                    <div className="grid gap-6 mb-6">
                        <label>IPP</label>
                        <input type="number"></input>
                        <label>Spent</label>
                        <input type="number"></input>
                        <label>Income</label>
                        <input type="number"></input>
                    </div>
                    <button
                        className="text-white bg-blue-700 border-0 py-2 focus:outline-none hover:bg-blue-800 rounded text-lg"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};
