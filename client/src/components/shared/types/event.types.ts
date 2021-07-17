import { IEvent } from '@crime-alert/shared/src/models/event';

export type Event = Pick<
    IEvent,
    'remoteId' | 'type' | 'name' | 'summary' | 'url' | 'location'
> & { datetime: string };

export type DetailedEvent = Event & Pick<IEvent, 'content'>;

export type EventFilter = Partial<{
    limit: number;
    type: Event['type'][];
    location: string | string[];
    from: string;
    to: string;
}>;
