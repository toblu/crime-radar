import React from 'react';
import { GoogleMap, MarkerClusterer, Rectangle } from '@react-google-maps/api';
import { EventsMapViewComponent } from './EventsMap.types';
import { EventMarker } from '../EventMarker';

const mapContainerStyle = {
    flex: 1
};

const rectangleOptions = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    zIndex: 1
};

export const EventsMapView: EventsMapViewComponent = ({
    isLoaded,
    onLoad,
    onUnmount,
    center,
    events,
    onClusterClick,
    selectedMapArea,
    showSelectedArea,
    onMapClick
}) =>
    isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={
                selectedMapArea
                    ? selectedMapArea.center
                    : { lat: center.latitude, lng: center.longitude }
            }
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            clickableIcons={false}
            onClick={onMapClick}
        >
            <>
                <Rectangle
                    bounds={selectedMapArea?.bounds}
                    options={{
                        ...rectangleOptions,
                        visible: showSelectedArea && !!selectedMapArea
                    }}
                />
                <MarkerClusterer
                    gridSize={40}
                    averageCenter
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
            </>
        </GoogleMap>
    ) : (
        <div>Loading map...</div>
    );
