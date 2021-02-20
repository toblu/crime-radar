import { GraphQLSchema } from 'graphql';

import RootQueryType from './root_query_type';
import mutation from './mutations';

export default new GraphQLSchema({
    query: RootQueryType,
    mutation
});
