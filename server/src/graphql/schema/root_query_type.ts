import { GraphQLObjectType } from 'graphql';
import { eventsQuery, userQuery, locationsQuery } from './../queries';
import { AuthContext } from '../../services/auth/auth.types';
import { IUser } from '@crime-alert/shared/dist/models/user';

const RootQueryType = new GraphQLObjectType<
  Omit<IUser, 'password'>,
  AuthContext
>({
  name: 'RootQueryType',
  fields: {
    user: userQuery,
    events: eventsQuery,
    locations: locationsQuery
  }
});

export default RootQueryType;
