import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { EventListItemViewComponent } from './EventListItem.types';

export const EventListItemView: EventListItemViewComponent = ({
    type,
    location,
    eventTime,
    showDivider,
    onClick
}) => {
    const timeAndLocationText = `${eventTime}, ${location}`;
    return (
        <ListItem divider={showDivider} onClick={onClick} button>
            <ListItemText
                primary={type}
                secondary={timeAndLocationText}
            ></ListItemText>
        </ListItem>
    );
};
