import { IUser } from '@crime-alert/shared';
import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { AuthContext } from '../../services/auth/auth.types';

const UserType = new GraphQLObjectType<Omit<IUser, 'password'>, AuthContext>({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID },
        email: { type: GraphQLString }
    }
});

export default UserType;
