"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const graphql_relay_1 = require("graphql-relay");
const graphql_mongo_helpers_1 = require("@entria/graphql-mongo-helpers");
const TransactionModel_1 = __importDefault(require("../TransactionModel"));
const mutation = (0, graphql_relay_1.mutationWithClientMutationId)({
    name: 'TransactionDelete',
    description: "Delete a Transaction",
    inputFields: {
        transactionId: {
            type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID),
        },
    },
    mutateAndGetPayload: ({ transactionId }) => __awaiter(void 0, void 0, void 0, function* () {
        const transaction = yield TransactionModel_1.default.findById({
            _id: (0, graphql_mongo_helpers_1.getObjectId)(transactionId) // find event by id
        });
        if (!transaction) {
            return {
                error: 'Transaction not found', // return error if no exists
            };
        }
        yield TransactionModel_1.default.deleteOne({
            _id: (0, graphql_mongo_helpers_1.getObjectId)(transactionId) // delete by id
        });
        return {
            id: transactionId._id,
            error: null,
            success: 'Transaction removed',
        };
    }),
    outputFields: Object.assign(Object.assign({ transactionId: {
            type: graphql_1.GraphQLID,
            resolve: ({ id }) => id,
        } }, graphql_mongo_helpers_1.errorField), graphql_mongo_helpers_1.successField),
});
exports.default = mutation;
