import React, { useCallback, useEffect, useState } from 'react';
import { constants } from '@crime-alert/shared';
import { IEventType } from '@crime-alert/shared/dist/constants';
import { useEvents } from '../shared/hooks';
import { Event } from '../shared/types/event.types';
import { EventFilter, EventsMap } from './components';
import { TimePeriod } from './components/EventFilter/EventFilter.types';
import { EventsDrawer } from './components/EventsDrawer';
import { LAST_7_DAYS } from './components/TimeRangeFilter/TimeRangeFilter.constants';
import { EventsPageView } from './EventsPage.view';

export const EventsPageContainer = () => {
    const [eventsInSelectedArea, setEventsInSelectedArea] = useState<Event[]>(
        []
    );
    const [timePeriod, setTimePeriod] = useState<TimePeriod>(LAST_7_DAYS);
    const [eventTypes, setEventTypes] = useState<IEventType[]>(
        constants.eventTypes
    );
    const { events, loading } = useEvents({
        from: timePeriod.from,
        to: timePeriod.to,
        type: eventTypes.length ? (eventTypes as IEventType[]) : undefined
    });
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSelectedArea, setShowSelectedArea] = useState(false);

    const handleEventsClick = useCallback((events) => {
        setEventsInSelectedArea(events);
        setShowSidebar(true);
    }, []);

    const handleFilterChange = useCallback<
        (timePeriod: TimePeriod, eventTypes: IEventType[]) => void
    >((newTimePeriod, newEventTypes) => {
        setTimePeriod(newTimePeriod);
        setEventTypes(newEventTypes);
    }, []);

    useEffect(() => {
        setEventsInSelectedArea([]);
        setShowSelectedArea(false);
    }, [events]);

    return (
        <EventsPageView>
            <EventFilter
                timePeriod={timePeriod}
                eventTypes={eventTypes}
                onChange={handleFilterChange}
            />
            <EventsMap
                eventsLoading={loading}
                events={events}
                onEventsClick={handleEventsClick}
                showSelectedArea={showSelectedArea}
                setShowSelectedArea={setShowSelectedArea}
            />
            <EventsDrawer
                open={showSelectedArea && showSidebar}
                onClose={() => setShowSidebar(false)}
                onOpen={() => setShowSidebar(true)}
                events={eventsInSelectedArea}
                active={showSelectedArea}
            />
        </EventsPageView>
    );
};
