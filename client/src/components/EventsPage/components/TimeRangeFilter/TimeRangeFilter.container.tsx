import React, { useEffect, useState } from 'react';
import { TimeRangeFilterContainerComponent } from './TimeRangeFilter.types';
import { TimePeriod } from '../EventFilter/EventFilter.types';
import { TimeRangeFilterView } from './TimeRangeFilter.view';
import { LAST_30_DAYS, LAST_7_DAYS } from './TimeRangeFilter.constants';

export const TimeRangeFilterContainer: TimeRangeFilterContainerComponent = ({
    className,
    size,
    initialTimePeriod = LAST_7_DAYS,
    onTimePeriodChange
}) => {
    const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>(
        initialTimePeriod
    );
    const [customTimePeriod, setCustomTimePeriod] = useState<TimePeriod>(
        initialTimePeriod !== LAST_7_DAYS && initialTimePeriod !== LAST_30_DAYS
            ? initialTimePeriod
            : undefined
    );

    useEffect(() => {
        if (customTimePeriod) {
            setSelectedTimePeriod(customTimePeriod);
        }
    }, [customTimePeriod]);

    useEffect(() => {
        if (selectedTimePeriod) onTimePeriodChange(selectedTimePeriod);
    }, [selectedTimePeriod, onTimePeriodChange]);

    return (
        <TimeRangeFilterView
            className={className}
            size={size}
            timePeriod={selectedTimePeriod}
            customTimePeriod={customTimePeriod}
            onTimePeriodChange={setSelectedTimePeriod}
            onCustomTimePeriodChange={setCustomTimePeriod}
        />
    );
};
