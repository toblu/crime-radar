import React from 'react';
import { AppBar, Toolbar, Theme, makeStyles } from '@material-ui/core';
import { HeaderComponent } from './Header.types';
import { Logo } from './components/Logo';
import { MainMenu } from './components/MainMenu';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        flexGrow: 1
    },
    title: {
        flexGrow: 1
    }
});

const useStyles = makeStyles(styles);

export const HeaderView: HeaderComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <MainMenu />
                    <Logo />
                    {/* <ProfileMenu /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};
