import React, { useCallback, useEffect, useState } from 'react';
import { isWithinBounds } from '@crime-alert/shared';
import { DEFAULT_LOCATION } from './EventsMap.constants';
import { EventsMapContainerComponent, Area } from './EventsMap.types';
import { EventsMapView } from './EventsMap.view';
import { useMap } from './hooks';

const getClusterBounds = (bounds: Record<string, Record<string, number>>) => {
    const [key1, key2] = Object.keys(bounds);
    const keysWithMinMax = [key1, key2].reduce((acc, key) => {
        const min = Math.min(...Object.values(bounds[key]));
        const max = Math.max(...Object.values(bounds[key]));
        return { ...acc, [key]: { min, max } };
    }, {} as { [key: string]: { min: number; max: number } });

    if (keysWithMinMax[key1].min < keysWithMinMax[key2].min) {
        return {
            longitude: keysWithMinMax[key1],
            latitude: keysWithMinMax[key2]
        };
    } else {
        return {
            longitude: keysWithMinMax[key2],
            latitude: keysWithMinMax[key1]
        };
    }
};

export const EventsMapContainer: EventsMapContainerComponent = ({
    events,
    eventsLoading,
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
            const clusterBounds = getClusterBounds(cluster.bounds);
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

    return (
        <EventsMapView
            isLoaded={isLoaded}
            center={location}
            onLoad={loadMap}
            onUnmount={unloadMap}
            events={events}
            eventsLoading={eventsLoading}
            onClusterClick={handleClusterClick}
            selectedMapArea={selectedMapArea}
            showSelectedArea={showSelectedArea}
            onMapClick={() => setShowSelectedArea(false)}
        />
    );
};
