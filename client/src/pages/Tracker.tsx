import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { makeStyles, AppBar, Card, CardMedia, Grid, Toolbar } from "@material-ui/core";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentPower, selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { selectQrCode } from '../state/game';
import { useGameSocket } from '../state/websocket';

const useStyles = makeStyles(() => ({
    qrCode: {
        width: 145,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
}));

export const Tracker = () => {
    const classes = useStyles();
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: 'watch', payload: gameId });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback(message => {
        if (message.type == 'update') {
            console.log("there was an update to the game state, save it")
        }
    }, []);

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Grid
                        container
                        direction={"row"}
                        justify={"center"}
                        alignItems={"center"}
                    >
                        <Grid item>
                            {currentPower} ({findSeasonYearForTurnId(currentTurnId)})
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <CountryTable/>
            <Card className={classes.qrCode}>
                <CardMedia component={"img"} src={`data:image/png;base64, ${qrCode}`}/>
            </Card>
        </>
    );
};
