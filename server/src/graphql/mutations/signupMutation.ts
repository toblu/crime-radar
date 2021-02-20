import { GraphQLString } from 'graphql';
import UserType from '../types/user_type';
import AuthService from '../../services/auth';

export const signupMutation = {
    type: UserType,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    resolve(_, { email, password }, req) {
        return AuthService.signup({ email, password, req });
    }
};
