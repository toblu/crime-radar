import { AuthContext } from '../../services/auth/auth.types';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { IEvent } from '@crime-alert/shared/dist/models/event';
import LocationType from './location_type';

const EventType = new GraphQLObjectType<IEvent, AuthContext>({
  name: 'EventType',
  fields: {
    remoteId: { type: GraphQLString },
    datetime: { type: GraphQLString },
    name: { type: GraphQLString },
    summary: { type: GraphQLString },
    url: { type: GraphQLString },
    type: { type: GraphQLString },
    location: { type: LocationType }
  }
});

export default EventType;
