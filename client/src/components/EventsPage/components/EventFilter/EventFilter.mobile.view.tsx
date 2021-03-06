import React, { useCallback, useState } from 'react';
import {
    Card,
    Divider,
    IconButton,
    Toolbar,
    Typography,
    makeStyles,
    useMediaQuery,
    useTheme
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FilterListIcon from '@material-ui/icons/FilterList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { format } from 'date-fns';
import { constants } from '@crime-alert/shared';

import { EventFilterViewComponent, TimePeriod } from './EventFilter.types';
import { TimeRangeFilter } from '../TimeRangeFilter';
import { EventTypesSelector } from '../EventTypesSelector';
import {
    LAST_30_DAYS,
    LAST_7_DAYS
} from '../TimeRangeFilter/TimeRangeFilter.constants';
import { IEventType } from '@crime-alert/shared/src/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 48,
        position: 'relative',
        width: '100%'
    },
    toolbarRoot: {
        position: 'absolute',
        width: '100%',
        padding: 0,
        zIndex: 1,
        bottom: 0,
        height: (expanded) => (expanded ? 240 : 48),
        transition: theme.transitions.create('height', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
            delay: 0
        })
    },
    card: {
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-evenly',
        overflow: 'visible'
    },
    cardColumn: {
        display: 'flex',
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8
    },
    previewText: {
        flex: 1,
        textAlign: 'center'
    },
    formInputWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
        flexWrap: 'nowrap'
    },
    divider: {
        position: 'relative',
        display: 'flex',
        width: 'fit-content',
        height: '100%'
    },
    expandIcon: {
        position: 'absolute',
        top: -15,
        left: -15,
        backgroundColor: '#fff',
        border: `1px solid ${theme.palette.divider}`,
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    previewRow: {
        height: '100%',
        display: 'inline-flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    expandedRow: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        padding: 16
    },
    expandedRowTitle: {
        marginTop: 0
    },
    expandedRowContent: {
        display: 'flex',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

const getTimePeriodPreviewText = (timePeriod: TimePeriod) => {
    if (timePeriod === LAST_7_DAYS) return 'Senaste 7 dagar';
    if (timePeriod === LAST_30_DAYS) return 'Senaste 30 dagar';
    return `${format(new Date(timePeriod.from), 'd MMM')} - ${format(
        new Date(timePeriod.to),
        'd MMM'
    )}`;
};

const getEventTypesPreviewText = (eventTypes: IEventType[]) => {
    if (!eventTypes.length || eventTypes.length === constants.eventTypes.length)
        return 'Alla händelser';
    if (eventTypes.length === 1) return '1 typ av händelse';
    return `${eventTypes.length} typer av händelser`;
};

export const EventFilterMobileView: EventFilterViewComponent = ({
    timePeriodValue,
    eventTypesValue,
    onTimePeriodChange,
    onEventTypesChange
}) => {
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles(expanded);

    const PreviewRow: React.FC<{
        size: 'small' | 'medium';
        Icon: React.ElementType;
    }> = useCallback(
        ({ children, size, Icon }) => (
            <div
                className={classes.previewRow}
                onClick={() => setExpanded(true)}
            >
                <Icon />
                <Typography
                    classes={{ root: classes.previewText }}
                    variant={size === 'small' ? 'body2' : 'body1'}
                >
                    {children}
                </Typography>
            </div>
        ),
        [classes.previewRow, classes.previewText]
    );

    const ExpandedRow: React.FC<{
        size: 'small' | 'medium';
        title: string;
    }> = useCallback(
        ({ size, title, children }) => (
            <div className={classes.expandedRow}>
                <Typography
                    classes={{ root: classes.expandedRowTitle }}
                    variant={size === 'small' ? 'body2' : 'body1'}
                >
                    {title}
                </Typography>
                <div className={classes.expandedRowContent}>{children}</div>
            </div>
        ),
        [
            classes.expandedRow,
            classes.expandedRowContent,
            classes.expandedRowTitle
        ]
    );

    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <div className={classes.root}>
            <Toolbar classes={{ root: classes.toolbarRoot }} variant="dense">
                <Card classes={{ root: classes.card }}>
                    <div className={classes.cardColumn}>
                        {expanded ? (
                            <ExpandedRow
                                title="Tidsperiod:"
                                size={isTablet ? 'medium' : 'small'}
                            >
                                <TimeRangeFilter
                                    className={classes.formInputWrapper}
                                    size={isTablet ? 'medium' : 'small'}
                                    initialTimePeriod={timePeriodValue}
                                    onTimePeriodChange={onTimePeriodChange}
                                    direction="column"
                                />
                            </ExpandedRow>
                        ) : (
                            <PreviewRow
                                Icon={DateRangeIcon}
                                size={isTablet ? 'medium' : 'small'}
                            >
                                {getTimePeriodPreviewText(timePeriodValue)}
                            </PreviewRow>
                        )}
                    </div>
                    <div className={classes.divider}>
                        <IconButton
                            classes={{ root: classes.expandIcon }}
                            onClick={() => setExpanded(!expanded)}
                            size="small"
                        >
                            {expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </IconButton>
                        <Divider orientation="vertical" />
                    </div>
                    <div className={classes.cardColumn}>
                        {expanded ? (
                            <ExpandedRow
                                title="Typer av händelser:"
                                size={isTablet ? 'medium' : 'small'}
                            >
                                <EventTypesSelector
                                    className={classes.formInputWrapper}
                                    size={isTablet ? 'medium' : 'small'}
                                    initiallySelected={eventTypesValue}
                                    onChange={onEventTypesChange}
                                />
                            </ExpandedRow>
                        ) : (
                            <PreviewRow
                                Icon={FilterListIcon}
                                size={isTablet ? 'medium' : 'small'}
                            >
                                {getEventTypesPreviewText(eventTypesValue)}
                            </PreviewRow>
                        )}
                    </div>
                </Card>
            </Toolbar>
        </div>
    );
};
