import React from 'react';
import { Marker } from '@react-google-maps/api';
import { EventMarkerViewComponent } from './EventMarker.types';

export const EventMarkerView: EventMarkerViewComponent = ({
    position,
    clusterer
}) => {
    return <Marker position={position} clusterer={clusterer}></Marker>;
};
