import { GraphQLList, GraphQLInt, GraphQLString } from 'graphql';
import { IEventType } from '@crime-alert/shared/dist/constants';
import { getEvents } from '../../services/events/events';
import EventType from '../types/event_type';

type QueryArgs = {
  limit?: number;
  type?: IEventType;
  from?: string;
  to?: string;
};

const eventsResolve = (_, args: QueryArgs) => {
  return getEvents(args);
};

export const eventsQuery = {
  type: new GraphQLList(EventType),
  args: {
    limit: { type: GraphQLInt },
    type: { type: new GraphQLList(GraphQLString) },
    from: { type: GraphQLString },
    to: { type: GraphQLString },
    location: { type: new GraphQLList(GraphQLString) }
  },
  resolve: eventsResolve
};
