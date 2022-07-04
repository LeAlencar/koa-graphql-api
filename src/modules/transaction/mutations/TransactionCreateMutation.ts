import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLBoolean } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField } from "@entria/graphql-mongo-helpers";

import TransactionModel, { ITransaction } from '../TransactionModel';

import * as TransactionLoader from '../TransactionLoader';

import TransactionType from '../TransactionType';
import { BaseContext } from '@entria/graphql-mongo-helpers/lib/createLoader';

const mutation = mutationWithClientMutationId({
  name: 'TransactionCreate',
  description: "Create a new Transaction",
  inputFields: {
    transactionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    category: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  mutateAndGetPayload: async ({ transactionId, name, category, price }) => {

    const transaction = await new TransactionModel({transactionId, name, category, price}).save();

    if (!transaction) {
      return {
        error: 'Transaction not found',
      };
    }

    return {
      error: null,
      success: 'Transaction created \o/',
    };
  },

  outputFields: {
    transaction: {
      type: TransactionType,
      resolve: async ({ id }: any, _: any, context: BaseContext<"TransactionLoader", ITransaction>) => {
        return await TransactionLoader.load(context, id);
      },
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;