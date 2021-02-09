import { AuthContext } from './../../services/auth/auth.types';
import { GraphQLObjectType, GraphQLID, GraphQLScalarType, GraphQLString } from 'graphql';
import { IEvent } from '@crime-alert/shared/dist/models/event';
import LocationType from './location_type';

const EventType = new GraphQLObjectType<IEvent, AuthContext>({
  name: 'EventType',
  fields: {
    id: {type: GraphQLString},
    // TODO: make this a scalar type
    datetime: {type: GraphQLString},
    name: { type: GraphQLString},
    summary: {type: GraphQLString},
    url: {type: GraphQLString},
    // TODO: make this an enum type
    type: {type: GraphQLString},
    location: {type: LocationType}
  }
})

export default EventType;
