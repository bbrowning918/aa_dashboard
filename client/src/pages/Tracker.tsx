import React from 'react';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { ArrowBack, ArrowForward, RotateRight } from '@material-ui/icons';

import { useAppDispatch, useAppSelector } from '../hooks';

import { CountryTable } from '../components/CountryTable';

import {
    nextPower,
    nextTurn,
    prevPower,
    selectCanMoveNextPower,
    selectCanMoveNextTurn,
    selectCanMovePrevPower,
    selectCurrentPower,
    selectCurrentTurnId
} from '../redux/game/turnSlice';
import { findSeasonYearForTurnId } from '../utils/turnUtils';


const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const Tracker = () => {
    const dispatch = useAppDispatch();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const canMoveNextPower = useAppSelector(selectCanMoveNextPower);
    const canMovePrevPower = useAppSelector(selectCanMovePrevPower);
    const canMoveNextTurn = useAppSelector(selectCanMoveNextTurn);

    const classes = useStyles();

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <IconButton
                        edge="start"
                        color="inherit"
                        disabled={!canMovePrevPower}
                        onClick={() => dispatch(prevPower())}
                    >
                        <ArrowBack/>
                    </IconButton>
                    <IconButton
                        edge="start"
                        color="inherit"
                        disabled={!canMoveNextPower}
                        onClick={() => dispatch(nextPower())}
                    >
                        <ArrowForward/>
                    </IconButton>
                    <div className={classes.grow}/>
                    <Typography>
                        {currentPower} ({findSeasonYearForTurnId(currentTurnId)})
                    </Typography>
                    <div className={classes.grow}/>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<RotateRight/>}
                        disabled={!canMoveNextTurn}
                        onClick={() => dispatch(nextTurn())}
                    >
                        Next Turn
                    </Button>
                </Toolbar>
            </AppBar>
            <CountryTable/>
        </>
    );
};
