import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core";

import { Countries } from "../state/constants";

import {
    useAppSelector,
    selectTurnIds,
    findSeasonYearForTurnId,
    selectGermanyIpp,
    selectSovietIpp,
} from "../state";


export const CountryTable = () => {
    const turnIds = useAppSelector(selectTurnIds);

    const germanyIpp = useAppSelector(selectGermanyIpp);
    const sovietIpp = useAppSelector(selectSovietIpp);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Turn</TableCell>
                        <TableCell>{Countries.GERMANY}</TableCell>
                        <TableCell>{Countries.SOVIET_UNION}</TableCell>
                        <TableCell>{Countries.COMMUNIST_CHINA}</TableCell>
                        <TableCell>{Countries.JAPAN}</TableCell>
                        <TableCell>{Countries.UK_WEST}</TableCell>
                        <TableCell>{Countries.UK_EAST}</TableCell>
                        <TableCell>{Countries.ANZAC}</TableCell>
                        <TableCell>{Countries.FRANCE}</TableCell>
                        <TableCell>{Countries.ITALY}</TableCell>
                        <TableCell>{Countries.USA}</TableCell>
                        <TableCell>{Countries.NATIONALIST_CHINA}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {turnIds.map((turnId) => (
                        <TableRow key={turnId}>
                            <TableCell>{findSeasonYearForTurnId(turnId)}</TableCell>
                            <TableCell align="left">{germanyIpp[turnId]?.ipp}</TableCell>
                            <TableCell align="left">{sovietIpp[turnId]?.ipp}</TableCell>
                            <TableCell align="left">{2}</TableCell>
                            <TableCell align="left">{16}</TableCell>
                            <TableCell align="left">{11}</TableCell>
                            <TableCell align="left">{5}</TableCell>
                            <TableCell align="left">{3}</TableCell>
                            <TableCell align="left">{5}</TableCell>
                            <TableCell align="left">{7}</TableCell>
                            <TableCell align="left">{6}</TableCell>
                            <TableCell align="left">{6}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
