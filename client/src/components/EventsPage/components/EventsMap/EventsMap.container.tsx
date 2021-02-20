import React, { useCallback, useEffect, useState } from 'react';
import { isWithinBounds } from '@crime-alert/shared';
import { DEFAULT_LOCATION } from './EventsMap.constants';
import { EventsMapContainerComponent } from './EventsMap.types';
import { EventsMapView } from './EventsMap.view';
import { useMap } from './hooks';

export const EventsMapContainer: EventsMapContainerComponent = ({
    events,
    initialLocation
}) => {
    const { isLoaded, loadMap, unloadMap } = useMap();
    const [selectedLocation, setSelectedLocation] = useState(initialLocation);

    useEffect(() => {
        if (!selectedLocation) setSelectedLocation(initialLocation);
    }, [selectedLocation, initialLocation]);

    const location = selectedLocation ?? DEFAULT_LOCATION;

    const handleClusterClick = useCallback(
        (cluster) => {
            console.log(cluster);

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
            const eventsInCluster = events.filter((event) =>
                isWithinBounds(clusterBounds, event)
            );
            console.log(eventsInCluster);
        },
        [events]
    );

    return isLoaded ? (
        <EventsMapView
            isLoaded={isLoaded}
            center={location}
            onLoad={loadMap}
            onUnmount={unloadMap}
            events={events}
            onClusterClick={handleClusterClick}
        />
    ) : (
        <div>Loading map...</div>
    );
};
