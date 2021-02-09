import { AuthContext } from './../services/auth/auth.types';
import { GraphQLObjectType, GraphQLString } from 'graphql';
import AuthService from '../services/auth';
import UserType from './types/user_type';
import { IUser } from '@crime-alert/shared/dist/models/user';

const mutation = new GraphQLObjectType<IUser, AuthContext>({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      }
    }
  }
});

export default mutation;
