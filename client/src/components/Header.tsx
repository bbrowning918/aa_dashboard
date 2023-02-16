import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    const navigate = useNavigate();

    return (
        <nav className="mb-4 rounded-b-lg border-gray-200 bg-gray-50 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-wrap items-center items-center justify-between">
                <h1 className="title-font text-xl font-medium text-white sm:text-2xl">
                    {title}
                </h1>
            </div>
        </nav>
    );
};
