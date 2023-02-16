import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
    title: string;
};

export const Header = ({ title }: Props) => {
    return (
        <nav className="mb-4 rounded-b-lg border-gray-200 bg-gray-50 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-wrap items-center items-center justify-between">
                <h1 className="title-font text-xl font-medium text-gray-700 dark:text-white sm:text-2xl">
                    {title}
                </h1>
                <div
                    className="hidden w-full md:block md:w-auto"
                    id="navbar-solid-bg"
                >
                    <div className="mt-4 flex flex-col rounded-lg bg-gray-50 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-transparent md:text-sm md:font-medium md:dark:bg-transparent">
                        {[
                            ["Draft", "/draft"],
                            ["Tracker", "/tracker"],
                            ["Settings", "/"],
                        ].map(([name, path]) => (
                            <NavLink
                                key={name}
                                className={({ isActive }) =>
                                    isActive
                                        ? "block rounded bg-blue-700 py-2 pl-3 pr-4 text-white dark:bg-blue-600 md:bg-transparent md:p-0 md:text-blue-700 md:dark:bg-transparent md:dark:text-white"
                                        : "block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-white"
                                }
                                to={path}
                            >
                                {name}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};
