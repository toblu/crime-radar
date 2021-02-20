import React from 'react';
import { EventMarkerContainerComponent } from './EventMarker.types';
import { EventMarkerView } from './EventMarker.view';

export const EventMarkerContainer: EventMarkerContainerComponent = (props) => {
    const [lat, lng] = props.location.gps.split(',').map(parseFloat);
    const position = { lat, lng };

    return <EventMarkerView position={position} clusterer={props.clusterer} />;
};
