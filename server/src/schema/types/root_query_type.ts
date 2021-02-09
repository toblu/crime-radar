import { GraphQLList, GraphQLObjectType } from 'graphql';
import UserType from './user_type';
import { AuthContext } from './../../services/auth/auth.types';
import { IUser } from '@crime-alert/shared/dist/models/user';
import EventType from './event_type';
import { getEvents } from '../../services/events/events';

const RootQueryType = new GraphQLObjectType<
  Omit<IUser, 'password'>,
  AuthContext
>({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve() {
        return getEvents()
      }
    }
  }
});

export default RootQueryType;
