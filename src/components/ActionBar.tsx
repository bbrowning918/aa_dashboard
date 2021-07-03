import React from 'react';
import {
    AppBar,
    makeStyles,
    Toolbar,
    IconButton
} from "@material-ui/core";
import {
    ArrowForward,
    ArrowBack,
    ExposureNeg1,
    ExposurePlus1,
} from "@material-ui/icons";

import {
    useAppDispatch,
    useAppSelector,
    nextCountry,
    prevCountry,
    selectCurrentTurnId,
    findSeasonYearForTurnId,
    selectCurrentCountry,
    saveGermanyIpp,
    saveSovietIpp,
} from "../state";


const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const ActionBar = () => {
    const dispatch = useAppDispatch();

    const currentCountry = useAppSelector(selectCurrentCountry);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    Axis & Allies Dashboard - {currentCountry} / {findSeasonYearForTurnId(currentTurnId)}
                    <div className={classes.grow} />
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(prevCountry())}><ArrowBack/></IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(nextCountry())}><ArrowForward/></IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(saveGermanyIpp({turn_id: 1, ipp: 22 }))}><ExposureNeg1/></IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(saveSovietIpp({turn_id: 1, ipp: 6 }))}><ExposurePlus1/></IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};
