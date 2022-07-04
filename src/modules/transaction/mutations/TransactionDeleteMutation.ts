import { GraphQLNonNull, GraphQLID } from 'graphql';

import { mutationWithClientMutationId } from 'graphql-relay';

import { errorField, successField, getObjectId} from "@entria/graphql-mongo-helpers";

import TransactionModel from '../TransactionModel';

const mutation = mutationWithClientMutationId({
  name: 'TransactionDelete',
  description: "Delete a Transaction",
  inputFields: {
    transactionId: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  mutateAndGetPayload: async ({ transactionId }) => {    
    const transaction = await TransactionModel.findById({ 
      _id: getObjectId(transactionId) // find event by id
    });

    if (!transaction) {
      return {
        error: 'Transaction not found', // return error if no exists
      };
    }

    await TransactionModel.deleteOne({
      _id: getObjectId(transactionId) // delete by id
    });

    return {
      id: transactionId._id,
      error: null,
      success: 'Transaction removed',
    };
  },

  outputFields: {
    transactionId: {
      type: GraphQLID,
      resolve: ({ id }: any) => id,
    },
    ...errorField,
    ...successField,
  },
});

export default mutation;