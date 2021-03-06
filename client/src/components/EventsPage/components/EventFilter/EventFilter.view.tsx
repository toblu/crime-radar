import React from 'react';
import { Card, Divider, makeStyles, Toolbar } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FilterListIcon from '@material-ui/icons/FilterList';
import { EventFilterViewComponent } from './EventFilter.types';
import { EventTypesSelector } from '../EventTypesSelector';
import { TimeRangeFilter } from '../TimeRangeFilter';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        width: '100%',
        padding: 0,
        zIndex: 1,
        top: 64,
        height: 32
    },
    card: {
        height: '100%',
        width: '100%',
        display: 'inline-flex',
        justifyContent: 'space-evenly'
    },
    cardColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingLeft: 24,
        paddingRight: 24
    },
    formInputGroup: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'nowrap'
    },
    formInputIcon: {
        height: '100%',
        justifySelf: 'flex-start',
        marginRight: 8
    },
    inputSelect: {
        flex: 1,
        textAlign: 'center'
    },
    formInputWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
        flexWrap: 'nowrap'
    }
});

export const EventFilterView: EventFilterViewComponent = ({
    timePeriodValue,
    onTimePeriodChange,
    eventTypesValue,
    onEventTypesChange
}) => {
    const classes = useStyles();

    return (
        <Toolbar classes={{ root: classes.root }} variant="dense">
            <Card classes={{ root: classes.card }}>
                <div className={classes.cardColumn}>
                    <DateRangeIcon classes={{ root: classes.formInputIcon }} />
                    <TimeRangeFilter
                        className={classes.formInputGroup}
                        size="small"
                        initialTimePeriod={timePeriodValue}
                        onTimePeriodChange={onTimePeriodChange}
                    />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.cardColumn}>
                    <FilterListIcon classes={{ root: classes.formInputIcon }} />
                    <div className={classes.formInputGroup}>
                        <EventTypesSelector
                            className={classes.inputSelect}
                            initiallySelected={eventTypesValue}
                            onChange={onEventTypesChange}
                        />
                    </div>
                </div>
            </Card>
        </Toolbar>
    );
};
