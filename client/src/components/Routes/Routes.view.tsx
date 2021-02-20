import React from 'react';
import { makeStyles } from '@material-ui/core';

const styles = () => ({
    root: {
        display: 'flex',
        width: '100%',
        flex: 1
    }
});

const useStyles = makeStyles(styles);

export const RoutesView: React.FC = ({ children }) => {
    const classes = useStyles(styles);
    return <div className={classes.root}>{children}</div>;
};
