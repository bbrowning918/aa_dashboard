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
} from "@material-ui/icons";

import {
    useAppDispatch,
    useAppSelector,
    nextCountry,
    prevCountry,
    selectCurrentCountry,
    selectCurrentSeason,
    selectCurrentYear,
} from "../state";


const useStyles = makeStyles(() => ({
    grow: {
        flexGrow: 1
    }
}));

export const ActionBar = () => {
    const dispatch = useAppDispatch();

    const currentCountry = useAppSelector(selectCurrentCountry);
    const currentSeason = useAppSelector(selectCurrentSeason);
    const currentYear = useAppSelector(selectCurrentYear);

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    Axis & Allies Dashboard - {currentCountry} / {currentSeason} {currentYear}
                    <div className={classes.grow} />
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(prevCountry())}><ArrowBack/></IconButton>
                    <IconButton edge="end" color="inherit" onClick={() => dispatch(nextCountry())}><ArrowForward/></IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
        </>
    );
};
