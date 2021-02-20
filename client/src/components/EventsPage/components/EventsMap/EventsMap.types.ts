import { GoogleMap, MarkerClusterer } from '@react-google-maps/api';
import { Event } from '../../../shared/types/event.types';
import { Coordinates } from '../../../shared/types/location.types';

type EventsMapContainerProps = {
    events: Event[];
    initialLocation?: Coordinates;
};

export type EventsMapContainerComponent = React.FC<EventsMapContainerProps>;

type EventsMapViewProps = {
    events: Event[];
    center: Coordinates;
    onLoad: React.ComponentProps<typeof GoogleMap>['onLoad'];
    onUnmount: React.ComponentProps<typeof GoogleMap>['onUnmount'];
    isLoaded: boolean;
    onClusterClick: React.ComponentProps<typeof MarkerClusterer>['onClick'];
};

export type EventsMapViewComponent = React.FC<EventsMapViewProps>;
