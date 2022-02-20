import React from "react";
import { AppBar, Grid, Toolbar } from "@material-ui/core";

import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

import { selectCurrentPower, selectCurrentTurnId } from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";

export const Tracker = () => {
    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

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
        </>
    );
};
