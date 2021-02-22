import React, { useEffect, useState } from 'react';
import { EventsDrawerContainerComponent } from './EventsDrawer.types';
import { EventsDrawerView } from './EventsDrawer.view';

export const EventsDrawerContainer: EventsDrawerContainerComponent = ({
    open,
    onClose,
    onOpen,
    events,
    active
}) => {
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

    useEffect(() => {
        if (!open) {
            setSelectedEventId(null);
        }
    }, [open]);

    return (
        <EventsDrawerView
            open={open}
            onClose={onClose}
            onOpen={onOpen}
            events={events}
            selectedEventId={selectedEventId}
            onEventClick={setSelectedEventId}
            onEventDetailsClose={() => setSelectedEventId(null)}
            active={active}
        />
    );
};
