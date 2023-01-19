import React from "react";

import { useAppSelector } from "../state/hooks";

import { Powers } from "../state/constants";

import { selectTurnsForPower, selectTurnIds } from "../state/ipp";
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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Turn</th>
                        <th>{Powers.GERMANY}</th>
                        <th>{Powers.SOVIET_UNION}</th>
                        <th>{Powers.COMMUNIST_CHINA}</th>
                        <th>{Powers.JAPAN}</th>
                        <th>{Powers.UK_WEST}</th>
                        <th>{Powers.UK_EAST}</th>
                        <th>{Powers.ANZAC}</th>
                        <th>{Powers.FRANCE}</th>
                        <th>{Powers.ITALY}</th>
                        <th>{Powers.USA}</th>
                        <th>{Powers.NATIONALIST_CHINA}</th>
                    </tr>
                </thead>
                <tbody>
                    {turnIds.map((turnId: number) => (
                        <tr key={turnId}>
                            <td>{findSeasonYearForTurnId(turnId)}</td>
                            <td>{germanTurns[turnId]?.start}</td>
                            <td>{sovietTurns[turnId]?.start}</td>
                            <td>{commieChinaTurns[turnId]?.start}</td>
                            <td>{japanTurns[turnId]?.start}</td>
                            <td>{ukWestTurns[turnId]?.start}</td>
                            <td>{ukEastTurns[turnId]?.start}</td>
                            <td>{anzacTurns[turnId]?.start}</td>
                            <td>{franceTurns[turnId]?.start}</td>
                            <td>{italyTurns[turnId]?.start}</td>
                            <td>{usaTurns[turnId]?.start}</td>
                            <td>{nattyChinaTurns[turnId]?.start}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
