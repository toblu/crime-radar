import React from 'react';
import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { EventsMapViewComponent } from './EventsMap.types';
import { EventMarker } from '../EventMarker';

const mapContainerStyle = {
    flex: 1
};

export const EventsMapView: EventsMapViewComponent = ({
    isLoaded,
    onLoad,
    onUnmount,
    center,
    events,
    onClusterClick
}) =>
    isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: center.latitude, lng: center.longitude }}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            clickableIcons={false}
        >
            <MarkerClusterer
                zoomOnClick={false}
                minimumClusterSize={1}
                onClick={onClusterClick}
            >
                {(clusterer) =>
                    events.map((event) => (
                        <EventMarker
                            key={event.remoteId}
                            {...event}
                            clusterer={clusterer}
                        />
                    ))
                }
            </MarkerClusterer>
        </GoogleMap>
    ) : (
        <div>Loading map...</div>
    );
