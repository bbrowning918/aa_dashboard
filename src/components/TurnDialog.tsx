import React from 'react';
import { FormikErrors, useFormik } from 'formik';
import { makeStyles, Button, Dialog, TextField, Typography } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "../hooks";
import {
    selectCurrentTurn,
    saveCurrent,
    nextPower,
    selectCurrentPower,
    selectCurrentTurnId
} from "../redux/turnSlice";
import { findSeasonYearForTurnId } from '../utils/turnUtils';
import { selectTurnDialogVisibility, toggleTurnDialog } from '../redux/uiSlice';

type TurnFormProps = {
    spent: number,
    income: number,
}

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
        },
    },
}));

export const TurnDialog = () => {
    const classes = useStyles();

    const dispatch = useAppDispatch();

    const visible = useAppSelector(selectTurnDialogVisibility);
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
                errors.spent = 'It does not work that way';
            }
            if (values.spent > currentTurn.start) {
                errors.spent = 'Trying to spend more than IPP';
            }
            if (values.income < 0) {
                errors.income = 'It does not work that way';
            }

            return errors
        },
        onSubmit: (values: TurnFormProps, {resetForm}) => {
            dispatch(saveCurrent({spent: values.spent, income: values.income}));
            dispatch(nextPower());
            dispatch(toggleTurnDialog());
            resetForm();
        },
    });

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={visible}
            onClose={() => dispatch(toggleTurnDialog())}
        >
            <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Typography variant="h6">
                    {currentPower}
                </Typography>
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
                    <Button
                        variant="contained"
                        onClick={() => dispatch(toggleTurnDialog())}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </Dialog>
    );
}
