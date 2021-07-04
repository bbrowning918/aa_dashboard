import React from 'react';

import { ActionBar } from './components/ActionBar';
import { CountryTable } from './components/CountryTable';
import { TurnDialog } from './components/TurnDialog';


export const App = () => {
    return (
        <>
            <ActionBar/>
            <CountryTable/>
            <TurnDialog/>
        </>
    );
}
