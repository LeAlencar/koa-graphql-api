import { GraphQLObjectType, GraphQLNonNull } from 'graphql';

import { connectionArgs } from "../graphql/connectionDefinitions";

import { nodesField, nodeField } from '../modules/node/typeRegister';
import * as TransactionLoader from '../modules/transaction/TransactionLoader';
import { TransactionConnection } from '../modules/transaction/TransactionType';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: nodeField,
    nodes: nodesField,
    transactions: {
      type: new GraphQLNonNull(TransactionConnection.connectionType),
      args: {
        ...connectionArgs,
      },
      resolve: async (_, args, context) => await TransactionLoader.loadAll(context, args),
    },
  }),
});

export default QueryType;
