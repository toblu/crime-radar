import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Theme, Link, makeStyles } from '@material-ui/core';
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
                    <Link
                        component={RouterLink}
                        className={classes.title}
                        variant="h6"
                        color="inherit"
                        underline="none"
                        to="/"
                    >
                        <Logo />
                    </Link>
                    {/* <ProfileMenu /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};
