import React from 'react';
import { useEvent } from '../../../shared/hooks';
import { EventDetailsContainerComponent } from './EventDetails.types';
import { EventDetailsView } from './EventDetails.view';

export const EventDetailsContainer: EventDetailsContainerComponent = ({
    id,
    onClose
}) => {
    const { loading, event } = useEvent(id ?? '');
    return (
        <EventDetailsView loading={loading} event={event} onClose={onClose} />
    );
};
