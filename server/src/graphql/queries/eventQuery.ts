import { GraphQLString } from 'graphql';
import { getEvent } from '../../services/events/events';
import EventType from '../types/event_type';

type QueryArgs = {
    id: string;
};

const eventResolve = (_, { id }: QueryArgs) => {
    return getEvent(id);
};

export const eventQuery = {
    type: EventType,
    args: {
        id: { type: GraphQLString }
    },
    resolve: eventResolve
};
