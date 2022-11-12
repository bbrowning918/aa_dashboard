import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppBar, Card, CardMedia, Grid, Toolbar } from "@mui/material";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { selectQrCode } from '../state/game';
import { Message, useGameSocket } from '../state/websocket';


export const Tracker = () => {
    const { gameId } = useParams();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);

    useEffect(() => {
        if (gameId) {
            sendMessage({ type: 'join', payload: gameId });
        }
    }, [gameId, sendMessage]);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    const handler = useCallback((message: Message) => {
        if (message.type === 'update') {
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
                    >
                        <Grid item>
                            {findSeasonYearForTurnId(currentTurnId)}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <CountryTable/>
            <Card
                sx={{
                    width: 145,
                    position: 'absolute',
                    right: 0,
                    bottom: 0
                }}
            >
                <CardMedia component={"img"} src={`data:image/png;base64, ${qrCode}`}/>
            </Card>
        </>
    );
};
