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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-900 dark:text-gray-900">
                <thead className="bg-gray-50 text-sm uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Turn</th>
                        <th className="px-6 py-3">{Powers.GERMANY}</th>
                        <th className="px-6 py-3">{Powers.SOVIET_UNION}</th>
                        <th className="px-6 py-3">{Powers.COMMUNIST_CHINA}</th>
                        <th className="px-6 py-3">{Powers.JAPAN}</th>
                        <th className="px-6 py-3">{Powers.UK_WEST}</th>
                        <th className="px-6 py-3">{Powers.UK_EAST}</th>
                        <th className="px-6 py-3">{Powers.ANZAC}</th>
                        <th className="px-6 py-3">{Powers.FRANCE}</th>
                        <th className="px-6 py-3">{Powers.ITALY}</th>
                        <th className="px-6 py-3">{Powers.USA}</th>
                        <th className="px-6 py-3">
                            {Powers.NATIONALIST_CHINA}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {turnIds.map((turnId: number) => (
                        <tr
                            key={turnId}
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {findSeasonYearForTurnId(turnId)}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {germanTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {sovietTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {commieChinaTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {japanTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {ukWestTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {ukEastTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {anzacTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {franceTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {italyTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {usaTurns[turnId]?.start}
                            </td>
                            <td className="px-6 py-4 dark:text-white">
                                {nattyChinaTurns[turnId]?.start}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
