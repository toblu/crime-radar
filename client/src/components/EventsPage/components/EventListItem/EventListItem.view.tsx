import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { format } from 'date-fns/esm';
import { EventListItemViewComponent } from './EventListItem.types';

export const EventListItemView: EventListItemViewComponent = ({
    type,
    location,
    datetime,
    showDivider,
    onClick
}) => {
    const timeAndLocationText = `${format(
        // @ts-ignore
        new Date(parseInt(datetime, 10)),
        'd MMM HH:mm'
    )}, ${location}`;
    return (
        <ListItem divider={showDivider} onClick={onClick} button>
            <ListItemText
                primary={type}
                secondary={timeAndLocationText}
            ></ListItemText>
        </ListItem>
    );
};
