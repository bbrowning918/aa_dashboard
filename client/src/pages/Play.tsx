import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { FormikErrors, useFormik } from "formik";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";

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
        <Container maxWidth={'xs'}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form
                    onSubmit={formik.handleSubmit}
                >
                    <Typography variant="h6">INSERT POWER</Typography>
                    <Typography variant="subtitle1">
                        {findSeasonYearForTurnId(currentTurnId)}
                    </Typography>
                    <TextField
                        fullWidth
                        id="ipp"
                        name="ipp"
                        type="number"
                        label="IPP"
                        variant="outlined"
                        defaultValue={formik.values.start}
                        disabled
                        sx={{ my: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="spent"
                        name="spent"
                        type="number"
                        label="Spent"
                        variant="outlined"
                        value={formik.values.spent}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.spent)}
                        helperText={formik.errors.spent}
                        sx={{ my: 2 }}
                    />
                    <TextField
                        fullWidth
                        id="income"
                        name="income"
                        type="number"
                        label="Income"
                        variant="outlined"
                        value={formik.values.income}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.income)}
                        helperText={formik.errors.income}
                        sx={{ my: 2 }}
                    />
                    <div>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Box>
        </Container>
    );
};
