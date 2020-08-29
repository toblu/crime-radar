import { GraphQLObjectType } from 'graphql';
import UserType from './user_type';
import { IUser } from './../../models/user';
import { AuthContext } from './../../services/auth.types';

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
    }
  }
});

export default RootQueryType;
