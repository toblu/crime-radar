import React, { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { EventFilterView } from './EventFilter.view';
import { EventFilterMobileView } from './EventFilter.mobile.view';
import { EventFilterContainerComponent, TimePeriod } from './EventFilter.types';
import { IEventType } from '@crime-alert/shared/dist/constants';

export const EventFilterContainer: EventFilterContainerComponent = ({
    timePeriod,
    eventTypes,
    onChange
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>(
        timePeriod
    );
    const [selectedEventTypes, setSelectedEventTypes] = useState<IEventType[]>(
        eventTypes
    );

    useEffect(() => {
        onChange(selectedTimePeriod, selectedEventTypes);
    }, [selectedTimePeriod, selectedEventTypes, onChange]);

    const EventFilterComponent = isMobile
        ? EventFilterMobileView
        : EventFilterView;

    return (
        <EventFilterComponent
            timePeriodValue={selectedTimePeriod}
            onTimePeriodChange={setSelectedTimePeriod}
            eventTypesValue={selectedEventTypes}
            onEventTypesChange={setSelectedEventTypes}
        />
    );
};
