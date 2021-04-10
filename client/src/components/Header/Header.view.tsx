import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    IconButton,
    Theme,
    Link,
    makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { HeaderComponent } from './Header.types';
// import { ProfileMenu } from '../ProfileMenu';

const absolute: 'absolute' = 'absolute';

const styles = (theme: Theme) => ({
    root: {
        display: 'flex',
        width: '100%'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: absolute,
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    googleTranslateMenu: {
        margin: theme.spacing(2)
    }
});

const useStyles = makeStyles(styles);

export const HeaderView: HeaderComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link
                        component={RouterLink}
                        className={`notranslate ${classes.title}`}
                        variant="h6"
                        color="inherit"
                        underline="none"
                        to="/"
                    >
                        Crime Alert
                    </Link>
                    <div
                        id="google_translate_element"
                        className={classes.googleTranslateMenu}
                    />
                    {/* <ProfileMenu /> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};
