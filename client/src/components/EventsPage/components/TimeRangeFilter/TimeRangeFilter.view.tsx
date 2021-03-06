import React, { useState } from 'react';
import { format } from 'date-fns';
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    makeStyles
} from '@material-ui/core';
import { DateRangePicker } from '../DateRangePicker';
import { TimeRangeFilterViewComponent } from './TimeRangeFilter.types';
import { LAST_30_DAYS, LAST_7_DAYS } from './TimeRangeFilter.constants';

const useStyles = makeStyles({
    radioGroupRoot: {
        flexWrap: 'nowrap'
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
    controlLabelGroup: {
        display: 'inline-flex',
        flex: 1,
        fontSize: 14,
        justifyContent: 'space-evenly',
        margin: '0 8px'
    },
    highlighted: {
        fontWeight: 600
    },
    customTimeFormLabelRoot: {
        marginRight: 8
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

export const TimeRangeFilterView: TimeRangeFilterViewComponent = ({
    className,
    size = 'small',
    timePeriod,
    customTimePeriod,
    onTimePeriodChange,
    onCustomTimePeriodChange
}) => {
    const classes = useStyles();
    const timePeriodString = getTimePeriodString(timePeriod);
    const [datePickerOpen, setDatePickerOpen] = useState(false);

    const isLast7Days = timePeriodString === 'last7Days';
    const isLast30Days = timePeriodString === 'last30Days';
    const isCustomPeriod = timePeriodString === 'custom';

    return (
        <FormControl className={className} size={size}>
            <RadioGroup
                classes={{ root: classes.radioGroupRoot }}
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
                        const value = timePeriodKeyValueMap[valueKey];
                        onTimePeriodChange(value);
                    }
                }}
            >
                <div className={classes.controlLabelGroup}>
                    <FormControlLabel
                        className={isLast7Days ? classes.highlighted : ''}
                        classes={{
                            root: classes.formControlRoot,
                            label: classes.formLabel
                        }}
                        value="last7Days"
                        label="7 dagar"
                        control={<Radio size={size} />}
                    />
                    <FormControlLabel
                        className={isLast30Days ? classes.highlighted : ''}
                        classes={{
                            root: classes.formControlRoot,
                            label: classes.formLabel
                        }}
                        value="last30Days"
                        label="30 dagar"
                        control={<Radio size={size} />}
                    />
                </div>
                <div className={classes.controlLabelGroup}>
                    <FormControlLabel
                        className={isCustomPeriod ? classes.highlighted : ''}
                        classes={{
                            root: classes.customTimeFormLabelRoot,
                            label: classes.formLabel
                        }}
                        label="Anpassad"
                        value="custom"
                        control={<Radio size={size} />}
                    />
                    <DateRangePicker
                        open={datePickerOpen}
                        className={isCustomPeriod ? classes.highlighted : ''}
                        size={size}
                        valueStart={customTimePeriod?.from}
                        valueEnd={customTimePeriod?.to}
                        onChange={({ startDate, endDate }) =>
                            onCustomTimePeriodChange({
                                from: format(startDate, 'yyyy-MM-dd'),
                                to: format(endDate, 'yyyy-MM-dd')
                            })
                        }
                        onOpen={() => setDatePickerOpen(true)}
                        onClose={() => setDatePickerOpen(false)}
                    />
                </div>
            </RadioGroup>
        </FormControl>
    );
};
