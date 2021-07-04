import React from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Button, Typography } from "@material-ui/core";
import { ArrowForward, ArrowBack } from "@material-ui/icons";

import { useAppDispatch, useAppSelector } from '../hooks';

import {
    nextPower,
    prevPower,
    selectCurrentTurnId,
    selectCurrentPower,
} from "../redux/turnSlice";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { toggleTurnDialog } from '../redux/uiSlice';

const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const ActionBar = () => {
    const dispatch = useAppDispatch();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => dispatch(toggleTurnDialog())}
                    >
                        Submit
                    </Button>
                    <div className={classes.grow}/>
                    <Typography>
                        {currentPower} ({findSeasonYearForTurnId(currentTurnId)})
                    </Typography>
                    <div className={classes.grow}/>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => dispatch(prevPower())}
                    >
                        <ArrowBack/>
                    </IconButton>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => dispatch(nextPower())}
                    >
                        <ArrowForward/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};
