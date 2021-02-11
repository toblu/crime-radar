import { GraphQLString } from 'graphql';
import UserType from '../types/user_type';
import AuthService from '../../services/auth';

export const loginMutation = {
  type: UserType,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  },
  resolve(parentValue, { email, password }, req) {
    return AuthService.login({ email, password, req });
  }
};
