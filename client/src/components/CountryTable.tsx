import React from "react";

import { Powers } from "../state/constants";
import { useAppSelector } from "../state/hooks";
import { selectTurns, Turn } from "../state/turn";

import { findSeasonYearForTurnId } from "../utils/turnUtils";

export const CountryTable = () => {
    const turns = useAppSelector(selectTurns); // remembering why the prototype had these keyed by power

    const powerOrder = [
        "Germany",
        "Soviet Union",
        "Communist China",
        "Japan",
        "UK West",
        "UK East",
        "ANZAC",
        "France",
        "Italy",
        "United States",
        "Nationalist China",
    ];

    const orderedTurns = [...turns].sort((a: Turn, b: Turn) => {
        if (a.year === b.year) {
            if (a.season === b.season) {
                const aPower = powerOrder.indexOf(a.power);
                const bPower = powerOrder.indexOf(b.power);
                return aPower == -1 ? 1 : bPower == -1 ? -1 : aPower - bPower;
            } else {
                return a.season.localeCompare(b.season);
            }
        } else {
            return a.year < b.year ? -1 : 1;
        }
    });

    const sortedTurns = orderedTurns.reduce((result, turn, index) => {
        const chunkIndex = Math.floor(index / powerOrder.length);

        if (!result[chunkIndex]) {
            result[chunkIndex] = [];
        }
        result[chunkIndex].push(turn);

        return result;
    }, []);

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
                    {sortedTurns.map((turns: Turn[], turnIndex: number) => (
                        <tr
                            key={turnIndex}
                            className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                            <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {findSeasonYearForTurnId(turnIndex)}
                            </td>
                            {[...Array(11)].map((_, powerIndex) => (
                                <td
                                    key={`${turnIndex}-${powerIndex}`}
                                    className="px-6 py-4 dark:text-white"
                                >
                                    {turns[powerIndex]?.start}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
