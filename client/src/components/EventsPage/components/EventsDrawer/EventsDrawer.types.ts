import { Event } from '../../../shared/types/event.types';

type EventsDrawerContainerProps = {
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    events: Event[];
    active: boolean;
};
type EventsDrawerViewProps = EventsDrawerContainerProps & {
    selectedEventId: string | null;
    onEventClick: (id: string) => void;
    onEventDetailsClose: () => void;
};

export type EventsDrawerContainerComponent = React.FC<
    EventsDrawerContainerProps
>;
export type EventsDrawerViewComponent = React.FC<EventsDrawerViewProps>;
