import React from "react";
import { ErrorMessage, Field, Form, Formik, FormikErrors } from "formik";

type TurnFormProps = {
    start: number;
    spent: number;
    income: number;
};

export const Turn = () => {
    const initialValues: TurnFormProps = {
        start: 10,
        spent: 0,
        income: 0,
    };

    return (
        <div className="flex flex-col items-center">
            <Formik
                initialValues={initialValues}
                validate={(values: TurnFormProps) => {
                    let errors: FormikErrors<TurnFormProps> = {};

                    if (values.spent < 0) {
                        errors.spent = "That is not how spending works";
                    }
                    if (values.spent > initialValues.start) {
                        errors.spent = "That is not how budgets work";
                    }
                    if (values.income < 0) {
                        errors.income = "That is not how income works";
                    }

                    return errors;
                }}
                onSubmit={(values: TurnFormProps, { resetForm }) => {
                    // TODO fire update message, redux will change in the handler
                    resetForm();
                }}
            >
                <Form>
                    <h6>CHOSEN POWER</h6>
                    <p>SEASON YEAR</p>
                    <div className="mb-6 grid gap-6">
                        <label htmlFor="start">IPP</label>
                        <Field type="number" id="start" name="start" disabled />

                        <label htmlFor="spent">Spent</label>
                        <Field type="number" id="spent" name="spent" />
                        <ErrorMessage name={"spent"} />

                        <label htmlFor="income">Income</label>
                        <Field type="number" id="income" name="income" />
                        <ErrorMessage name={"income"} />
                    </div>
                    <button
                        className="w-1/2 rounded border-0 bg-blue-700 py-2 text-lg text-white hover:bg-blue-800 focus:outline-none"
                        type="submit"
                    >
                        Save
                    </button>
                </Form>
            </Formik>
        </div>
    );
};
