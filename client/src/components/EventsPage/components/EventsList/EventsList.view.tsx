import React from 'react';
import { List } from '@material-ui/core';
import { EventListItem } from '../EventListItem';
import { EventsListViewComponent } from './EventsList.types';

export const EventsListView: EventsListViewComponent = ({
    events,
    onEventClick
}) => {
    return (
        <List>
            {events.map((event, i) => (
                <EventListItem
                    key={event.remoteId}
                    id={event.remoteId}
                    type={event.type}
                    location={event.location.name}
                    datetime={event.datetime}
                    showDivider={i !== events.length - 1}
                    onClick={() => onEventClick(event.remoteId)}
                />
            ))}
        </List>
    );
};
