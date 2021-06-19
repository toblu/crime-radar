import React from 'react';
import {
    Drawer,
    IconButton,
    makeStyles,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { EventsDrawerViewComponent } from './EventsDrawer.types';
import { EventsList } from '../EventsList';
import { EventDetails } from '../EventDetails';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const drawerListWidth = 256;
const drawerDetailsWidth = 450;
const desktopAppBarHeight = 64;
const mobileAppBarHeight = 56;

const basePaperStyles = (isMobile: boolean): CSSProperties => ({
    top: isMobile ? mobileAppBarHeight : desktopAppBarHeight,
    height: `calc(100% - ${
        isMobile ? mobileAppBarHeight : desktopAppBarHeight
    }px)`,
    boxSizing: 'border-box'
});

const useDrawerStyles = (isMobile: boolean) =>
    makeStyles(() => ({
        root: {
            flexShrink: 0
        },
        listDrawerPaper: {
            ...basePaperStyles(isMobile),
            width: drawerListWidth
        },
        detailsDrawerPaper: {
            ...basePaperStyles(isMobile),
            width: drawerDetailsWidth,
            maxWidth: '100vw'
        }
    }))();

const useToggleButtonStyles = ({ open, isMobile }) =>
    makeStyles((theme) => ({
        root: {
            position: 'absolute',
            right: open ? drawerListWidth : 0,
            width: 16,
            height: 48,
            top: `calc(50% - ${
                (48 - isMobile ? mobileAppBarHeight : desktopAppBarHeight) / 2
            }px)`,
            borderRadius: 'unset',
            transition: theme.transitions.create('right', {
                easing: theme.transitions.easing.easeOut,
                duration: open
                    ? theme.transitions.duration.leavingScreen
                    : theme.transitions.duration.enteringScreen,
                delay: 0
            }),
            backgroundColor: '#fff',
            '&:hover': {
                backgroundColor: '#fff'
            }
        }
    }))();
const ToggleDrawerButton = ({
    onClick,
    open
}: {
    onClick: () => void;
    open: boolean;
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useToggleButtonStyles({ open, isMobile });
    return (
        <IconButton classes={classes} onClick={onClick} size="small">
            {open ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </IconButton>
    );
};

export const EventsDrawerView: EventsDrawerViewComponent = ({
    open,
    onClose,
    onOpen,
    events,
    selectedEventId,
    onEventClick,
    onEventDetailsClose
}) => {
    const showEventDetails = !!selectedEventId;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
    const classes = useDrawerStyles(isMobile);
    return (
        <>
            <ToggleDrawerButton
                open={open}
                onClick={() => {
                    if (open) {
                        onClose();
                    } else {
                        onOpen();
                    }
                }}
            />

            <Drawer
                key="event-list-drawer"
                variant="persistent"
                classes={{ root: classes.root, paper: classes.listDrawerPaper }}
                anchor="right"
                open={open}
                onClose={onClose}
            >
                <EventsList
                    events={events}
                    onEventClick={onEventClick}
                ></EventsList>
            </Drawer>
            <Drawer
                key="event-details-drawer"
                classes={{
                    root: classes.root,
                    paper: classes.detailsDrawerPaper
                }}
                variant="temporary"
                anchor="right"
                open={open && showEventDetails}
                onClose={onClose}
                BackdropProps={{ invisible: true }}
            >
                <EventDetails
                    id={selectedEventId}
                    onClose={onEventDetailsClose}
                />
            </Drawer>
        </>
    );
};
