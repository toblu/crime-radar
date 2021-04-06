import React, { useCallback, useEffect, useState } from 'react';
import { DateRangePickerContainerComponent } from './DateRangePicker.types';
import { DateRangePickerView } from './DateRangePicker.view';

export const DateRangePickerContainer: DateRangePickerContainerComponent = ({
    className,
    valueStart,
    valueEnd,
    onChange,
    size,
    open: controlledOpen,
    onOpen,
    onClose
}) => {
    const isControlled = controlledOpen !== undefined;

    const [startDate, setStartDate] = useState<Date | null>(
        valueStart ? new Date(valueStart) : null
    );
    const [endDate, setEndDate] = useState<Date | null>(
        valueEnd ? new Date(valueEnd) : null
    );

    const [unControlledOpen, setIsOpen] = useState(controlledOpen ?? false);

    useEffect(() => {
        setIsOpen(controlledOpen);
    }, [controlledOpen]);

    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(null);
        } else if (startDate && endDate) {
            onChange({ startDate, endDate });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate]);

    const handleOpen = useCallback(() => {
        if (isControlled) {
            onOpen();
        } else {
            setIsOpen(true);
        }
    }, [setIsOpen, onOpen, isControlled]);

    const handleClose = useCallback(() => {
        if (isControlled) {
            onClose();
        } else {
            setIsOpen(false);
        }
    }, [setIsOpen, onClose, isControlled]);

    return (
        <DateRangePickerView
            className={className}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
            open={controlledOpen ?? unControlledOpen}
            onOpen={handleOpen}
            onClose={handleClose}
            size={size}
        />
    );
};
