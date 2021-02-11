import { IEvent } from '@crime-alert/shared/dist/models/event';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import { AuthContext } from '../../services/auth/auth.types';

const LocationType = new GraphQLObjectType<IEvent['location'], AuthContext>({
  name: 'LocationType',
  fields: {
    name: { type: GraphQLString },
    gps: { type: GraphQLString }
  }
});

export default LocationType;
