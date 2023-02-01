import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { selectToken, selectPowers } from "../state/game";
import { useAppSelector } from "../state/hooks";
import { OutboundMessage } from "../state/types";

interface Props {
    send: (message: OutboundMessage) => void;
}

export const Draft = ({ send }: Props) => {
    const token = useAppSelector(selectToken);
    const powers = useAppSelector(selectPowers);

    // if we don't have powers but do have token, we should re join on load
    // if we don't have powers or a token, we should go to 'join' page?

    const onSubmit = (
        values: { [key: string]: boolean },
        actions: FormikHelpers<{ [key: string]: boolean }>
    ) => {
        const selectedPowers = Object.entries(values).map(([power, selected]) =>
            selected ? power : ""
        );
        send({
            type: "draft",
            payload: { token: token, powers: selectedPowers },
        });
        actions.resetForm();
    };

    return (
        <div className="h-screen bg-white dark:bg-gray-900">
            <Formik initialValues={{}} onSubmit={onSubmit}>
                <Form>
                    <div className="mx-auto max-w-screen-sm">
                        <h3 className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
                            Draft
                        </h3>
                        <ul className="mb-6 grid w-full gap-6 md:grid-cols-3">
                            {Object.entries(powers).map(([power, drafted]) => (
                                <li key={power}>
                                    <Field
                                        type="checkbox"
                                        name={power}
                                        id={power}
                                        className="peer hidden"
                                        required={false}
                                        disabled={drafted}
                                    />
                                    <label
                                        htmlFor={power}
                                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-5 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-800 peer-checked:text-gray-600 peer-disabled:bg-gray-100 peer-disabled:text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-gray-300 dark:peer-disabled:border-gray-800 dark:peer-disabled:bg-gray-800 dark:peer-disabled:text-gray-600"
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
        </div>
    );
};
