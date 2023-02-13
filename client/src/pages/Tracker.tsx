import React from "react";

import { selectQrCode } from "../state/game";
import { useAppSelector } from "../state/hooks";

import { CountryTable } from "../components/CountryTable";

export const Tracker = () => {
    const qrCode = useAppSelector(selectQrCode);

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <nav className="mb-4 rounded-b-lg border-gray-200 bg-blue-700 p-4 shadow-md">
                <div className="flex flex-wrap items-center items-center justify-between">
                    <h1 className="title-font text-xl font-medium text-white sm:text-2xl">
                        SEASON YEAR
                    </h1>
                </div>
            </nav>
            <CountryTable />
            {qrCode && (
                <img
                    className="absolute bottom-0 right-0 w-36 rounded-2xl border-gray-200 shadow-md"
                    src={`data:image/png;base64, ${qrCode}`}
                />
            )}
        </div>
    );
};
