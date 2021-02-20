import React from 'react';
import { useEvents } from '../shared/hooks';
import { EventsMap } from './components';
import { useCurrentLocation } from './hooks';

export const EventsPageContainer = () => {
    const userLocation = useCurrentLocation();
    const { events } = useEvents();
    return <EventsMap initialLocation={userLocation} events={events} />;
};
