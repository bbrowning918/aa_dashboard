import React from 'react';
import { Button } from "@material-ui/core";

import { ActionBar } from "./components/ActionBar";
import { CountryTable } from "./components/CountryTable";
import { TurnDialog } from "./components/TurnDialog";


export const App = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <ActionBar/>
            <CountryTable/>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>OPEN DIALOG</Button>
            <TurnDialog open={open} setOpen={setOpen}/>
        </>
    );
}
