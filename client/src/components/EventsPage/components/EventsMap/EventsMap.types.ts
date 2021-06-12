import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { Event } from '../../../shared/types/event.types';
import { Coordinates } from '../../../shared/types/location.types';

export type Area = {
    bounds: {
        north: number;
        south: number;
        west: number;
        east: number;
    };
    center: {
        lat: number;
        lng: number;
    };
};

type EventsMapContainerProps = {
    events: Event[];
    eventsLoading: boolean;
    onEventsClick: (events: Event[]) => void;
    showSelectedArea: boolean;
    setShowSelectedArea: (showSelectedArea: boolean) => void;
};

export type EventsMapContainerComponent = React.FC<EventsMapContainerProps>;

type EventsMapViewProps = {
    events: Event[];
    center: Coordinates;
    onLoad: React.ComponentProps<typeof GoogleMap>['onLoad'];
    onUnmount: React.ComponentProps<typeof GoogleMap>['onUnmount'];
    eventsLoading: boolean;
    locationLoading: boolean;
    locationUnavailable: boolean;
    isLoaded: boolean;
    onClusterClick: React.ComponentProps<typeof MarkerClusterer>['onClick'];
    selectedMapArea: Area | undefined;
    showSelectedArea: boolean;
    onMapClick: () => void;
    onSearchPlaceChange: (coord: Coordinates) => void;
    onCurrentLocationClick: () => void;
};

export type EventsMapViewComponent = React.FC<EventsMapViewProps>;
