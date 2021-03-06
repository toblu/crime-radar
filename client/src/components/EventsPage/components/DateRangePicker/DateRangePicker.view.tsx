import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import { subYears, format } from 'date-fns/esm';
import { DateRangePickerViewComponent } from './DateRangePicker.types';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    datePicker: {
        flex: 1,
        minWidth: 50
    },
    datePickerInputRoot: {
        fontWeight: 'inherit'
    },
    datePickerInput: {
        fontSize: 14,
        textAlign: 'center'
    },
    splitter: {
        fontSize: '1.2em',
        paddingBottom: 7
    }
}));

const formatDate = (date) => (date ? format(date, 'd MMM') : '');
const today = new Date();
const oneYearBeforeToday = subYears(today, 1);

export const DateRangePickerView: DateRangePickerViewComponent = ({
    className,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    size,
    open,
    onOpen,
    onClose
}) => {
    const classes = useStyles();
    const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className={`${className} ${classes.root}`}>
                <DatePicker
                    open={open && !endDatePickerOpen}
                    className={classes.datePicker}
                    value={startDate}
                    onChange={onStartDateChange}
                    minDate={oneYearBeforeToday}
                    labelFunc={formatDate}
                    onClose={() => {
                        if (endDate && endDate >= startDate) {
                            onClose();
                        } else {
                            setEndDatePickerOpen(true);
                        }
                    }}
                    disableFuture
                    size={size}
                    onOpen={onOpen}
                    InputProps={{
                        classes: {
                            root: classes.datePickerInputRoot,
                            input: classes.datePickerInput
                        }
                    }}
                ></DatePicker>
                <span className={classes.splitter}>-</span>
                <DatePicker
                    className={classes.datePicker}
                    open={open && endDatePickerOpen}
                    value={endDate}
                    onChange={onEndDateChange}
                    minDate={startDate}
                    labelFunc={formatDate}
                    onOpen={() => {
                        setEndDatePickerOpen(true);
                        onOpen();
                    }}
                    onClose={() => {
                        setEndDatePickerOpen(false);
                        onClose();
                    }}
                    disableFuture
                    size={size}
                    InputProps={{
                        classes: {
                            root: classes.datePickerInputRoot,
                            input: classes.datePickerInput
                        }
                    }}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
};
