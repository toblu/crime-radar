import React, { useCallback, useState } from 'react';
import { useEvents } from '../shared/hooks';
import { Event } from '../shared/types/event.types';
import { EventsMap } from './components';
import { EventsDrawer } from './components/EventsDrawer';
import { useCurrentLocation } from './hooks';

export const EventsPageContainer = () => {
    const userLocation = useCurrentLocation();
    const { events } = useEvents();
    const [eventsInSelectedArea, setEventsInSelectedArea] = useState<Event[]>(
        []
    );
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSelectedArea, setShowSelectedArea] = useState(false);

    const handleEventsClick = useCallback((events) => {
        setEventsInSelectedArea(events);
        setShowSidebar(true);
    }, []);

    return (
        <>
            <EventsMap
                initialLocation={userLocation}
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
        </>
    );
};
