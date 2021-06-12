import React, { useCallback, useEffect, useState } from 'react';
import { isWithinBounds } from '@crime-alert/shared';
import { DEFAULT_LOCATION } from './EventsMap.constants';
import { EventsMapContainerComponent, Area } from './EventsMap.types';
import { EventsMapView } from './EventsMap.view';
import { useCurrentLocation, useLoadMap } from './hooks';
import { Coordinates } from '../../../shared/types/location.types';
import { MapContext } from '../../../shared';

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
    onEventsClick,
    showSelectedArea,
    setShowSelectedArea
}) => {
    const {
        location: currentLocation,
        loading: currentLocationLoading,
        updateLocation: updateCurrentLocation,
        locationUnavailable: currentLocationUnavailable
    } = useCurrentLocation();
    const { isLoaded, loadMap, unloadMap, map } = useLoadMap();
    const [selectedLocation, setSelectedLocation] = useState<Coordinates>(
        DEFAULT_LOCATION
    );
    const [selectedMapArea, setSelectedMapArea] = useState<Area | null>();

    useEffect(() => {
        if (currentLocation) setSelectedLocation(currentLocation);
    }, [currentLocation]);

    useEffect(() => {
        if (selectedMapArea) {
            setShowSelectedArea(true);
        }
    }, [selectedMapArea, setShowSelectedArea]);

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

    const goToLocation = useCallback(
        (coord: Coordinates) => {
            map.panTo({ lat: coord.latitude, lng: coord.longitude });
        },
        [map]
    );

    const handleSearchPlaceChange = useCallback(
        (coord: Coordinates) => {
            goToLocation(coord);
            map.setZoom(12);
        },
        [map, goToLocation]
    );

    const handleCurrentLocationClick = useCallback(() => {
        updateCurrentLocation();
        if (currentLocation) setSelectedLocation(currentLocation);
    }, [currentLocation, updateCurrentLocation]);

    return (
        <MapContext.Provider value={{ map, isLoaded }}>
            <EventsMapView
                isLoaded={isLoaded}
                center={selectedLocation}
                onLoad={loadMap}
                onUnmount={unloadMap}
                events={events}
                eventsLoading={eventsLoading}
                locationLoading={currentLocationLoading}
                locationUnavailable={currentLocationUnavailable}
                onClusterClick={handleClusterClick}
                selectedMapArea={selectedMapArea}
                showSelectedArea={showSelectedArea}
                onMapClick={() => setShowSelectedArea(false)}
                onSearchPlaceChange={handleSearchPlaceChange}
                onCurrentLocationClick={handleCurrentLocationClick}
            />
        </MapContext.Provider>
    );
};
