import React from 'react';

import { ActionBar } from "./components/ActionBar";
import { CountryTable } from "./components/CountryTable";


export const App = () => {
    return (
        <>
            <ActionBar/>
            <CountryTable/>
        </>
    );
}
