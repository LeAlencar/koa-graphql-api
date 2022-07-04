import { GraphQLObjectType, GraphQLString } from "graphql";

import { globalIdField } from "graphql-relay";

import { connectionDefinitions } from "../../graphql";

import { load } from "./TransactionLoader";

import { nodeInterface, registerTypeLoader } from "../node/typeRegister";

const TransactionType = new GraphQLObjectType({
  name: "Transaction",
  description: "transaction data",
  fields: () => ({
    id: globalIdField("Transaction"),
    name: {
      type: GraphQLString,
      resolve: transaction => transaction.name,
    },
    category: {
        type: GraphQLString,
        resolve: transaction => transaction.category,
    },
    price: {
        type: GraphQLString,
        resolve: transaction => transaction.price,
    } 
  }),
  interfaces: () => [nodeInterface],
});

registerTypeLoader(TransactionType, load);

export default TransactionType;

export const TransactionConnection = connectionDefinitions({
  name: "Transaction",
  nodeType: TransactionType,
});