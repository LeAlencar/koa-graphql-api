"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionConnection = void 0;
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const graphql_2 = require("../../graphql");
const TransactionLoader_1 = require("./TransactionLoader");
const typeRegister_1 = require("../node/typeRegister");
const TransactionType = new graphql_1.GraphQLObjectType({
    name: "Transaction",
    description: "transaction data",
    fields: () => ({
        id: (0, graphql_relay_1.globalIdField)("Transaction"),
        name: {
            type: graphql_1.GraphQLString,
            resolve: transaction => transaction.name,
        },
        category: {
            type: graphql_1.GraphQLString,
            resolve: transaction => transaction.category,
        },
        price: {
            type: graphql_1.GraphQLString,
            resolve: transaction => transaction.price,
        }
    }),
    interfaces: () => [typeRegister_1.nodeInterface],
});
(0, typeRegister_1.registerTypeLoader)(TransactionType, TransactionLoader_1.load);
exports.default = TransactionType;
exports.TransactionConnection = (0, graphql_2.connectionDefinitions)({
    name: "Transaction",
    nodeType: TransactionType,
});
