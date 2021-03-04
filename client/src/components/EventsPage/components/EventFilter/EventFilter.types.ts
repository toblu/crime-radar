import { IEventType } from '@crime-alert/shared/dist/constants';

export type TimePeriod = {
    from: string;
    to: string;
};

type EventFilterContainerProps = {
    timePeriod: TimePeriod;
    eventTypes: IEventType[];
    onChange: (timePeriod: TimePeriod, eventTypes: IEventType[]) => void;
};

type EventFilterViewProps = {
    timePeriodValue: TimePeriod;
    onTimePeriodChange: (period: TimePeriod) => void;
    eventTypesValue: IEventType[];
    onEventTypesChange: (eventTypes: IEventType[]) => void;
};

export type EventFilterContainerComponent = React.FC<EventFilterContainerProps>;
export type EventFilterViewComponent = React.FC<EventFilterViewProps>;
