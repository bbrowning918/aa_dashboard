import React from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Button, Typography } from '@material-ui/core';
import { ArrowForward, ArrowBack, RotateRight, Save } from '@material-ui/icons';

import { useAppDispatch, useAppSelector } from '../hooks';

import {
    nextTurn,
    nextPower,
    prevPower,
    selectCurrentTurnId,
    selectCurrentPower, selectCanMoveNextPower, selectCanMovePrevPower, selectCanMoveNextTurn,
} from '../redux/game/turnSlice';
import { findSeasonYearForTurnId } from '../utils/turnUtils';
import { toggleTurnDialog } from '../redux/ui/uiSlice';

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const ActionBar = () => {
    const dispatch = useAppDispatch();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const canMoveNextPower = useAppSelector(selectCanMoveNextPower);
    const canMovePrevPower = useAppSelector(selectCanMovePrevPower);
    const canMoveNextTurn = useAppSelector(selectCanMoveNextTurn);

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
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
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        startIcon={<Save/>}
                        onClick={() => dispatch(toggleTurnDialog())}
                    >
                        {currentPower}
                    </Button>
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
            <Toolbar/>
        </>
    );
};
