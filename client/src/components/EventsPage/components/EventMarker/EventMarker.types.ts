import { Marker } from '@react-google-maps/api';
import { Event } from '../../../shared/types/event.types';

type Clusterer = React.ComponentProps<typeof Marker>['clusterer'] | undefined;

type EventMarkerContainerProps = Event & { clusterer?: Clusterer };

export type EventMarkerContainerComponent = React.FC<EventMarkerContainerProps>;

type EventMarkerViewProps = {
    position: {
        lat: number;
        lng: number;
    };
    clusterer: Clusterer;
};

export type EventMarkerViewComponent = React.FC<EventMarkerViewProps>;
