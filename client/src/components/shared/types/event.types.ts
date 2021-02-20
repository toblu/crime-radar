import { IEvent } from '@crime-alert/shared/src/models/event';

export type Event = Pick<
    IEvent,
    'remoteId' | 'type' | 'summary' | 'url' | 'datetime' | 'location'
>;

export type EventFilter = Partial<{
    limit: number;
    type: Event['type'][];
    location: string | string[];
    from: Date;
    to: Date;
}>;
