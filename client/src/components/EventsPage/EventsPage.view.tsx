import React from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';

const useStyles = (isMobile: boolean) =>
    makeStyles({
        root: {
            display: 'flex',
            flex: 1,
            flexDirection: isMobile ? 'column-reverse' : 'column'
        }
    })();

export const EventsPageView: React.FC = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles(isMobile);
    return <div className={classes.root}>{children}</div>;
};
