import React from "react";
import { Formik, Field, Form } from "formik";
import { Powers } from "../state/constants";

interface Props {
    token: string;
    powers: any;
}

export const Draft = ({ token, powers }: Props) => {
    // TODO save calls websocket draft with chosen powers + token
    // TODO already drafted powers are disabled -> indicate visually
    console.log({ token, powers });
    return (
        <Formik
            initialValues={{}}
            onSubmit={(values) => console.log({ values })}
        >
            <Form>
                <div className="mx-auto max-w-screen-sm">
                    <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                        Draft
                    </h3>
                    <ul className="mb-6 grid w-full gap-6 md:grid-cols-3">
                        {Object.values(Powers).map((power) => (
                            <li key={power}>
                                <Field
                                    type="checkbox"
                                    name={power}
                                    id={power}
                                    className="peer hidden"
                                    required={false}
                                    disabled={false}
                                />
                                <label
                                    htmlFor={power}
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-800 peer-checked:text-gray-600 peer-disabled:bg-gray-100 peer-disabled:text-gray-500 dark:peer-disabled:border-gray-800 dark:peer-disabled:bg-gray-800 dark:peer-disabled:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300"
                                >
                                    <div className="block">
                                        <div className="text-md w-full font-semibold">
                                            {power}
                                        </div>
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="w-1/2 rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                        type="submit"
                    >
                        Save
                    </button>
                </div>
            </Form>
        </Formik>
    );
};
