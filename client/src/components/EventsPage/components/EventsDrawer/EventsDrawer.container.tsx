import React, { useState } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { EventsDrawerContainerComponent } from './EventsDrawer.types';
import { EventsDrawerView } from './EventsDrawer.view';

export const EventsDrawerContainer: EventsDrawerContainerComponent = ({
    allEvents
}) => {
    const history = useHistory();
    const { id: selectedEventId, ids: eventIdsParam } = useParams<{
        id: string;
        ids: string;
    }>();
    const { url } = useRouteMatch();
    const [open, setOpen] = useState(true);

    const parsedEventIds = eventIdsParam.split(',');
    const selectedEvents = allEvents.filter(({ remoteId }) =>
        parsedEventIds.includes(remoteId)
    );

    return (
        <EventsDrawerView
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            events={selectedEvents}
            selectedEventId={selectedEventId}
            onEventClick={(id) => history.push(`${url}/details/${id}`)}
            onEventDetailsClose={history.goBack}
        />
    );
};
