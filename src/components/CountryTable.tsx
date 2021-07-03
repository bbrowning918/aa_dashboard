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


export const CountryTable = () => {
    const createRow = (turn: string, germany: number, soviet: number, comChina: number, japan: number, ukWest: number, ukEast: number, anzac: number, france: number, italy: number, usa: number, natChina: number) => {
        return {
            turn,
            germany,
            soviet,
            comChina,
            japan,
            ukWest,
            ukEast,
            anzac,
            france,
            italy,
            usa,
            natChina
        }
    };

    const rows = [
        createRow("Summer '36", 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow("Winter '37", 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1937', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1938', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1938', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1939', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1939', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1940', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1940', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1941', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1941', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1942', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1942', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1943', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1943', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1944', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1944', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jan 1945', 20, 8,2,16,11,5,3,5, 7,6,6),
        createRow('Jul 1945', 20, 8,2,16,11,5,3,5, 7,6,6),
        {turn: 'test', germany: 1, soviet: undefined, comChina: undefined, japan: undefined, ukWest: undefined, ukEast: 2, anzac: undefined, france: 0, italy: 3, usa: 120, natChina: undefined}
    ];

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
                    {rows.map((row) => (
                        <TableRow key={row.turn}>
                            <TableCell component="th" scope="row">
                                {row.turn}
                            </TableCell>
                            <TableCell align="left">{row.germany}</TableCell>
                            <TableCell align="left">{row.soviet}</TableCell>
                            <TableCell align="left">{row.comChina}</TableCell>
                            <TableCell align="left">{row.japan}</TableCell>
                            <TableCell align="left">{row.ukWest}</TableCell>
                            <TableCell align="left">{row.ukEast}</TableCell>
                            <TableCell align="left">{row.anzac}</TableCell>
                            <TableCell align="left">{row.france}</TableCell>
                            <TableCell align="left">{row.italy}</TableCell>
                            <TableCell align="left">{row.usa}</TableCell>
                            <TableCell align="left">{row.natChina}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
