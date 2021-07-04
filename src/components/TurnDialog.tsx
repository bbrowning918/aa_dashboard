import React from 'react';
import { makeStyles, Button, Dialog, TextField } from "@material-ui/core";

type TurnDialogProps = {
    open: boolean,
    setOpen: (open:boolean) => void,
}

const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(1),
        },
    },
}));

export const TurnDialog = ({ open, setOpen }: TurnDialogProps) => {
    const classes = useStyles();

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
            onClose={() => setOpen(false)}
        >
           <form className={classes.form}>
               <TextField
                   label="IPP"
                   variant="outlined"
                   defaultValue={123}
                   disabled
               />
               <TextField
                   label="Total Spent"
                   variant="outlined"
                   required
               />
               <TextField
                   label="Income"
                   variant="outlined"
                   required
               />
                <div>
                    <Button variant="contained" onClick={() => setOpen(false)}>CANCEL</Button>
                    <Button variant="contained" color="primary">SAVE</Button>
                </div>
           </form>
        </Dialog>
    );
}
