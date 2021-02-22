import React, { useCallback, useEffect, useState } from 'react';
import { isWithinBounds } from '@crime-alert/shared';
import { DEFAULT_LOCATION } from './EventsMap.constants';
import { EventsMapContainerComponent, Area } from './EventsMap.types';
import { EventsMapView } from './EventsMap.view';
import { useMap } from './hooks';

export const EventsMapContainer: EventsMapContainerComponent = ({
    events,
    initialLocation,
    onEventsClick,
    showSelectedArea,
    setShowSelectedArea
}) => {
    const { isLoaded, loadMap, unloadMap } = useMap();
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);
    const [selectedMapArea, setSelectedMapArea] = useState<Area | null>();

    useEffect(() => {
        if (!selectedLocation) setSelectedLocation(initialLocation);
    }, [selectedLocation, initialLocation]);

    useEffect(() => {
        if (selectedMapArea) {
            setShowSelectedArea(true);
        }
    }, [selectedMapArea, setShowSelectedArea]);

    const location = selectedLocation ?? DEFAULT_LOCATION;

    const handleClusterClick = useCallback(
        (cluster) => {
            // First trigger event click with empty events, since it will trigger the drawer to open and start animating (thereby giving a more responsive perception)
            onEventsClick([]);
            const clusterBounds = {
                latitude: {
                    min: cluster.bounds.Wa.i,
                    max: cluster.bounds.Wa.j
                },
                longitude: {
                    min: cluster.bounds.Qa.i,
                    max: cluster.bounds.Qa.j
                }
            };
            const clusterCenter = {
                lat: cluster.center.lat(),
                lng: cluster.center.lng()
            };

            setSelectedMapArea({
                bounds: {
                    south: clusterBounds.latitude.min,
                    north: clusterBounds.latitude.max,
                    west: clusterBounds.longitude.min,
                    east: clusterBounds.longitude.max
                },
                center: clusterCenter
            });

            // expensive operation, trigger on next event loop iteration to avoid laggy animations
            setImmediate(() => {
                const eventsInCluster = events.filter((event) =>
                    isWithinBounds(clusterBounds, event)
                );
                onEventsClick(eventsInCluster);
            });
        },
        [events, onEventsClick]
    );

    return isLoaded ? (
        <EventsMapView
            isLoaded={isLoaded}
            center={location}
            onLoad={loadMap}
            onUnmount={unloadMap}
            events={events}
            onClusterClick={handleClusterClick}
            selectedMapArea={selectedMapArea}
            showSelectedArea={showSelectedArea}
            onMapClick={() => setShowSelectedArea(false)}
        />
    ) : (
        <div>Loading map...</div>
    );
};
