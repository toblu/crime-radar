import { Event } from '../../../shared/types/event.types';

type EventsDrawerContainerProps = {
    allEvents: Event[];
};
type EventsDrawerViewProps = {
    events: Event[];
    open: boolean;
    onClose: () => void;
    onOpen: () => void;
    selectedEventId: string | null;
    onEventClick: (id: string) => void;
    onEventDetailsClose: () => void;
};

export type EventsDrawerContainerComponent = React.FC<
    EventsDrawerContainerProps
>;
export type EventsDrawerViewComponent = React.FC<EventsDrawerViewProps>;
