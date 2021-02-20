import { signupMutation, loginMutation, logoutMutation } from './../mutations';
import { GraphQLObjectType } from 'graphql';
import { IUser } from '@crime-alert/shared/dist/models/user';
import { AuthContext } from '../../services/auth/auth.types';

const mutation = new GraphQLObjectType<IUser, AuthContext>({
    name: 'Mutation',
    fields: {
        signup: signupMutation,
        login: loginMutation,
        logout: logoutMutation
    }
});

export default mutation;
