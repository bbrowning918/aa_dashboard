import React from "react";
import { makeStyles, AppBar, Card, CardMedia, Grid, Toolbar } from "@material-ui/core";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentPower, selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";
import { selectQrCode } from '../state/game';

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

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);
    const qrCode = useAppSelector(selectQrCode);

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
