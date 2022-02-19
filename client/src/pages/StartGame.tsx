import React from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button, Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    fullHeight: {
        height: '100vh',
    }
}));

export const StartGame = () => {
    const navigate = useNavigate();

    const classes = useStyles();

    return (
        <>
            <AppBar position="sticky">
                <Toolbar variant="dense">
                    <Grid
                        container
                        direction={'row'}
                        justify={'center'}
                        alignItems={'center'}
                    >
                        <Grid item>Axis & Allies - Global War 1936</Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Grid
                container
                className={classes.fullHeight}
                direction={'column'}
                justify={'space-around'}
                alignItems={'center'}
            >
                <Grid item>
                    <Button
                        variant={'contained'}
                        size={'large'}
                        color={'secondary'}
                        onClick={() => navigate('1/tracker')}
                    >
                        Start Game
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
