import { IEventType } from './../../../../shared/src/constants';
import { EventModel } from '@crime-alert/shared';
import { EventDocument, IEvent } from '@crime-alert/shared/dist/models/event';
import { FilterQuery } from 'mongoose';

type Params = {
    limit?: number;
    type?: IEventType;
    location?: string;
    to?: string;
    from?: string;
};

const buildEventsQuery = (params: Omit<Params, 'limit'>) => {
    const { type, location, from, to } = params;
    let query: FilterQuery<EventDocument> = {};

    if (type) {
        query = { type };
    }
    if (location) {
        query = { ...query, 'location.name': location };
    }
    if (from) {
        query = { ...query, datetime: { $gte: new Date(from) } };
    }
    if (to) {
        query = {
            ...query,
            datetime: { ...query.datetime, $lte: new Date(to) }
        };
    }
    return Object.keys(query).length > 0 ? query : undefined;
};

export async function getEvents(params: Params): Promise<IEvent[]> {
    const { limit, ...queryParams } = params;
    const events = await EventModel.find(buildEventsQuery(queryParams))
        .sort({ datetime: -1 })
        .limit(limit)
        .lean<IEvent>()
        .exec();
    return events;
}

export async function getEvent(remoteId: string): Promise<IEvent> {
    const event = await EventModel.findOne({ remoteId }).lean<IEvent>().exec();
    return event;
}

export async function getLocations(): Promise<IEvent['location'][]> {
    const locations = await EventModel.distinct('location.name')
        .lean<IEvent['location']>()
        .exec();
    return locations;
}
