import { Event } from '../../../shared/types/event.types';

type EventsListViewProps = {
    events: Event[];
    onEventClick: (id: string) => void;
};

export type EventsListViewComponent = React.FC<EventsListViewProps>;
