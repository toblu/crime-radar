import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { IUser } from './../../models/user';
import { AuthContext } from './../../services/auth.types';

const UserType = new GraphQLObjectType<Omit<IUser, 'password'>, AuthContext>({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  }
});

export default UserType;
