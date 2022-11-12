import React from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { useAppSelector } from "../state/hooks";

import { Powers } from "../state/constants";

import {
    selectTurnsForPower,
    selectTurnIds,
} from "../state/ipp";
import { findSeasonYearForTurnId } from "../utils/turnUtils";


export const CountryTable = () => {
    const turnIds = useAppSelector(selectTurnIds);

    const germanTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.GERMANY)
    );
    const sovietTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.SOVIET_UNION)
    );
    const commieChinaTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.COMMUNIST_CHINA)
    );
    const japanTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.JAPAN)
    );
    const ukWestTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.UK_WEST)
    );
    const ukEastTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.UK_EAST)
    );
    const anzacTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.ANZAC)
    );
    const franceTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.FRANCE)
    );
    const italyTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.ITALY)
    );
    const usaTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.USA)
    );
    const nattyChinaTurns = useAppSelector((state) =>
        selectTurnsForPower(state, Powers.NATIONALIST_CHINA)
    );

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
                    {turnIds.map((turnId: number) => (
                        <TableRow key={turnId}>
                            <TableCell>{findSeasonYearForTurnId(turnId)}</TableCell>
                            <TableCell align="left">
                                {germanTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {sovietTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {commieChinaTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {japanTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {ukWestTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {ukEastTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {anzacTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {franceTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {italyTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {usaTurns[turnId]?.start}
                            </TableCell>
                            <TableCell align="left">
                                {nattyChinaTurns[turnId]?.start}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
