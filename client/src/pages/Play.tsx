import React from "react";
import { FormikErrors, useFormik } from "formik";
import {
    makeStyles,
    Button,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
    selectCurrentTurn,
    saveCurrent,
    nextPower,
    selectCurrentPower,
    selectCurrentTurnId,
} from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";

type TurnFormProps = {
    spent: number;
    income: number;
};

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(2),
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "300px",
        },
        "& .MuiButtonBase-root": {
            margin: theme.spacing(1),
        },
    },
}));

export const Play = () => {
    // ask to join game over ws
    // save token and controlled powers
    // choose from available powers
    // submit turns as they come
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const currentTurn = useAppSelector(selectCurrentTurn);

    const initialValues: TurnFormProps = {
        spent: currentTurn.spent ?? 0,
        income: currentTurn.income ?? 0,
    };

    const formik = useFormik<TurnFormProps>({
        initialValues: initialValues,
        enableReinitialize: true,
        validate: (values: TurnFormProps) => {
            let errors: FormikErrors<TurnFormProps> = {};

            if (values.spent < 0) {
                errors.spent = "It does not work that way";
            }
            if (values.spent > currentTurn.start) {
                errors.spent = "Trying to spend more than IPP";
            }
            if (values.income < 0) {
                errors.income = "It does not work that way";
            }

            return errors;
        },
        onSubmit: (values: TurnFormProps, { resetForm }) => {
            dispatch(saveCurrent({ spent: values.spent, income: values.income }));
            dispatch(nextPower());
            resetForm();
        },
    });

    return (
        <Grid container direction={"row"} justify={"center"} alignItems={"center"}>
            <Grid item>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <Typography variant="h6">{currentPower}</Typography>
                    <Typography variant="subtitle1">
                        {findSeasonYearForTurnId(currentTurnId)}
                    </Typography>
                    <TextField
                        id="ipp"
                        name="ipp"
                        type="number"
                        label="IPP"
                        variant="outlined"
                        defaultValue={currentTurn.start ?? 0}
                        disabled
                    />
                    <TextField
                        id="spent"
                        name="spent"
                        type="number"
                        label="Spent"
                        variant="outlined"
                        value={formik.values.spent}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.spent)}
                        helperText={formik.errors.spent}
                    />
                    <TextField
                        id="income"
                        name="income"
                        type="number"
                        label="Income"
                        variant="outlined"
                        value={formik.values.income}
                        onChange={formik.handleChange}
                        error={Boolean(formik.errors.income)}
                        helperText={formik.errors.income}
                    />
                    <div>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Grid>
        </Grid>
    );
};
