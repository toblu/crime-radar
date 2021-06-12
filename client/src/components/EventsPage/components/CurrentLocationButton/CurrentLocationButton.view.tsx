import React, { useCallback } from 'react';
import {
    IconButton,
    makeStyles,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import LocationDisabledIcon from '@material-ui/icons/LocationDisabled';
import { CurrentLocationButtonViewComponent } from './CurrentLocationButton.types';

const styles = () => ({
    '@global': {
        '@keyframes pulse': {
            '0%': {
                opacity: 0
            },
            '100%': {
                opacity: 1
            }
        }
    },
    root: {
        position: 'absolute' as 'absolute',
        right: 10,
        bottom: ({ isMobile }) => (isMobile ? 20 : 110),
        height: 40,
        width: 40,
        borderRadius: '5%',
        background: '#fff',
        '&:hover': {
            background: '#fff'
        }
    },
    loading: {
        animation: 'pulse 1s infinite'
    }
});

const useStyles = makeStyles(styles);

export const CurrentLocationButtonView: CurrentLocationButtonViewComponent = ({
    loading,
    locationUnavailable,
    onClick
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles({ isMobile });

    const handleClick = useCallback(
        (e: React.SyntheticEvent) => {
            e.stopPropagation();
            e.preventDefault();
            onClick(e);
        },
        [onClick]
    );
    return (
        <IconButton classes={classes} onClick={handleClick}>
            {loading ? (
                <LocationSearchingIcon className={classes.loading} />
            ) : !locationUnavailable ? (
                <MyLocationIcon />
            ) : (
                <LocationDisabledIcon />
            )}
        </IconButton>
    );
};
