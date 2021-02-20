import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

const LocationsType = new GraphQLList(
    new GraphQLObjectType({
        name: 'LocationsType',
        fields: {
            name: { type: GraphQLString }
        }
    })
);

export default LocationsType;
