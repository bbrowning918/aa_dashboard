import React from 'react';
import { makeStyles, AppBar, Toolbar, IconButton } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

import { useAppDispatch, useAppSelector } from '../state/hooks';

import {
    nextPower,
    prevPower,
    selectCurrentTurnId,
    selectCurrentPower,
    selectCurrentTurn,
} from "../state/turn/slice";
import { findSeasonYearForTurnId } from "../state/turn/utils";

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const ActionBar = () => {
    const dispatch = useAppDispatch();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const currentTurn = useAppSelector(selectCurrentTurn);

    const classes = useStyles();

    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    Axis & Allies Dashboard
                    <div className={classes.grow} />
                    {currentPower} / {findSeasonYearForTurnId(currentTurnId)}
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(prevPower())}><ArrowBack/></IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(nextPower({spent: currentTurn.spent ?? random(0, currentTurn.start), income: currentTurn.income ?? random(5, currentTurn.start + 5)}))}><ArrowForward/></IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};
