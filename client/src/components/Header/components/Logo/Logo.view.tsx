import React from 'react';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import { makeStyles, Typography } from '@material-ui/core';

const styles = () => ({
    root: {
        display: 'inline-flex',
        alignItems: 'center'
    }
});

const useStyles = makeStyles(styles);

export const LogoView = () => {
    const classes = useStyles();
    return (
        <Typography classes={classes} variant="h6">
            Crime Radar&nbsp;
            <TrackChangesIcon />
        </Typography>
    );
};
