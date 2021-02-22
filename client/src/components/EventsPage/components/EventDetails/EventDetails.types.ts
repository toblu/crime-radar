import { DetailedEvent } from '../../../shared/types/event.types';

type EventDetailsContainerProps = {
    id: string;
    onClose: () => void;
};

type EventDetailsViewProps = {
    loading: boolean;
    event: DetailedEvent | null;
    onClose: () => void;
};

export type EventDetailsContainerComponent = React.FC<
    EventDetailsContainerProps
>;
export type EventDetailsViewComponent = React.FC<EventDetailsViewProps>;
