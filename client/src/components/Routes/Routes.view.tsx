import React from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

const desktopAppBarHeight = 64;
const mobileAppBarHeight = 56;

const useStyles = (isMobile: boolean) =>
    makeStyles({
        root: {
            display: 'flex',
            height: `calc(100% - ${
                isMobile ? mobileAppBarHeight : desktopAppBarHeight
            }px)`,
            marginTop: isMobile ? mobileAppBarHeight : desktopAppBarHeight,
            width: '100%'
        }
    })();

export const RoutesView: React.FC = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const classes = useStyles(isMobile);
    return <div className={classes.root}>{children}</div>;
};
