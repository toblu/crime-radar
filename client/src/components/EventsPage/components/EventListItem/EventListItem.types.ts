import { Event } from '../../../shared/types/event.types';

type EventListItemViewProps = {
    id: Event['remoteId'];
    type: Event['type'];
    location: string;
    datetime: Event['datetime'];
    onClick: () => void;
    showDivider: boolean;
};

export type EventListItemViewComponent = React.FC<EventListItemViewProps>;
