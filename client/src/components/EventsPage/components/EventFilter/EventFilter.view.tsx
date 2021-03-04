import React, { useEffect, useState } from 'react';
import {
    Card,
    Divider,
    FormControl,
    FormControlLabel,
    makeStyles,
    Radio,
    RadioGroup,
    Toolbar
} from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FilterListIcon from '@material-ui/icons/FilterList';
import { format } from 'date-fns';
import { EventFilterViewComponent, TimePeriod } from './EventFilter.types';
import { LAST_30_DAYS, LAST_7_DAYS } from './EventFilter.constants';
import { DateRangePicker } from '../DateRangePicker';
import { EventTypesSelector } from '../EventTypesSelector';

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
        paddingLeft: 24
    },
    formInputGroup: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    formControlRoot: {
        minWidth: 94,
        flex: 1,
        justifyContent: 'flex-start'
    },
    formLabel: {
        fontSize: 14,
        flexWrap: 'nowrap',
        fontWeight: 'inherit'
    },
    formInputIcon: {
        height: '100%',
        justifySelf: 'flex-start',
        marginRight: 8
    },
    inputSelect: {
        flexBasis: 275
    },
    controlLabelGroup: {
        display: 'inline-flex',
        flex: 1,
        fontSize: 14,
        justifyContent: 'space-evenly',
        margin: '0 8px'
    },
    formInputWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-evenly',
        flexWrap: 'nowrap',
        maxWidth: 600
    },
    customTimeFormLabelRoot: {
        marginRight: 8
    },
    highlighted: {
        fontWeight: 600
    }
});

const timePeriodKeyValueMap = {
    last7Days: LAST_7_DAYS,
    last30Days: LAST_30_DAYS
};

const getTimePeriodString = (value) => {
    switch (value) {
        case LAST_7_DAYS:
            return 'last7Days';
        case LAST_30_DAYS:
            return 'last30Days';
        default:
            return 'custom';
    }
};

export const EventFilterView: EventFilterViewComponent = ({
    timePeriodValue,
    onTimePeriodChange,
    eventTypesValue,
    onEventTypesChange
}) => {
    const classes = useStyles();
    const [customTimePeriod, setCustomTimePeriod] = useState<TimePeriod>();
    useEffect(() => {
        if (customTimePeriod) {
            onTimePeriodChange(customTimePeriod);
        }
    }, [customTimePeriod, onTimePeriodChange]);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const timePeriodString = getTimePeriodString(timePeriodValue);

    return (
        <Toolbar classes={{ root: classes.root }} variant="dense">
            <Card classes={{ root: classes.card }}>
                <div className={classes.cardColumn}>
                    <DateRangeIcon classes={{ root: classes.formInputIcon }} />
                    <FormControl
                        classes={{ root: classes.formInputGroup }}
                        size="small"
                    >
                        <RadioGroup
                            className={classes.formInputWrapper}
                            row
                            value={timePeriodString}
                            onChange={(e, valueKey) => {
                                if (valueKey === 'custom') {
                                    if (customTimePeriod) {
                                        onTimePeriodChange(customTimePeriod);
                                    } else {
                                        setDatePickerOpen(true);
                                    }
                                } else {
                                    const value =
                                        timePeriodKeyValueMap[valueKey];
                                    onTimePeriodChange(value);
                                }
                            }}
                        >
                            <div className={classes.controlLabelGroup}>
                                <FormControlLabel
                                    className={
                                        timePeriodString === 'last7Days'
                                            ? classes.highlighted
                                            : ''
                                    }
                                    classes={{
                                        root: classes.formControlRoot,
                                        label: classes.formLabel
                                    }}
                                    value="last7Days"
                                    label="7 dagar"
                                    control={<Radio size="small" />}
                                />
                                <FormControlLabel
                                    className={
                                        timePeriodString === 'last30Days'
                                            ? classes.highlighted
                                            : ''
                                    }
                                    classes={{
                                        root: classes.formControlRoot,
                                        label: classes.formLabel
                                    }}
                                    value="last30Days"
                                    label="30 dagar"
                                    control={<Radio size="small" />}
                                />
                            </div>
                            <div className={classes.controlLabelGroup}>
                                <FormControlLabel
                                    className={
                                        timePeriodString === 'custom'
                                            ? classes.highlighted
                                            : ''
                                    }
                                    classes={{
                                        root: classes.customTimeFormLabelRoot,
                                        label: classes.formLabel
                                    }}
                                    label="Anpassad"
                                    value="custom"
                                    control={<Radio size="small" />}
                                />
                                <DateRangePicker
                                    open={datePickerOpen}
                                    className={
                                        timePeriodString === 'custom'
                                            ? classes.highlighted
                                            : ''
                                    }
                                    size="small"
                                    valueStart={customTimePeriod?.from}
                                    valueEnd={customTimePeriod?.to}
                                    onChange={({ startDate, endDate }) =>
                                        setCustomTimePeriod({
                                            from: format(
                                                startDate,
                                                'yyyy-MM-dd'
                                            ),
                                            to: format(endDate, 'yyyy-MM-dd')
                                        })
                                    }
                                    onOpen={() => setDatePickerOpen(true)}
                                    onClose={() => setDatePickerOpen(false)}
                                />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.cardColumn}>
                    <FilterListIcon classes={{ root: classes.formInputIcon }} />
                    <div className={classes.formInputWrapper}>
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
