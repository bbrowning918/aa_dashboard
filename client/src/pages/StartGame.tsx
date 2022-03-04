import React, { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button, Grid } from "@material-ui/core";

import { useGameSocket } from '../state/websocket';
import { useAppDispatch } from '../state/hooks';
import { init } from '../state/game';


const useStyles = makeStyles(() => ({
    fullHeight: {
        height: "100vh",
    },
}));

export const StartGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const handler = useCallback(message => {
        if (message.type == 'init') {
            dispatch(init(message.payload));
            navigate(`${message.payload.game}/tracker`)
        }
    }, []);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar variant="dense">
                    <Grid
                        container
                        direction={"row"}
                        justify={"center"}
                        alignItems={"center"}
                    >
                        <Grid item>Global War 1936</Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid
                container
                className={classes.fullHeight}
                direction={"column"}
                justify={"space-around"}
                alignItems={"center"}
            >
                <Grid item>
                    <Button
                        variant={"contained"}
                        size={"large"}
                        color={"secondary"}
                        onClick={() => sendMessage({ type: 'start', payload: null })}
                    >
                        Start Game
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
