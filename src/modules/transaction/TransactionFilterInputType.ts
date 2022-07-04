import { GraphQLID, GraphQLInputObjectType } from 'graphql';

import { FILTER_CONDITION_TYPE } from '@entria/graphql-mongo-helpers';

import { getObjectId } from "@entria/graphql-mongo-helpers";

export const transactionFilterMapping = {
  name: {
    type: FILTER_CONDITION_TYPE.MATCH_1_TO_1,
    format: (val: string) => val && getObjectId(val),
  },
};

const TransactionFilterInputType = new GraphQLInputObjectType({
  name: 'TransactionFilter',
  description: 'Used to filter transactions',
  fields: () => ({
    transaction: {
      type: GraphQLID,
    },
  }),
});

export default TransactionFilterInputType;