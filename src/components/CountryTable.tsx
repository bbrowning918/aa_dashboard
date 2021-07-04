import React from 'react';
import clsx from 'clsx';
import { makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

import { useAppSelector } from '../state/hooks';

import { Powers } from "../state/constants";

import {
    selectTurnsForPower,
    selectTurnIds, selectCurrentPower, selectCurrentTurnId
} from "../state/turn/slice";
import { findSeasonYearForTurnId } from "../state/turn/utils";
import { Power } from "../state/types";

const useStyles = makeStyles((theme) => ({
    current: {
        background: theme.palette.primary.main,
        color: theme.palette.common.white,
    }
}));

export const CountryTable = () => {
    const classes = useStyles();

    const turnIds = useAppSelector(selectTurnIds);

    const germanTurns = useAppSelector(state => selectTurnsForPower(state, Powers.GERMANY));
    const sovietTurns = useAppSelector(state => selectTurnsForPower(state, Powers.SOVIET_UNION));
    const commieChinaTurns = useAppSelector(state => selectTurnsForPower(state, Powers.COMMUNIST_CHINA));
    const japanTurns = useAppSelector(state => selectTurnsForPower(state, Powers.JAPAN));
    const ukWestTurns = useAppSelector(state => selectTurnsForPower(state, Powers.UK_WEST));
    const ukEastTurns = useAppSelector(state => selectTurnsForPower(state, Powers.UK_EAST));
    const anzacTurns = useAppSelector(state => selectTurnsForPower(state, Powers.ANZAC));
    const franceTurns = useAppSelector(state => selectTurnsForPower(state, Powers.FRANCE));
    const italyTurns = useAppSelector(state => selectTurnsForPower(state, Powers.ITALY));
    const usaTurns = useAppSelector(state => selectTurnsForPower(state, Powers.USA));
    const nattyChinaTurns = useAppSelector(state => selectTurnsForPower(state, Powers.NATIONALIST_CHINA));

    const currentPower = useAppSelector(selectCurrentPower);
    const currentTurnId = useAppSelector(selectCurrentTurnId);

    const isTurn = (power: Power, turnId: number) => {
        return power === currentPower && turnId === currentTurnId;
    }

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Turn</TableCell>
                        <TableCell>{Powers.GERMANY}</TableCell>
                        <TableCell>{Powers.SOVIET_UNION}</TableCell>
                        <TableCell>{Powers.COMMUNIST_CHINA}</TableCell>
                        <TableCell>{Powers.JAPAN}</TableCell>
                        <TableCell>{Powers.UK_WEST}</TableCell>
                        <TableCell>{Powers.UK_EAST}</TableCell>
                        <TableCell>{Powers.ANZAC}</TableCell>
                        <TableCell>{Powers.FRANCE}</TableCell>
                        <TableCell>{Powers.ITALY}</TableCell>
                        <TableCell>{Powers.USA}</TableCell>
                        <TableCell>{Powers.NATIONALIST_CHINA}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {turnIds.map((turnId) => (
                        <TableRow key={turnId}>
                            <TableCell>{findSeasonYearForTurnId(turnId)}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.GERMANY, turnId) && classes.current)}>{germanTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.SOVIET_UNION, turnId) && classes.current)}>{sovietTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.COMMUNIST_CHINA, turnId) && classes.current)}>{commieChinaTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.JAPAN, turnId) && classes.current)}>{japanTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.UK_WEST, turnId) && classes.current)}>{ukWestTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.UK_EAST, turnId) && classes.current)}>{ukEastTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.ANZAC, turnId) && classes.current)}>{anzacTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.FRANCE, turnId) && classes.current)}>{franceTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.ITALY, turnId) && classes.current)}>{italyTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.USA, turnId) && classes.current)}>{usaTurns[turnId]?.start}</TableCell>
                            <TableCell align="left" className={clsx(isTurn(Powers.NATIONALIST_CHINA, turnId) && classes.current)}>{nattyChinaTurns[turnId]?.start}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
