"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionFilterMapping = void 0;
const graphql_1 = require("graphql");
const graphql_mongo_helpers_1 = require("@entria/graphql-mongo-helpers");
const graphql_mongo_helpers_2 = require("@entria/graphql-mongo-helpers");
exports.transactionFilterMapping = {
    name: {
        type: graphql_mongo_helpers_1.FILTER_CONDITION_TYPE.MATCH_1_TO_1,
        format: (val) => val && (0, graphql_mongo_helpers_2.getObjectId)(val),
    },
};
const TransactionFilterInputType = new graphql_1.GraphQLInputObjectType({
    name: 'TransactionFilter',
    description: 'Used to filter transactions',
    fields: () => ({
        transaction: {
            type: graphql_1.GraphQLID,
        },
    }),
});
exports.default = TransactionFilterInputType;
