import React, { useCallback, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { Message, useGameSocket } from '../state/websocket';
import { useAppDispatch } from '../state/hooks';
import { init } from '../state/game';


export const StartGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { sendMessage, addMessageHandler, removeMessageHandler } = useGameSocket();

    const handler = useCallback((message: Message) => {
        if (message.type === 'init') {
            dispatch(init(message.payload));
            // @ts-ignore
            navigate(`${message.payload.game}/tracker`)
        }
    }, []);

    useEffect(() => {
        addMessageHandler(handler);
        return () => removeMessageHandler(handler);
    }, []);

    return (
        <>
            <AppBar position="relative">
                <Toolbar variant="dense">
                    <Typography variant={"h6"}>Global War 1936</Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{ height: '100vh' }}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Button
                    variant={"contained"}
                    size={"large"}
                    onClick={() => sendMessage({ type: 'start', payload: null })}
                >
                    Start Game
                </Button>
            </Box>
        </>
    );
};
